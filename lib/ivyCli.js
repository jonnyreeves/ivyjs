var fs = require("fs");
var exec = require("child_process").exec;

var ivyCli = {
	ivyVersion: "2.3.0",
	ivyJar: "ivy-2.3.0.jar",

	getJarPath: function () {
		return __dirname + "/../ivy/" +  this.ivyVersion + "/" + this.ivyJar;
	},

	resolve: function (ivyFilePath, callback) {
		this.execute("-ivy " + ivyFilePath, function (err, res) {
			if (err) {
				var error = new Error("Ivy Resolve Failed");
				error.output = err;
				callback(error);
			}
			else {
				console.log("Ivy Resolve success!");
				callback(null, res);
			}
		});
	},

	execute: function (args, callback) {
		var cmd = "java -verbose -jar " + this.getJarPath() + " " + args;
		console.log("exec: `" + cmd + "`");

		exec(cmd, function (error, stdOut, stdErr) {
			if (error && stdOut) {
				callback(stdOut, null);
			}
			else if (stdErr) {
				callback(stdErr, null);
			}
			else {
				callback(null, stdOut);
			}
		});
	}
};

function verifyIvyJar () {
	if (!fs.existsSync(ivyCli.getJarPath())) {
		throw new Error("Failed to resolve " + ivyCli.ivyJar);
	}
};

verifyIvyJar();

exports = module.exports = ivyCli;