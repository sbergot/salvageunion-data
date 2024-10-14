import * as fs from "fs"


const content = fs.readFileSync("temp.txt").toString();

let result = content;
result = result.replace(/[\r][\n](\D)/g, " $1");
result = result.replace(/(\d+) - (\d+)/g, "$1-$2");
result = result.replace(/(\d.*?): (.+)/g, '"$1": "$2",');
result = result.replace(/- /g, '');
result = result.replace(/,$/g, '');
result = ', "rollTable": {' + result + "}"

fs.writeFileSync("result.txt", result);