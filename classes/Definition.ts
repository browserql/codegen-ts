import { DefinitionNode } from 'graphql';
import { TypeDefinition } from './TyepDefinition';

export class Definition {
  constructor(private definition: DefinitionNode) {}

  toString() {
    switch (this.definition.kind) {
      case 'ObjectTypeDefinition':
      case 'ObjectTypeExtension':
      case 'InputObjectTypeDefinition':
        return new TypeDefinition(this.definition).toString();
    }
    return '';
  }
}
