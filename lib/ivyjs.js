var IvyFileBuilder = require("./ivyFileBuilder");
var IvyFileWriter = require("./ivyFileWriter");
var validator = require("./validator");
var ivyCli = require("./ivyCli");

function IvyJS() {
	console.log("Hello from IvyJS!");
}

IvyJS.prototype = {
	resolve: function (dependencies)
	{
		this._validateDependencies(dependencies);

		var fileWriter = new IvyFileWriter(new IvyFileBuilder(dependencies));
		var ivyFilePath = fileWriter.writeFile();

		ivyCli.resolve(ivyFilePath, function (err, res) {
			console.log(err, res);
		});
	},

	_validateDependencies: function (dependencies) {
		validator.validateDependencies(dependencies);
	}
}

function createInstance() {
	return new IvyJS();
}

exports = module.exports = createInstance;