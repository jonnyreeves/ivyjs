var ivyjs = require("../");

var ivy = ivyjs({
	organisation: "com.example",
	module: "example"
});

var resolveOptions = {
	/*ivyFile: "ivy.xml",*/
	organisation: "foo.bar",
	module: "epicmod",
	dependencies: [
		{ org: "commons-lang", name: "commons-lang", rev: "2.0" }
	]
}

ivy.resolve(resolveOptions, function (err, result)
{
	if (err) {
		console.log(err);
	}
	else {
		console.log(result);
	}
});