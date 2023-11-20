import expect from '../expect.js';

import {
  createModdle
} from '../helper.js';

describe('object-diagram-moddle', function() {

  var moddle = createModdle();

  describe('parsing', function() {

    it('should publish type', function() {

      // when
      var type = moddle.getType('od:Object');

      // then
      expect(type).to.exist;
      expect(type.$descriptor).to.exist;
    });

    it('should redefine property', function() {

      // when
      var type = moddle.getType('odDi:OdShape');

      // then
      expect(type).to.exist;

      var descriptor = type.$descriptor;

      expect(descriptor).to.exist;
      expect(
        descriptor.propertiesByName['di:modelElement']
      ).to.eql(
        descriptor.propertiesByName['bpmndi:bpmnElement']
      );
    });

  });

  describe('creation', function() {

    it('should create object', function() {
      const sequenceFlow = moddle.create('od:Object');

      expect(sequenceFlow.$type).to.eql('od:Object');
    });

    it('should create link', function() {
      const definitions = moddle.create('od:Link');

      expect(definitions.$type).to.eql('od:Link');
    });

    it('should create textbox', function() {
      const definitions = moddle.create('od:TextBox');

      expect(definitions.$type).to.eql('od:TextBox');
    });
  });

  describe('property access', function() {

    describe('singleton properties', function() {

      it('should set attribute', function() {

        // given
        const object = moddle.create('od:Object');

        // assume
        expect(object.get('attributeValues')).not.to.exist;

        // when
        object.set('attributeValues', '123');

        // then
        expect(object).to.jsonEqual({
          $type: 'od:Object',
          attributeValues: '123'
        });
      });

      it('should set attribute (ns)', function() {

        // given
        const object = moddle.create('od:Object');

        // when
        object.set('od:attributeValues', '123');

        // then
        expect(object).to.jsonEqual({
          $type: 'od:Object',
          attributeValues: '123'
        });
      });

      it('should set id attribute', function() {

        // given
        const object = moddle.create('od:Object');

        // when
        object.set('id', 10);

        // then
        expect(object).to.jsonEqual({
          $type: 'od:Object',
          id: 10
        });
      });
    });

    describe('builder', function() {

      it('should create simple hierarchy', function() {

        // given
        const definitions = moddle.create('od:Definitions');
        const rootElements = definitions.get('od:rootElements');

        const object = moddle.create('od:Object');
        const link = moddle.create('od:Link');

        // when
        rootElements.push(link);
        rootElements.push(object);

        // then
        expect(rootElements).to.eql([ link, object ]);
        expect(definitions.rootElements).to.eql([ link, object ]);

        expect(definitions).to.jsonEqual({
          $type: 'od:Definitions',
          rootElements: [
            { $type: 'od:Link' },
            { $type: 'od:Object' }
          ]
        });
      });

    });

  });

});