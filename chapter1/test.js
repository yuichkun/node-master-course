const _data = require('./lib/data');

// _data.create('test', 'newFile', {'fool': 'bar'}, function(err){
// 	console.log("Result was: ", err);
// });

// @TODO
// _data.read('test', 'newFile', function(err, data){
// 	console.log("Result was: ", err);
// 	console.log('Data', data);
// });


// _data.update('test', 'newFile', { ladkfj: 23424 }, (err, data) => {
// 	console.log("Result was: ", err);
// 	console.log('Data', data);
//  });

// _data.read('test', 'newFile', function(err, data){
// 	console.log("Result was: ", err);
// 	console.log('Data', data);
// });

_data.delete('test', 'newFile', (err) => {
	console.log("Result was: ", err);
 });



