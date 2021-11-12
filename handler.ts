import { DocumentNode, GraphQLSchema, parse } from 'graphql';
import getEnumerations from '@browserql/fpql/get/enumerations';
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
  return type
}

export async function handler({ document }: Schema) {
  const types = getTypes(document)

  const typesToInterfaces = types.map(type => {
    const typeName = getName(type)
    const fields = getFields(type)

    return `interface ${typeName} {
      ${fields.map(field => {
        const fieldName = getName(field)
        const kind = getKind(type)

        return `${fieldName}: ${tsKind(kind)}`
      }).join('\n')}
    }`
  })

  return [
    ...typesToInterfaces
  ].join('\n')
}
