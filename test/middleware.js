var assert = require('assert');
var httpMocks = require('node-mocks-http');

var mw = require('../lib/middleware');

describe('Middleware tests', function () {
  describe('#get()', function () {
    it('mw should do stuff', function (done) {
      var request = httpMocks.createRequest();
      var response = httpMocks.createResponse();

      assert.notEqual(mw, null);
      mw(request, response, function () {
        assert.equal(response.test, 'test');
        assert.notEqual(response, null);
        done();
      });
    });
  });
});