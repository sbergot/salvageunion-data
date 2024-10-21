import { apply } from "./io.mjs"

function f(data) {
  const keys = Object.keys(data);
  return keys.map(k => ({ name: k, ...data[k] }));
}

[
  "abilities",
  "ability-trees",
  "modules",
  "systems"
].forEach(name => {
  const filename = `data/${name}.json`;
  apply(filename, f);
})