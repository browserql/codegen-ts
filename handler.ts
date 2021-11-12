import { DocumentNode, GraphQLSchema, ObjectTypeDefinitionNode } from 'graphql';
import getEnumerations from '@browserql/fpql/get/enumerations';
import getQueries from '@browserql/fpql/get/queries';
import getName from '@browserql/fpql/get/name';
import getTypes from '@browserql/fpql/get/types';
import getFields from '@browserql/fpql/get/fields';
import getKind from '@browserql/fpql/get/kind';
import parseKind from '@browserql/fpql/parse/kind';

interface Schema {
  source: string
  document: DocumentNode
  schema: GraphQLSchema
}

function tsKindType(type: string) {
  if (type === 'String' || type === 'ID') {
    return 'string'
  }
  if (type === 'Int' || type === 'Float') {
    return 'number'
  }
  if (type === 'Boolean') {
    return 'boolean'
  }
  if (type === 'Date') {
    return 'Date'
  }
}

function tsKind(kind: string) {
  const parsed = parseKind(kind)
  const type = tsKindType(parsed.type)
  let arrays = ''
  for (let i = 0; i < parsed.depth; i++) {
    arrays += '[]'
  }
  return `${type}${arrays}`
}

export async function handler({ document }: Schema) {
  const types = getTypes(document) as ObjectTypeDefinitionNode[]

  const typesToInterfaces = types.map(type => {
    const typeName = getName(type)
    const fields = getFields(type)

    return `export interface ${typeName} {
      ${fields.map(field => {
        const fieldName = getName(field)
        const kind = getKind(field)
        const parsed = parseKind(kind)

        return `${fieldName}${parsed.required ? '' : '?'}: ${tsKind(kind)}`
      }).join('\n')}
    }`
  })

  const queries = getQueries(document)

  const queriesTs = queries.map(query => {
    const queryName = getName(query)

    return `${queryName}(): Promise<any>`
  })

  return [
    ...typesToInterfaces,
    `export interface Query {
      ${queriesTs.join('\n')}
    }`
  ].join('\n')
}
