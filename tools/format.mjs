import { apply, getAllDataFiles } from "./lib/io.mjs"

getAllDataFiles().forEach(name => {
  const filename = `data/${name}`;
  apply(filename, d => d);
})