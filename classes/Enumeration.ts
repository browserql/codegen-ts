import {
  EnumTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
} from 'graphql';
import { Field } from './Field';
import { Name } from './Name';

export class Enumeration {
  constructor(private enumeration: EnumTypeDefinitionNode) {}

  toString() {
    const { values = [] } = this.enumeration;
    return [
      `export enum ${new Name(this.enumeration.name)} {`,
      ...values.map((value) => `${new Name(value.name).toString()} = '${new Name(value.name).toString()}',`),
      '}',
    ].join('\n');
  }
}
