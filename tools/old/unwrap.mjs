import { apply } from "./io.mjs"

function f(data) {
  const key = Object.keys(data)[0];
  return data[key];
}

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
  apply(filename, f);
})