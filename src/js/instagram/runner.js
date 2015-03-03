Instagram.Runner = function(request){
  this.request = request;
  this.running = false;
  this.results = [];
}

Instagram.Runner.prototype.start = function(){
  this.running = true;
  var deferred = Q.defer();
  this.run(this.request, deferred);
  return deferred.promise;
}

Instagram.Runner.prototype.stop = function(){
  this.running = false;
}

Instagram.Runner.prototype.run = function(request, deferred){
  request.run().then(function(response){

    if(this._responseResultsExist(response)){
      this._storeResults(response.data);
      Instagram.events.emit('resultsStored', response.data);
    }

    if(this._stopTheLoop(response)){
      return deferred.resolve(this.results);
    }

    request.maxTagId = response.pagination.next_max_tag_id;
    this.run(request, deferred);

  }.bind(this));
}

Instagram.Runner.prototype._responseResultsExist = function(response){
  return response.data !== undefined && response.data.length > 0;
}

Instagram.Runner.prototype._storeResults = function(data){
  this.results = this.results.concat(data);
}

Instagram.Runner.prototype._stopTheLoop = function(response){
  return response.pagination.next_max_tag_id === undefined || this.running === false;
}