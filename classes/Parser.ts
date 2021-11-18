// @ts-ignore
import { DocumentNode, NameNode } from 'graphql';
import { emitter } from '../emitter';
import { Definition } from './Definition';
import { Name } from './Name';

export interface ParserArguments {
  scalars?: Record<string, string>;
}

export class Parser {
  static async parse(document: DocumentNode, args: ParserArguments = {}) {
    const doc = new Parser(document, args);
    await new Promise((resolve) => setTimeout(resolve, 0));
    return '// Generated with browserql\n'.concat(doc.toString());
  }

  definitions: string[] = [];
  extraScalars: string[] = [];

  constructor(private document: DocumentNode, private args: ParserArguments) {
    const { definitions } = this.document;

    emitter.on('unknown', (unknown) => {
      const def = definitions.find((def) => {
        if ('name' in def) {
          const name = new Name(def.name as NameNode);
          return name.toString() === unknown;
        }
      });

      if (def) {
        switch (def.kind) {
          case 'ScalarTypeDefinition':
            {
              const scalar = `export type ${unknown} = ${
                this.args.scalars && this.args.scalars[unknown]
                  ? this.args.scalars[unknown]
                  : 'unknown'
              }`;
              if (!this.extraScalars.includes(scalar)) {
                this.extraScalars.push(scalar);
              }
            }
            break;
        }
      } else {
        const scalar = `export type ${unknown} = ${
          this.args.scalars && this.args.scalars[unknown]
            ? this.args.scalars[unknown]
            : 'unknown'
        }`;
        if (!this.extraScalars.includes(scalar)) {
          this.extraScalars.push(scalar);
        }
      }
    });

    this.definitions = this.printDefinitions();
  }

  printDefinitions(): string[] {
    const { definitions } = this.document;

    const defs = definitions.map((def) => new Definition(def).toString());

    return defs as string[];
  }

  toString() {
    return [...this.definitions, ...this.extraScalars].join('\n');
  }
}
