import { map } from "./io.mjs"

map("data/abilities.json", d => {
  if (d.range === "Not Applicable") {
    delete d.range;
  }
  return d;
});