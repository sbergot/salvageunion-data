import { map } from "./io.mjs"

map("data/abilities.json", d => {
  if (d.usage) {
    delete d.usage;
  }
  return d;
});