const {
  expect
} = require('chai');

const pkg = require('../../package.json');
const pkgExports = pkg.exports['.'];


describe('object-diagram-moddle', function() {

  it('should expose CJS bundle', function() {
    const ODModdle = require('../../' + pkgExports['require']);

    expect(new ODModdle()).to.exist;
  });

});