import { DocumentNode, GraphQLSchema, parse } from 'graphql';
import getEnumerations from '@browserql/fpql/get/enumerations';
import getName from '@browserql/fpql/get/name';
import getTypes from '@browserql/fpql/get/types';
import getFields from '@browserql/fpql/get/fields';

interface Schema {
  source: string
  document: DocumentNode
  schema: GraphQLSchema
}

export async function handler({ document }: Schema) {
  const types = getTypes(document)

  const typesToInterfaces = types.map(type => {
    const typeName = getName(type)
    const fields = getFields(type)

    return `interface ${typeName} {
      ${fields.map(field => {
        const fieldName = getName(field)

        return `${fieldName}: any`
      }).join('\n')}
    }`
  })

  return [
    ...typesToInterfaces
  ].join('\n')
}
