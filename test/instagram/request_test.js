describe("Instagram Request", function(){
  describe("#run", function(){
    afterEach(function(){
      $.ajax.restore();
    });

    describe("when a successful API response", function(){
      it("returns the api response", function(){
        var fakeResponse = { meta: { code: 200 } }
        sinon.stub($, "ajax", function(){
          return Q(fakeResponse);
        });

        var request = new Instagram.Request("some/endpoint", "someToken");
        expect(request.run()).to.eventually.equal(fakeResponse);
      });
    });

    describe("when a successful API response with an error message (ex. bad access token)", function(){
      it("returns the api error", function(){
        var fakeResponse = { meta: { code: 400, error_message: "oh no" } }
        sinon.stub($, "ajax", function(){
          return Q.resolve(fakeResponse);
        });

        var request = new Instagram.Request("some/endpoint", "someToken");
        expect(request.run()).to.eventually.be.rejected;
      });
    });

    describe("when an successful API response (ex. 500 server error)", function(){
      it("returns the api error", function(){
        sinon.stub($, "ajax", function(){
          return Q.reject();
        });

        var request = new Instagram.Request("some/endpoint", "someToken");
        expect(request.run()).to.eventually.be.rejected;
      });
    });

  });

  describe("#urlParams", function(){
    describe("when a max_tag_id is supplied", function(){
      it("returns the accessToken and maxTagId", function(){
        var request = new Instagram.Request("someEndpoint", "someAccessToken");
        request.urlData = { max_tag_id: "someTimestamp" };

        var urlParams = request.urlParams();

        expect(urlParams.access_token).to.equal("someAccessToken");
        expect(urlParams.max_tag_id).to.equal("someTimestamp");
      });
    });

    describe("when a next_cursor is supplied", function(){
      it("returns the accessToken and next_cursor", function(){
        var request = new Instagram.Request("someEndpoint", "someAccessToken");
        request.urlData = { next_cursor: "someTimestamp" };

        var urlParams = request.urlParams();

        expect(urlParams.access_token).to.equal("someAccessToken");
        expect(urlParams.next_cursor).to.equal("someTimestamp");
      });
    });

    describe("when a maxTagId is not supplied", function(){
      it("returns the accessToken", function(){
        var request = new Instagram.Request("someEndpoint", "someAccessToken");

        var urlParams = request.urlParams();

        expect(urlParams.access_token).to.equal("someAccessToken");
        expect(urlParams.max_tag_id).to.be.undefined;
      });
    });
  });
});
