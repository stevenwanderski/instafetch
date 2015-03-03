describe("Instagram.Runner", function(){
  describe("#start", function(){
    var request;

    beforeEach(function(){
      request = new Instagram.Request("foo/bar", "access-token");
      var stub = sinon.stub(request, "run");
      stub.onCall(0).returns(Q({ pagination: { next_max_tag_id: 123 }, data: ["a", "b"] }));
      stub.onCall(1).returns(Q({ pagination: { next_max_tag_id: 123 }, data: ["c", "d"] }));
      stub.onCall(2).returns(Q({ pagination: {}, data: [] }));
    });

    it("stores the data results until next_max_tag_id is not present", function(){
      var runner = new Instagram.Runner(request);

      return expect(runner.start()).to.eventually.eql(["a", "b", "c", "d"]);
    });

    it("stops looping if the running flag is false", function(asyncDone){
      var runner = new Instagram.Runner(request);

      runner.start().then(function(results){
        expect(results).to.eql(["a", "b"]);
        asyncDone();
      }).done();

      runner.running = false;
    });
  });
});