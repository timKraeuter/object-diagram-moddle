export default function(chai, utils) {

  utils.addMethod(chai.Assertion.prototype, 'jsonEqual', function(comparison) {

    const actual = JSON.stringify(this._obj);
    const expected = JSON.stringify(comparison);

    this.assert(
      actual == expected,
      'expected #{this} to deep equal #{act}',
      'expected #{this} not to deep equal #{act}',
      comparison, // expected
      this._obj, // actual
      true // show diff
    );
  });
}