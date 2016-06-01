define([], function() {

	var user = {
		apiAuthInfo: {
			token: "",
			userCode: ""
		},
		setApiAuthInfo: function(apiAuthInfo) {
			this.apiAuthInfo = apiAuthInfo;
		},
		getApiAuthInfo: function() {
			return this.apiAuthInfo;
		}

	}



	return {
		setApiAuthInfo: function(apiAuthInfo) {
			user.setApiAuthInfo(apiAuthInfo);
		},
		getApiAuthInfo: function() {
			return user.getApiAuthInfo();
		}
	}
});