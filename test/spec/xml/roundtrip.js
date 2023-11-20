import {
  createModdle,
  readFile
} from '../../helper.js';

describe('object-diagram-moddle - read', function () {

  const moddle = createModdle();

  function read(xml, root, opts) {
    return moddle.fromXML(xml, root, opts);
  }

  function fromFile(file, root, opts) {
    const contents = readFile(file);
    return read(contents, root, opts);
  }

  describe('round trip', function () {

    it('objects and links', async function () {

      // given

      // when
      const x = await fromFile('test/fixtures/simple.xml');
      // TODO: do round trip xml string assertion
      console.log(
          moddle.toXML(x))
    });

  });
});