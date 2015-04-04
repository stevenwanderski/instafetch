$(function(){

  var request = new Instagram.Request('users/1074477799/follows', '325278073.2e43c1d.2c7636ff8ab844d085722ea548ad4ef6');
  var runner = new Instagram.RequestLoop(request)
  runner.start().then(function(results){
    console.log(results);
  });

  // var users = [
  //   { id: 1074477799, username: 'birdiepie' },
  //   { id: 1443701228, username: 'hungryfoodies' }
  // ]

});