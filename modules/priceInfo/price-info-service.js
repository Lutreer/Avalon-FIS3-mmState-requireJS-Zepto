define(['/modules/common/utils/ajax-proxy'], function(ajaxProxy) {
	return {
		getPriceInfo: function(params) {
			return ajaxProxy.ajax({
					url: "/api/bindinn/priceDetail",
					type: "GET",
					data: params
				})
				//return ajaxProxy.get("/api/bindinn/priceDetail",params)
		},
		resolveDiffer: function(params) {
			return ajaxProxy.get("/api/bindinn/doProcessed", params, "json")
		}
	};
});