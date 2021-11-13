import getKind from "@browserql/fpql/get/kind";
import parseKind from "@browserql/fpql/parse/kind";
import { FieldDefinitionNode, InputValueDefinitionNode, NameNode } from "graphql";
import { Arg } from "./Arg";
import { Name } from "./Name";
import { Type } from "./Type";

export class Field {
  constructor(private field: FieldDefinitionNode | InputValueDefinitionNode) {}

  toString() {
    const { arguments: args = [] } = 'arguments' in this.field ? this.field : {}
    const kind = getKind(this.field)
    const parsed = parseKind(kind)
    const type = new Type(kind)

    return `${new Name(this.field.name)}${parsed.required ? '' : '?'}${args.length ? `(variables: {${args.map(arg => new Arg(arg))}})` : ''}: ${args.length ? `Promise<${type}>` : type}; // ${kind}`
  }
}