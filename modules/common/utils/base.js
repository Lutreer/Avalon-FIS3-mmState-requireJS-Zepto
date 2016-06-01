define(function() {

	return {
		getParamByName: function(name) {
			var url = decodeURI(window.location.search)
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = url.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		},

		isEmptyObj: function(obj) {
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					return false;
				}
			}
			return true;
		}
	}


});