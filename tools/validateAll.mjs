import { Validator } from "jsonschema"
import { getAllDataFiles, read } from "./io.mjs"

const validator = new Validator();
validator.addSchema(read("schemas/enums.schema.json"), '/enums.schema.json');
validator.addSchema(read("schemas/common.schema.json"), '/common.schema.json');
validator.addSchema(read("schemas/objects.schema.json"), '/objects.schema.json');

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
