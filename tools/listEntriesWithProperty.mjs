import { list } from "./lib/io.mjs"

const name = process.argv[2];
const property = process.argv[3];

console.log(list(`data/${name}.json`, property));