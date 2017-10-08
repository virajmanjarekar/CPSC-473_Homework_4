 (function (window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url){
    if(!url){
      throw new Error('No remote URL supplied');
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    /* $.post(this.serverUrl, JSON.stringify(val), function (data,status) {
      console.log(status);
       console.log(data);
     });*/
    dpd.coffeeorders.post(val, function(result, err) {
      if(err) return console.log(err);
      console.log(result, result.id);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb){
    dpd.coffeeorders.get(function (result, err) {
      if(err) return console.log(err);
      cb(result);
    });
  };

  RemoteDataStore.prototype.get = function(key, cb){
    dpd.coffeeorders.get({emailAddress:key, id:{$ne:'null'}}, function(result){
      console.log(result);
      console,log(cb);
    });
  } ;

  RemoteDataStore.prototype.remove = function(key){
    dpd.coffeeorders.del({emailAddress:key, id:{$ne:'null'}}, function(result,error){
      console.log(error);
      console.log(result);
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
