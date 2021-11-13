import { DefinitionNode } from 'graphql';
import { Enumeration } from './Enumeration';
import { TypeDefinition } from './TyepDefinition';
import { Union } from './Union';

export class Definition {
  constructor(private definition: DefinitionNode) {}

  toString() {
    switch (this.definition.kind) {
      case 'ObjectTypeDefinition':
      case 'ObjectTypeExtension':
      case 'InputObjectTypeDefinition':
        return new TypeDefinition(this.definition).toString();

      case 'EnumTypeDefinition': return new Enumeration(this.definition).toString()

      case 'UnionTypeDefinition': return new Union(this.definition).toString()
    }
    return '';
  }
}
