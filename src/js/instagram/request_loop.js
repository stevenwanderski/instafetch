Instagram.RequestLoop = function(request, maxResults){
  this.request = request;
  this.maxResults = maxResults;
  this.running = false;
  this.results = [];
  this.eventEmitter = new EventEmitter();
}

Instagram.RequestLoop.prototype.start = function(){
  this.running = true;
  var deferred = Q.defer();
  this.run(this.request, deferred);
  return deferred.promise;
}

Instagram.RequestLoop.prototype.stop = function(){
  this.running = false;
}

Instagram.RequestLoop.prototype.run = function(request, deferred){
  request.run().then(function(response){

    if(this._responseResultsExist(response)){
      this._storeResults(response.data);
      this.eventEmitter.emit('resultsStored', response.data);
    }

    if(this._stopTheLoop(response)){
      return deferred.resolve(this.results);
    }

    request.urlData = this._nextPaginationToken(response);
    this.run(request, deferred);

  }.bind(this));
}

Instagram.RequestLoop.prototype._responseResultsExist = function(response){
  return response.data !== undefined && response.data.length > 0;
}

Instagram.RequestLoop.prototype._storeResults = function(data){
  this.results = this.results.concat(data);
}

Instagram.RequestLoop.prototype._stopTheLoop = function(response){
  return this._nextPaginationToken(response) === undefined || this.running === false || this.results.length >= this.maxResults;
}

Instagram.RequestLoop.prototype._nextPaginationToken = function(response){
  if(response.pagination.next_max_tag_id !== undefined){
    return { next_max_tag_id: response.pagination.next_max_tag_id }
  }else if(response.pagination.next_cursor !== undefined){
    return { cursor: response.pagination.next_cursor }
  }
  return undefined;
}