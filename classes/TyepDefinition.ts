import { InputObjectTypeDefinitionNode, ObjectTypeDefinitionNode, ObjectTypeExtensionNode } from "graphql";
import { Field } from "./Field";
import { Name } from "./Name";

export class TypeDefinition {
  constructor(private type: ObjectTypeDefinitionNode | ObjectTypeExtensionNode | InputObjectTypeDefinitionNode) {}

  toString() {
    const { fields = [] } = this.type
    return `export interface ${new Name(this.type.name)} {
      ${fields.map(field => new Field(field)).join('\n')}
    }`
  }
}