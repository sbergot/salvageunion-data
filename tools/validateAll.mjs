import * as fs from "fs"
import { Validator } from "jsonschema"
import { getAllDataFiles, read } from "./lib/io.mjs"

const validator = new Validator();
const sharedSchemas = fs.readdirSync("schemas/shared")

sharedSchemas.forEach(filename => {
  validator.addSchema(read(`schemas/shared/${filename}`), `/shared/${filename}`);
  validator.addSchema(read(`schemas/shared/${filename}`), `/${filename}`);
})

getAllDataFiles().forEach(filename => {
  const name = filename.replace(".json", "");
  const datafp = `data/${filename}`;
  const schemafp = `schemas/${name}.schema.json`
  const dataContent = read(datafp);
  const schemaContent = read(schemafp);
  console.log(`Validate ${datafp} with ${schemafp}`);
  const result = validator.validate(dataContent, schemaContent);
  if (!result.valid) {
    result.errors.forEach(e => console.log(e.stack));
  } else {
    console.log("ok")
  }
  console.log("");
});
