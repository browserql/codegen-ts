import { readFile, writeFile } from "fs/promises";
import { buildSchema, parse } from "graphql";
import { handler } from "./handler";

async function run() {
  const source = (await readFile("example.graphql")).toString();
  // @ts-ignore
  const res = await handler({
    source,
    document: parse(source),
    // schema: buildSchema(source, { assumeValid: true }),
    arguments: {
      scalars: {
        FOO: 'string'
      }
    }
  });
  await writeFile('results.ts', res)
}

run();
