var fs = require("fs");
var exec = require("child_process").exec;
var ResolveOutputParser = require("./resolveOutputParser");

var ivyCli = {
	ivyVersion: "2.3.0",
	ivyJar: "ivy-2.3.0.jar",

	getJarPath: function () {
		return __dirname + "/../../ivy/" +  this.ivyVersion + "/" + this.ivyJar;
	},

	resolve: function (ivyFilePath, callback) {
		this.execute("-ivy " + ivyFilePath, function (err, res) {
			callback(err, res);
		});
	},

	execute: function (args, callback) {
		var cmd = "java -jar " + this.getJarPath() + " " + args;
		console.log("exec: `" + cmd + "`");

		exec(cmd, function (error, stdOut, stdErr) {
			new ResolveOutputParser(error, stdOut, stdErr).invoke(callback);
		});
	}
};

function verifyIvyJar () {
	if (!fs.existsSync(ivyCli.getJarPath())) {
		throw new Error("Failed to resolve " + ivyCli.getJarPath());
	}
};

verifyIvyJar();

exports = module.exports = ivyCli;