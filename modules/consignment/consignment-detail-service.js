define(['/modules/common/utils/ajax-proxy'], function(ajaxProxy) {
	return {
		getBankInfo: function(params) {
			return ajaxProxy.ajax({
					url: "/api/proxy/bankInfo",
					type: "GET",
					data: params
				})
				//return ajaxProxy.get("/api/bindinn/priceDetail",params)
		},
		getHistoryBills: function(params) {
			return ajaxProxy.ajax({
				url: "/api/proxy/financeInfo",
				type: "GET",
				data: params
			})
		},
		getBaseInfo: function(params) {
			return ajaxProxy.ajax({
				url: "/api/proxy/innInfo",
				type: "GET",
				data: params
			})
		}
	};
});