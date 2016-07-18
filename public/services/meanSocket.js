/*global io:false*/
'use strict';

var baseUrl = 'http://localhost:3000/';

angular.module('mean.socket').factory('MeanSocket', function($rootScope) {

 var socket = require('../assets/lib/socket.io-client')('http://localhost:3000/');
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				console.log('event:', eventName);
				var args = arguments;
				$rootScope.$apply(function() {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};
});
