// Instagram.renderer = new Instagram.Renderer();

// $(function(){

//   var request = new Instagram.Request('tags/food/media/recent', '325278073.2e43c1d.2c7636ff8ab844d085722ea548ad4ef6');
//   var runner = new Instagram.Runner(request);

//   $('a#start').on('click', function(e){
//     e.preventDefault();
//     runner.start();
//   });

//   $('a#stop').on('click', function(e){
//     e.preventDefault();
//     runner.stop();
//   });

// });


// // running = true;

// // var instagram = new Instagram.Request('tags/food/media/recent', '325278073.2e43c1d.2c7636ff8ab844d085722ea548ad4ef6');

// // var runIt = function(instagram){
// //   var deferred = Q.defer();

// //   _runIt(instagram, deferred);

// //   return deferred.promise;
// // }

// // var _runIt = function(instagram, deferred){
// //   instagram.run().then(function(response){
// //     console.log(response);
// //     if(!running){
// //       return deferred.resolve("hey");
// //     }
// //     var maxTagId = response.pagination.next_max_tag_id;
// //     var instagram2 = new Instagram.Request('tags/food/media/recent', '325278073.2e43c1d.2c7636ff8ab844d085722ea548ad4ef6', maxTagId);
// //     _runIt(instagram2, deferred);
// //   });
// // }

// // // runIt(instagram).then(function(){
// // //   console.log('we done, jack.');
// // // });