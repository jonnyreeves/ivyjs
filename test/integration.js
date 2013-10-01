var ivyjs = require("../");

var ivy = ivyjs();

var dependencies = [
	{ org: "commons-lang", name: "commons-lang", rev: "5.0" }
];

ivy.resolve(dependencies, function (err, result)
{
});