import { UnionTypeDefinitionNode } from 'graphql';
import { Name } from './Name';

export class Union {
  constructor(private union: UnionTypeDefinitionNode) {}

  toString() {
    const { types = [] } = this.union;

    return `export type ${new Name(this.union.name)} = ${types
      .map((type) => new Name(type.name).toString())
      .join(' | ')}`;
  }
}
