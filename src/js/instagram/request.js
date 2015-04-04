Instagram.Request = function(endpoint, accessToken, urlData){
  this.baseUrl = 'https://api.instagram.com/v1/';
  this.endpoint = endpoint;
  this.accessToken = accessToken;
  this.urlData = urlData;
}

Instagram.Request.prototype.run = function(){
  var deferred = Q.defer();

  this._run().then(function(response){
    if(response.meta.code == 200){
      deferred.resolve(response);
    }else{
      deferred.reject(response.meta.error_message);
    }
  }, function(){
    deferred.reject('Severed connection to Insta');
  });

  return deferred.promise;
}

Instagram.Request.prototype._run = function(){
  return Q(
    $.ajax({
      url: this.baseUrl + this.endpoint,
      type: 'GET',
      dataType: 'jsonp',
      data: this.urlParams()
    })
  );
}

Instagram.Request.prototype.urlParams = function(){
  var params = { access_token: this.accessToken, count: 100 }
  if(typeof this.urlData !== 'undefined'){ $.extend(params, this.urlData); }
  return params;
}