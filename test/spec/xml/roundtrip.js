import {
  createModdle,
  readFile
} from '../../helper.js';

import expect from '../../expect.js';

describe('object-diagram-moddle - read', function() {

  const moddle = createModdle();

  describe('round trip', function() {

    it('objects and links', async function() {

      // given

      // when
      const modelString = readFile('test/fixtures/roundtrip.xml');
      let model = await moddle.fromXML(modelString);
      let toXML = await moddle.toXML(model.rootElement);

      // then
      expect(toXML.xml).to.equal(modelString);
    });

  });
});