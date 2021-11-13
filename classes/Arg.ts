import getKind from "@browserql/fpql/get/kind";
import parseKind from "@browserql/fpql/parse/kind";
import { ArgumentNode, InputValueDefinitionNode } from "graphql";
import { Name } from "./Name";
import { TypeDefinition } from "./TyepDefinition";
import { Type } from "./Type";

export class Arg {
  constructor(private arg: InputValueDefinitionNode) {}

  toString() {
    const kind = getKind(this.arg)
    const parsed = parseKind(kind)
    const type = new Type(kind)

    return `${new Name(this.arg.name)}${parsed.required ? '' : '?'}: ${type}`
  }
}