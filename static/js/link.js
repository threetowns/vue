define(function() {
	function getExtension(filename) {
		var ext = filename.split('/').pop().split('?').shift();
		return ext.indexOf('.') < 1 ? '' : ext.split('.').pop();
	};
	var importPlugin = {
		load: function(name, req, load, config) {
			var paths = config.baseUrl + config.paths[name],
				fileType = getExtension(config.paths[name]);
			if(config.paths[name].indexOf('http') != -1) paths = config.paths[name];
			switch(fileType) {
				case 'css':
					var link = document.createElement("link");
					link.rel = 'stylesheet';
					link.type = 'text/css';
					link.href = paths;
					link.setAttribute('data-requiremodule', name);
					load(link);
					document.head.appendChild(link);
					break;
				default:
					throw new Error('Unable to load link resource using requirejs-link plugin');
			}
		}
	};
	return importPlugin;
});