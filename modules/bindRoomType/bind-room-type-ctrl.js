define(["./bind-room-type-service", "/modules/common/utils/base"], function(service, baseUtils) {
	var vm = avalon.define({
		$id: "bind-room-type",
		innId: baseUtils.getParamByName("innId"),
		pageInfo: {},
		tempMatch: {
			'tomato': {},
			'another': {}
		},
		init: function() {
			getBindRoomInfo();
		},

		/**
		 * 绑定房型的tap交互
		 * @param bind 点击的房型
		 * @param obj this dom
		 * @param from 房型的来源（tomato/qunar）
		 */
		bindRoom: function(bind, obj, from) {
			$(obj).siblings(".tap-match").removeClass("tap-match");
			$(obj).addClass("tap-match");

			if (from === 'tomato') {
				vm.tempMatch.tomato = bind;
			} else {
				vm.tempMatch.another = bind;
			}
			if (vm.$model.tempMatch.tomato.roomTypeId && vm.$model.tempMatch.another.roomTypeId) {
				vm.pageInfo.match.ensure(vm.$model.tempMatch);
				$(".tap-match").removeClass("tap-match");
				vm.pageInfo.mismatch.tomato = vm.pageInfo.mismatch.tomato.filter(function(el) {
					return el.roomTypeId != vm.$model.tempMatch.tomato.roomTypeId
				});
				vm.pageInfo.mismatch.another = vm.pageInfo.mismatch.another.filter(function(el) {
					return el.roomTypeId != vm.$model.tempMatch.another.roomTypeId
				})
				vm.tempMatch = {
					'tomato': {},
					'another': {}
				};
			}

		},

		/**
		 * 解绑房型的tap交互
		 * @param unbind 点击的房型
		 * @param index 遍历的索引值
		 */
		unbindRoom: function(unbind, index, obj) {
			$(obj).parent().fadeOut(250)
			setTimeout(function() {
				var tomato = unbind.$model.tomato,
					another = unbind.$model.another;
				vm.pageInfo.match.removeAt(index);
				vm.pageInfo.mismatch.tomato.unshift(tomato);
				vm.pageInfo.mismatch.another.unshift(another);

			}, 240)
		},
		/**
		 * 提交要绑定的房型
		 */
		submitBindRoom: function() {

			var bindRooms = vm.$model.pageInfo.match;
			var submitData = {
				innId: vm.$model.innId,
				roomTypes: {
					list: []
				}
			};
			for (var i = 0, l = bindRooms.length; i < l; i++) {
				submitData.roomTypes.list.push({
					channelRoomTypeId: bindRooms[i].another.roomTypeId,
					roomTypeId: bindRooms[i].tomato.roomTypeId
				});
			}

			service.submitBindInn(submitData).done(function(data) {
					$.toast("绑定成功", 800);
				})
				.fail(function() {
					$.toast("绑定失败", 800);
				})
				.always(function() {
					//close loading
				});

		}

	});

	/**
	 * 初始化 获取当前页面客栈和去哪儿的信息
	 */
	function getBindRoomInfo() {
		if (baseUtils.getParamByName("isFromHeader") === "1") {
			service.syncBindInnInfo({
					innId: vm.$model.innId
				}).done(function(data) {
					if (data.status == 200) {
						vm.pageInfo = data;
						avalon.scan();
					} else {
						avalon.router.go("error", {}, {
							reload: true
						})
					}
				})
				.fail(function() {
					avalon.router.go("error", {}, {
						reload: true
					})
				})
				.always(function() {});
		} else {

			service.getBindInnInfo({
					innId: vm.$model.innId
				}).done(function(data) {
					if (data.status == 200) {
						vm.pageInfo = data;
						avalon.scan();
					} else {
						avalon.router.go("error", {}, {
							reload: true
						})
					}
				})
				.fail(function() {
					avalon.router.go("error", {}, {
						reload: true
					})
				})
				.always(function() {});
		}
	}

	return avalon.controller(function($ctrl) {
		$ctrl.$onRendered = function() {

		};
		$ctrl.$onEnter = function(param, rs, rj) {
			vm.init();
		};
		$ctrl.$onBeforeUnload = function() {};
		$ctrl.$vmodels = [vm];
	})

});