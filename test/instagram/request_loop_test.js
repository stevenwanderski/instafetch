describe("Instagram.RequestLoop", function(){

  var request;

  beforeEach(function(){
    request = new Instagram.Request("foo/bar", "access-token");
    var stub = sinon.stub(request, "run");
    stub.onCall(0).returns(Q({ pagination: { next_max_tag_id: 123 }, data: ["a", "b"] }));
    stub.onCall(1).returns(Q({ pagination: { next_max_tag_id: 123 }, data: ["c", "d"] }));
    stub.onCall(2).returns(Q({ pagination: {}, data: [] }));
  });

  describe("#start", function(){
    it("stops looping if the running flag is false", function(asyncDone){
      var runner = new Instagram.RequestLoop(request);

      runner.start().then(function(results){
        expect(results).to.eql(["a", "b"]);
        asyncDone();
      }).done();

      runner.running = false;
    });

    describe("when next_max_tag_id is present", function(){
      it("stores the data results until next_max_tag_id is not present", function(){
        var runner = new Instagram.RequestLoop(request);
        return expect(runner.start()).to.eventually.eql(["a", "b", "c", "d"]);
      });
    });
  });

  describe("#_nextPaginationToken", function(){
    describe("when next_max_tag_id is present", function(){
      it("returns next_max_tag_id params", function(){
        var response = { pagination: { next_max_tag_id: "abc" } }
        var runner = new Instagram.RequestLoop(request);
        expect(runner._nextPaginationToken(response)).to.eql({ next_max_tag_id: "abc" });
      });
    });

    describe("when next_cursor is present", function(){
      it("returns cursor params", function(){
        var response = { pagination: { next_cursor: "abc" } }
        var runner = new Instagram.RequestLoop(request);
        expect(runner._nextPaginationToken(response)).to.eql({ cursor: "abc" });
      });
    });
  });
});