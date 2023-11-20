const {
  expect
} = require('chai');

const pkg = require('../../package.json');


describe('object-diagram-moddle', function() {

  it('should expose CJS bundle', function() {
    const ODModdle = require('../../' + pkg['main']);

    expect(new ODModdle()).to.exist;
  });


  it('should expose UMD bundle', function() {
    const ODModdle = require('../../' + pkg['umd:main']);

    expect(new ODModdle()).to.exist;
  });

});