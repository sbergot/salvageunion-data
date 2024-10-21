import { apply } from "./lib/io.mjs"

[
  "abilities",
  "ability-trees",
  "chassisData",
  "classes",
  "equipment",
  "modules",
  "otherEntities",
  "systems"
].forEach(name => {
  const filename = `data/${name}.json`;
  apply(filename, d => d);
})