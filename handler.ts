import {
  DefinitionNode,
  DocumentNode,
  GraphQLSchema,
  ObjectTypeDefinitionNode,
} from 'graphql';
import getEnumerations from '@browserql/fpql/get/enumerations';
import getQueries from '@browserql/fpql/get/queries';
import getName from '@browserql/fpql/get/name';
import getTypes from '@browserql/fpql/get/types';
import getFields from '@browserql/fpql/get/fields';
import getKind from '@browserql/fpql/get/kind';
import parseKind from '@browserql/fpql/parse/kind';
import getArguments from '@browserql/fpql/get/arguments';
import { Parser, ParserArguments } from './classes/Parser';

interface Schema {
  source: string;
  document: DocumentNode;
  schema: GraphQLSchema;
  arguments?: ParserArguments;
}

export async function handler({ document, arguments: args }: Schema) {
  return Parser.parse(document, args);
  // const types = getTypes(document) as ObjectTypeDefinitionNode[];

  // const typesToInterfaces = types.map((type) => {
  //   const typeName = getName(type);
  //   const fields = getFields(type);

  //   return `export interface ${typeName} {
  //     ${fields
  //       .map((field) => {
  //         const fieldName = getName(field);
  //         const kind = getKind(field);
  //         const parsed = parseKind(kind);

  //         return `${fieldName}${parsed.required ? "" : "?"}: ${tsKind(kind)}`;
  //       })
  //       .join("\n")}
  //   }`;
  // });

  // const queries = getQueries(document);

  // const queriesTs = queries.map((query) => {
  //   const queryName = getName(query);
  //   const args = getArguments(query);
  //   const queryKind = getKind(query);

  //   return `${queryName}(
  //     ${args
  //       .map((arg) => {
  //         const argName = getName(arg);
  //         // @ts-ignore
  //         const kind = getKind(arg);
  //         const parsed = parseKind(kind);

  //         return `${argName}${parsed.required ? "" : "?"}: ${tsKind(kind)},`;
  //       })
  //       .join("\n")}
  //   ): Promise<${tsKind(queryKind)}>`;
  // });

  // return [
  //   "// ts",
  //   ...typesToInterfaces,
  //   `export interface Query {
  //     ${queriesTs.join("\n")}
  //   }`,
  // ].join("\n");
}
