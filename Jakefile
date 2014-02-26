fs = require('fs');
bcnjs2013 = require('./contents/2013');
bcnjs2014 = require('./contents/2014');

desc('Monthly talks');
task('copy', [], function () {
	console.info('Copying for next month');
	var
		found = false,
		next_event = {};

	bcnjs2014.forEach(function (event) {
		var event_date = new Date(event.date);
		if (event_date >= new Date() && !found) {
			next_event = event;
			found = true;
		}
	});
	
	fs.writeFile('./contents/_index/events.json', next_event.talks, function (err) {
		console.info('Done. Next event: ' + new Date(next_event.date).toDateString());
		complete();
	});
	
}, true);

task('clear', [], function () {
	console.info('Cleaning for next month');
	fs.writeFile('./contents/_index/events.json', '[{},{}]', function (err) {
		complete();
	});
}, true);