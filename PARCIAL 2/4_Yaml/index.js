import * as fs from 'fs';
import * as path from 'path';
import yaml from 'yaml';

let objetoYaml = fs.readFileSync(path.resolve("./PARCIAL 2/4_Yaml/archivo.yaml"), 'utf-8');
let objetoJson = yaml.parse(objetoYaml);

console.log(objetoYaml);
console.log(typeof objetoYaml)

console.log(objetoJson);
console.log(typeof objetoJson)
