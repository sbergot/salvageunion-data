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

export function map(filename, f, suffix = "") {
  apply(filename, d => d.map(f), suffix);
}

export function list(filename, property) {
  const data = read(filename);
  const result = {};
  data.forEach(element => {
    if (element[property]) {
      result[element[property]] = 1;
    }
  });
  return Object.keys(result);
}