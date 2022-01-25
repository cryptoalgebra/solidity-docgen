import { TypeName } from "solidity-ast";
import { DocItemWithContext, } from "../../site";
import { findAll, isNodeType } from 'solidity-ast/utils';
import { ErrorDefinition, EventDefinition, FunctionDefinition, ModifierDefinition, ParameterList, VariableDeclaration } from 'solidity-ast';

/**
 * Returns a Markdown heading marker. An optional `hlevel` context variable increases the heading level.
 *
 * Examples:
 *     {{h}} {{name}}
 *     {{h 1}} {{Name}}
 *     {{h}} Functions
 */
export function h(this: DocItemWithContext & { hlevel?: number }, hsublevel: number | object) {
  hsublevel = typeof hsublevel === 'number' ? Math.max(1, hsublevel) : 1;
  return new Array((this.hlevel ?? 1) + hsublevel - 1).fill('#').join('');
};

export function trim(text: string) {
  if (typeof text === 'string') {
    return text.trim();
  }
}

export function joinLines(text?: string) {
  if (typeof text === 'string') {
    return text.replace(/\n+/g, ' ');
  }
}

export function publicExternalFunctions(item: DocItemWithContext): FunctionDefinition[] | undefined {
  return [...findAll('FunctionDefinition', item)].filter((x) => x.visibility == 'public' || x.visibility == 'external');
}

export function publicVariables(item: DocItemWithContext): VariableDeclaration[] | undefined {
  return (item.nodeType === 'ContractDefinition')
    ? item.nodes.filter(isNodeType('VariableDeclaration')).filter(v => v.stateVariable).filter(v => v.visibility == 'public')
    : undefined;
}