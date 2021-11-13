import parseKind from "@browserql/fpql/parse/kind";
import { TypeNode } from "graphql";
import { emitter } from "../emitter";

export class Type {
  kind

  constructor(private type: string) {
    this.kind = parseKind(type)
  }

  getKind() {
    if (this.kind.type === "String" || this.kind.type === "ID") {
      return "string";
    }
    if (this.kind.type === "Int" || this.kind.type === "Float") {
      return "number";
    }
    if (this.kind.type === "Boolean") {
      return "boolean";
    }
    if (this.kind.type === "Date") {
      return "Date";
    }
    return "";
  }

  toString() {
    const parsed = parseKind(this.type);
    const type = this.getKind();

    let final = type

    if (!final) {
      emitter.emit('scalar', this.kind.type)
      final = this.kind.type
    }

    for (let i = 0; i < parsed.depth; i++) {
      final = `Array<${final}${parsed.nestedRequired[i] ? '' : ' | null'}>`
    }

    if (!parsed.required) {
      final = `${final} | null`
    }
    
    return final
  }
}