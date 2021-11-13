import { DocumentNode } from 'graphql';
import { emitter } from '../emitter';
import { Definition } from './Definition';

export interface ParserArguments {
  scalars?: Record<string, string>
}

export class Parser {
  static async parse(document: DocumentNode, args: ParserArguments = {}) {
    const doc = new Parser(document, args)
    await new Promise(resolve => setTimeout(resolve, 0))
    return doc.toString()
  }

  definitions: string[] = []
  extraScalars: string[] = [];

  constructor(private document: DocumentNode, private args: ParserArguments) {
    emitter.on('scalar', (scalar) => {
      if (this.args.scalars && this.args.scalars[scalar]) {
        this.extraScalars.push(`export type ${scalar} = ${this.args.scalars[scalar]}`)
      } else {
        this.extraScalars.push(`export type ${scalar} = unknown`);
      }
    });

    this.definitions = this.printDefinitions()
  }

  printDefinitions(): string[] {
    const { definitions } = this.document;

    const defs = definitions.map((def) => new Definition(def).toString())

    return defs as string[]
  }

  toString() {

    return [...this.definitions, ...this.extraScalars].join(
      '\n'
    );
  }
}
