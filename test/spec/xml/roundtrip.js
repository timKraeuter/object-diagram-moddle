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
      let toXML = await moddle.toXML(model.rootElement, { format: true });

      // then
      expect(toXML.xml.replace(/\n/g, '\r\n')).to.equal(modelString); // Normalize line endings for windows users
    });

    it('colors', async function() {

      // given

      // when
      const modelString = readFile('test/fixtures/colors.xml');
      let model = await moddle.fromXML(modelString);
      let toXML = await moddle.toXML(model.rootElement, { format: true });

      // then
      expect(toXML.xml.replace(/\n/g, '\r\n')).to.equal(modelString); // Normalize line endings for windows users
    });

  });
});