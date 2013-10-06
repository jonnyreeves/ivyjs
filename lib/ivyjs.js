var IvyFileBuilder = require("./ivyFileBuilder");
var IvyFileWriter = require("./ivyFileWriter");
var validator = require("./validator");
var ivyCli = require("./cli/ivyCli");

/**
 * @constructor
 */
function IvyJS(ivySettings) {
}

IvyJS.prototype = {

	/**
	 * Resolves the supplied list of dependencies and places them into the ivy cache.
	 *
	 * @param {object} options
	 * @param {function} fn
	 */
	resolve: function (options, fn)
	{
		var ivyFile;

		if (options.ivyFile) {
			ivyFile = options.ivyFile;
		}
		else {
			ivyFile = new IvyFileWriter(new IvyFileBuilder(options)).writeFile();
		}


		ivyCli.resolve(ivyFile, fn);
	}
}

/**
 * @returns {IvyJS}
 */
function createInstance(ivySettings) {
	return new IvyJS(ivySettings);
}

exports = module.exports = createInstance;