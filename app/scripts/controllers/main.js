'use strict';

angular.module('bcnjs')
	.controller('MainCtrl', function ($scope) {
		var i = 0;
		var today = new Date();

		while(new Date(bcnjs_events[i].date[0], bcnjs_events[i].date[1], bcnjs_events[i].date[2]) <= new Date(today.getFullYear(), today.getMonth(), today.getDay())) {
			i++;
		}

		bcnjs_events[i].date = new Date(bcnjs_events[i].date[0], bcnjs_events[i].date[1], bcnjs_events[i].date[2]);

		$scope.bcnjs = bcnjs_events[i];
	});
