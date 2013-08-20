'use strict';

angular.module('bcnjs')
	.controller('MainCtrl', function ($scope) {
		var i = 0;
		var today = new Date();

		while(new Date(bcnjs_events[i].date[0], bcnjs_events[i].date[1], bcnjs_events[i].date[2]) <= new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)) {
			i++;
		}

		bcnjs_events[i].date = new Date(bcnjs_events[i].date[0], bcnjs_events[i].date[1], bcnjs_events[i].date[2]);

		$scope.bcnjs = bcnjs_events[i];

		if(!$scope.bcnjs.special) {

			while($scope.bcnjs.talks.length < 3) {
				var empty = {
					title: 'Free slot',
					description: '**This slot could be yours! Submit your talk now.**  You did some crazy stuff with JavaScript? You want to show it to the community?\nDrop us a line on your topic on [Twitter](https://twitter.com/bcnjs) or to [Google+](https://plus.google.com/u/0/communities/115705669406517039298).'
				};
				$scope.bcnjs.talks.push(empty);
			}

		}
	});
