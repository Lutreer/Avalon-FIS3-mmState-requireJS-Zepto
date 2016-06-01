define(['/modules/common/utils/ajax-proxy'], function(ajaxProxy) {
	return {
		getBindInnInfo: function(params) {
			return ajaxProxy.ajax({
					url: "/api/bindinn/getRoomType",
					type: "GET",
					data: params
				})
				//return ajaxProxy.get("/api/bindinn/getRoomType",params)
		},
		syncBindInnInfo: function(params) {
			return ajaxProxy.ajax({
				url: "/api/bindinn/syncRoomType",
				type: "GET",
				data: params
			})
		},
		submitBindInn: function(params) {
			return ajaxProxy.ajax({
				url: "/api/bindinn/bindRoomType",
				type: "POST",
				data: {
					roomTypes: JSON.stringify(params.roomTypes),
					innId: params.innId
				}
			})
		}

	};
});