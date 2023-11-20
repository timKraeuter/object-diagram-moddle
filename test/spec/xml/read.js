import expect from '../../expect.js';

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

  describe('should import types', function () {

    describe('object diagram', function () {

      it('objects and links', async function () {

        // given

        // when
        const {
          rootElement
        } = await fromFile('test/fixtures/simple.xml');

        const expected = {
          $type: 'od:Definitions',
          rootElements: [{
            $type: 'od:OdBoard',
            id: 'Board_debug',
            boardElements: [
              {
                $type: 'od:Link',
                name: 'components',
                id: 'Link_1',
                type: "components"
              },
              {
                $type: 'od:Object',
                name: 'folding_wall_table:Product',
                id: 'Object_1',
                attributeValues: "cost=5",
              },
              {
                $type: 'od:Object',
                name: '1:QuantifiedComponent',
                id: 'Object_2',
                attributeValues: "quantity=1",
              }
            ],
          }
          ]
        };
        // then
        expect(rootElement).to.jsonEqual(expected);
      });

    });
  });
});
