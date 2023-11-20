import {
  readFile
} from './helper.js';



export function fromFile(moddle, file) {
  return fromFilePart(moddle, file, 'od:Definitions');
}

export function fromFilePart(moddle, file, type) {
  var fileContents = readFile(file);

  return moddle.fromXML(fileContents, type);
}

export function toXML(element, opts) {
  return element.$model.toXML(element, opts);
}
