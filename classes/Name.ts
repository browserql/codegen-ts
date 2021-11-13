import { NameNode } from "graphql";

export class Name {
  constructor(private name: NameNode) {}

  toString() {
    return this.name.value
  }
}