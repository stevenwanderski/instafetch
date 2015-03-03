var expect = chai.expect;

describe("Instagram API", function(){
  describe("#tags", function(){
    describe("when a successful API response", function(){
      it("returns an array", function(){
        var fakeResponse = { foo: "bar" }
        var instagram = new Instagram.API("foobie");
        var stub = sinon.stub(instagram, "request", function(){
          return Q(fakeResponse);
        })

        return expect(instagram.tag()).to.eventually.equal(fakeResponse);
      });
    });

    describe("when an unsuccessful API response", function(){
      it("returns a string", function(){
        var fakeResponse = "no, no, no.";
        var instagram = new Instagram.API("foobie");
        var stub = sinon.stub(instagram, "request", function(){
          return Q.reject(fakeResponse);
        });
        ;
        return expect(instagram.tag()).to.eventually.be.rejectedWith(fakeResponse);
      });
    });
  });
});