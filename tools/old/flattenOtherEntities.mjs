import { apply } from "../lib/io.mjs"

apply("data/otherEntities.json", d => {
  return d.flatMap(r => {
    const { category, entities } = r;
    return entities.map(e => ({ category, ...e }));
  })
})