(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;

    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var get_selector = window.jQuery(CHECKLIST_SELECTOR);
    var server_url = this.serverUrl;
    $.getJSON(server_url, function(json) {
      for (var i = 0; i < json.length; i++){
        var rowElement = new Row(json[i]);
        get_selector.append(rowElement.$element);
      }
    });
  }

  function Row(coffeeOrder) {
    var $div = window.jQuery('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });
    var $label = window.jQuery('<label></label>');
    var $checkbox = window.jQuery('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });
    var description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }
    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';
    description += ' [' + coffeeOrder.strength + 'x]';
    $label.append($checkbox);
    $label.append(description);
    $div.append($label);
    this.$element = $div;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    $.post(this.serverUrl, val, function (serverResponse) {
      console.log(serverResponse);
    });
  };
  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverUrl, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
    $.ajax(this.serverUrl, {
      type: 'GET'
    });
  };
  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + '/' + key, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
    $.ajax(this.serverUrl + '/' + key, {
      type: 'GET'
    });
  };
  RemoteDataStore.prototype.remove = function (key) {


  /*  dpd.coffeeorders.del({emailAddress:key, id:{$ne:'null'}}, function(result,error){
          console.log(error);
          console.log(result);
        });
      };


*/

    var server_url = this.serverUrl;
    $.getJSON(server_url, function(json) {
      for (var i = 0; i < json.length; i++){
        if (json[i].emailAddress == key){
          $.ajax({
            type: 'POST',
            url: server_url + '/' + json[i].id + '?_method=DELETE',
            success: function() {
              // Object was deleted. response body empty.
            },
            error: function() {}
          });
        }
      }
    });


  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
