import * as fs from "fs"

export function read(filename) {
  return JSON.parse(fs.readFileSync(filename));
}

export function write(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 4));
}

export function apply(filename, f, suffix = "") {
  const data = read(filename);
  write(filename + suffix, f(data));
}