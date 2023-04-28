const assert = require('assert');
const express = require('express');
const app = express();// import the module you want to test

describe('My App', function() {
  describe('GET /', function() {
    it('should return a 200 status code', function() {
      return app.get('/')
        .then(response => {
          assert.equal(response.status, 200);
        });
    });

    it('should return the expected message', function() {
      return app.get('/')
      .then(response => {
        assert.equal(response.status, 200);
      });
    });
  });
});
