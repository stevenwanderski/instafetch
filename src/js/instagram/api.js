Instagram.API = function(token){
  this.token = token;
}

Instagram.API.prototype.tag = function(hashTag, maxTagId){
  return this.request('tags/' + hashTag + '/media/recent', maxTagId);
}

Instagram.API.prototype.request = function(endpoint, maxTagId){
  new Instagram.Request(endpoint, this.token, maxTagId).run();
}