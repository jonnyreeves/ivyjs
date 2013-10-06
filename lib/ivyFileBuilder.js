var XMLWriter = require('xml-writer');

var IvyFileBuilder = function (options) {
	this._options = options;
	this._writer = new XMLWriter();
}

IvyFileBuilder.prototype = {
	build: function () {
		this._writer.startDocument();
		this._appendRootIvyElement();
		this._appendInfoElement();
		this._appendDependencies();
		this._writer.endDocument();

		return this._writer.toString();
	},

	_appendRootIvyElement: function () {
		this._writer.startElement('ivy-module');
		this._writer.writeAttribute('version', '2.0');
	},

	_appendInfoElement: function () {
		this._writer.startElement("info");
		this._writer.writeAttribute('organisation', this._options.organisation);
		this._writer.writeAttribute('module', this._options.module);
		this._writer.endElement("info");
	},

	_appendDependencies: function () {
		if (this._options.dependencies && this._options.dependencies.length)
		{
			this._writer.startElement("dependencies");
			this._options.dependencies.forEach(function (dependency) {
				this._appendDependencyElement(dependency);
			}, this);
		}
	},

	_appendDependencyElement: function (dependency) {
		this._writer.startElement("dependency");
		this._writer.writeAttribute('org', dependency.org);
		this._writer.writeAttribute('name', dependency.name);
		this._writer.writeAttribute('rev', dependency.rev);
		this._writer.endElement("dependency");
	}
}

exports = module.exports = IvyFileBuilder;