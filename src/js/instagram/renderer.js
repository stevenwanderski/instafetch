// Instagram.Renderer = function(selector, medias){
//   medias.forEach(function(media){
//     var img = $('<img />').attr('src', media.images.thumbnail.url);
//     $(selector).append(img);
//   });
// }

Instagram.Renderer = function(){
  Instagram.events.on('resultsStored', function(newResults){
    console.log('RENDERER');
    console.log(newResults);
  });
}