var temp = require("temp");
var fs = require("fs");

var IvyFileWriter = function (ivyFileBuilder) {
	this._builder = ivyFileBuilder;

	temp.track();
}

IvyFileWriter.prototype = {
	writeFile: function () {
		var tempInfo = temp.openSync("ivyjs-ivyfile");
		var outputFilePath = null;

		if (tempInfo && tempInfo.fd) {
			this._tryWriteFile(tempInfo, this._tryGetFileContents());
			outputFilePath = tempInfo.path;
		}
		else {
			throw new Error("Failed to allocate temp file: " + tempInfo);
		}

		return outputFilePath;
	},

	_tryGetFileContents: function () {
		try {
			var contents = this._builder.build();
			console.log(contents);
			return contents;
		}
		catch (e) {
			throw new Error("Failed to get IvyFile contents: " + e.message);
		}
	},

	_tryWriteFile: function (tempInfo, fileContents) {
		try {
			fs.writeSync(tempInfo.fd, fileContents);
			fs.closeSync(tempInfo.fd);
		}
		catch (e) {
			throw new Error("Failed to write IvyFile: " + e.message);
		}
	}
}

exports = module.exports = IvyFileWriter;