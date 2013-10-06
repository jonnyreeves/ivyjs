var validator = {
	validateIvySettings: function (settings) {
		if (!settings || typeof settings !== "object") {
			throw new Error("No IvySettings supplied");
		}

		var requiredPropertyNames = [ "organisation", "module" ];

		requiredPropertyNames.forEach(function (propertyName) {
			if (!settings[propertyName] || typeof settings[propertyName] !== "string") {
				throw new Error("Ivy Settings missing required property: " + propertyName);
			}
		});
	},

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

		var requiredPropertyNames = [ "name", "rev" ];

		requiredPropertyNames.forEach(function (propertyName) {
			if (!dependency[propertyName] || typeof dependency[propertyName] !== "string") {
				throw new Error("Dependency missing required property: " + propertyName);
			}
		});
	}
}

exports = module.exports = validator;