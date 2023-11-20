import {
  assign
} from 'min-dash';

import ODModdle from './object-diagram-moddle.js';

import ODDescriptors from "../resources/od.json" assert { type: 'json' };
import ODDiDescriptors from "../resources/odDi.json" assert { type: 'json' };
import DcDescriptors from "../resources/dc.json" assert { type: 'json' };

const packages = {
  od: ODDescriptors,
  odDi: ODDiDescriptors,
  dc: DcDescriptors,
};

export default function(additionalPackages, options) {
  const pks = assign({}, packages, additionalPackages);

  return new ODModdle(pks, options);
}
