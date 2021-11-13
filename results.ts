export interface BuiltInGraphqlType {
  id?: string | null; // ID
  int?: number | null; // Int
  float?: number | null; // Float
  bool?: boolean | null; // Boolean
  string?: string | null; // String
}
export interface GraphQLField {
  required: string; // ID !
  array?: Array<string | null> | null; // [ ID ]
  requiredArray: Array<string | null>; // [ ID ] !
  requiredItem?: Array<string> | null; // [ ID ! ]
  requiredItemArray: Array<string>; // [ ID ! ] !
  nestedArray?: Array<Array<string | null> | null> | null; // [ [ ID ] ]
  nestedRequired: Array<Array<string>>; // [ [ ID ! ] ! ] !
}
export interface CustomScalar {
  unexistingScalar: FOO; // FOO !
  existingScalar?: Date | null; // Date
}

export interface Query {
  withoutArguments?: string | null; // ID
  withArguments?(variables: {
    arg?: string | null;
    requiredArg: string;
    defaultValue?: number | null;
  }): Promise<string | null>; // ID
}
export interface Query {
  extended?: boolean | null; // Boolean
}
export interface Query {
  forceExtended?: boolean | null; // Boolean
}
export type FOO = string;
