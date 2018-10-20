const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '/../.data/');
const lib = {
	create(dir, file, data, callback) {
		const _path = baseDir + dir + '/' + file + '.json';
		fs.open(_path, 'wx', (err, descriptor) => {
			if (!err && descriptor) {
				const stringData = JSON.stringify(data);
				console.log('tyring to crate file ', stringData);
				fs.writeFile(descriptor, stringData, function (err) {
					if (!err) {
						fs.close(descriptor, function (err) {
							if (!err) {
								callback(false);
							} else {
								callback('Error Closing');
							}
						});
					} else {
						callback('Error writing file');
					}
				});
			} else {
				callback('Could not create new file');
			}
		});
	},
	read(dir, file, callback) { 
		fs.readFile(baseDir + '/' + dir + '/' + file + '.json', 'utf-8', (err, data) => { 
			callback(err, data);
		});
	},
	update(dir, file, data, callback) { 
		fs.open(baseDir + '/' + dir + '/' + file + '.json', 'r+', (err, descriptor) => { 
			if (!err && descriptor) {
				const stringData = JSON.stringify(data);
				fs.truncate(descriptor, (err) => {
					if (!err) { 
						fs.writeFile(descriptor, stringData, (err) => { 
							if (!err) {
								fs.close(descriptor, (err) => {
									if (!err) {
										callback(false, data);
									 } else {
										callback('Error while closing existing file');
									}
								 });
							 } else { 
								callback('Error writing to existing file');
							}
						});
					} else { 
						callback('Error truncating file');
					}
				 });
			} else { 
				callback('Could not update. It may not exist');
			}
		});
	},
	delete(dir, file, callback) {
		const _path = baseDir + dir + '/' + file + '.json';
		fs.unlink(_path, (err) => {
			if (!err) { 
				callback(false);
			} else {
				callback('Error deleting the file')
			}
		 });
	}
};



module.exports = lib;
