/**
 * Parses the output from the `resolve` command.  Note this implementation is very rough and ready - it would be
 * much saner to parse the generated XML file.
 *
 * @param {?Error} err
 * @param {?string} stdOut
 * @param {?string} stdErr
 * @constructor
 */
var ResolveOutputParser = function (err, stdOut, stdErr) {
	if (!err) {
		this.error = null
		this.result = this._createResultFrom(stdOut);
	}
	else {
		this.result = null;
		this.error = this._createErrorFrom(stdOut, stdErr);
	}
}

ResolveOutputParser.prototype = {
	invoke: function (fn) {
		fn(this.error, this.result);
	},

	_createErrorFrom: function (stdOut, stdErr) {
		var error;

		if (stdOut.indexOf("UNRESOLVED DEPENDENCIES") !== -1) {
			error = this._formatUnresolvedDependenciesError(stdErr);
		}
		else {
			error = new Error("Ivy Dependency Resolution Error");
		}

		error.stdOut = stdOut;
		error.stdErr = stdErr;
		return error;
	},

	_formatUnresolvedDependenciesError: function (stdOut) {
		var error = new Error("Failed to resolve one or more dependencies");
		error.unresolvedDependencies = this._parseUnresolvedDependenciesFrom(stdOut);
		return error;
	},

	_parseUnresolvedDependenciesFrom: function (stdOut) {
		var headerIdx = stdOut.indexOf("UNRESOLVED DEPENDENCIES");
		var lines = stdOut.substr(headerIdx).split("\n").slice(4);
		var unresolvedDependencies = [];

		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];

			if (line === undefined || line.indexOf(":::") !== -1) {
				break;
			}
			else if (line !== "") {
				unresolvedDependencies.push(line.substr(5));
			}
		}

		return unresolvedDependencies;
	},

	_createResultFrom: function (stdOut) {
		var result = this._parseResultTableFrom(stdOut);
		result.stdOut = stdOut;

		return result;
	},

	_parseResultTableFrom: function (stdOut) {
		var tableIdx = stdOut.indexOf("dwnlded");
		var lines = stdOut.substr(tableIdx).split("\n").slice(2);
		var resultsTable = [];

		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			if (line === undefined || line.indexOf("--") !== -1) {
				break;
			}
			else {
				resultsTable.push(this._parseResultsTableRow(line.trim()));
			}
		}

		return resultsTable;
	},

	_parseResultsTableRow: function (row) {
		var cols = row.split("|");
		return {
			configuration: cols[1].trim(),
			modules: {
				number: parseInt(cols[2], 10),
				search: parseInt(cols[3], 10),
				downloaded: parseInt(cols[4], 10),
				evicted: parseInt(cols[5], 10)
			},
			artifacts: {
				number: parseInt(cols[7], 10),
				downloaded: parseInt(cols[8], 10)
			}
		}
	}
}

exports = module.exports = ResolveOutputParser;