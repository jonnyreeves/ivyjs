var validator = {
	validateDependencies: function (dependencies)
	{
		if (dependencies && (!Array.isArray(dependencies))) {
			throw new Error("Dependencies must be an Array");
		}

		dependencies.forEach(function (dependency) {
			this.validateDependency(dependency);
		}, this);
	},

	validateDependency: function (dependency) {
		if (!dependency || typeof dependency !== "object") {
			throw new Error("Dependency must be an object");
		}

		var requiredPropertyNames = [ "org", "name", "rev" ];

		requiredPropertyNames.forEach(function (propertyName) {
			if (!dependency[propertyName] || typeof dependency[propertyName] !== "string") {
				throw new Error("Dependency missing required `" + propertyName + "` property");
			}
		});
	}
}

exports = module.exports = validator;