define(["./consignment-detail-service", "/modules/common/utils/base"], function(service, baseUtils) {
	var vm = avalon.define({
		$id: 'consignment-detail',
		innId: baseUtils.getParamByName("innId"),
		appKey: baseUtils.getParamByName("appKey"),
		tabIndex: 1,
		upshelfStatus: 1, //0: 未上架；1：已上架；2：已下架
		baseInfo: {
			base: [],
			sale: [],
			percentage: 0
		},
		bankInfo: {}, //结算信息-收款信息
		billsListInfo: [], //结算信息-历史账单
		pageNo: 1,
		pageSize: 10,
		totalPages: 0,
		isLoadTabA: false, //是否已加载tabIndex＝＝１
		isLoadTabB: false, //是否已加载tabIndex＝＝２
		showBottomLoading: false,
		init: function() {
			//加载数据就不再加载
			if (vm.$model.tabIndex == 2 && vm.$model.isLoadTabB === false) {
				//结算信息
				getBankInfo();
				getHistoryBills(vm.$model.pageNo, vm.$model.pageSize, false);
				// 添加'refresh'监听器
				$(document).on('refresh', '.pull-to-refresh-content', function(e) {
					getHistoryBills(1, 10, true);
				});
			} else if (vm.$model.tabIndex == 1 && vm.$model.isLoadTabA === false) {
				//基本信息
				getBaseInfo();
			}
			avalon.scan()

		},
		infiniteScrollBottom: function() {
			event.stopPropagation();
			var bodyHeight = $("body").height(),
				preloaderHeight = $(".infinite-scroll-preloader").height(),
				preloaderTop = $(".infinite-scroll-preloader").offset().top;
			if (preloaderTop < (bodyHeight + preloaderHeight + 40) && vm.$model.pageNo < vm.$model.totalPages) {
				vm.showBottomLoading = true;
				getinfiniteScrollLoadBills(vm.$model.pageNo + 1, vm.$model.pageSize)
			}
		},
		tabChange: function(tabIndex) {
			vm.tabIndex = tabIndex;
			vm.init();
		}
	});

	/**
	 * 基本信息 tabIndex==1
	 */
	function getBaseInfo() {
		var params = {
			pmsInnId: vm.$model.innId
		}
		service.getBaseInfo(params).done(function(data) {
			if (data.status == 200) {
				if (baseUtils.isEmptyObj(data.channels)) {
					vm.upshelfStatus = 0; //  未上架
				} else { // 已上架或已下架
					//vm.upshelfStatus = 1;//  已上架
					vm.baseInfo = {
						base: data.channels.base,
						sale: data.channels.sale,
						percentage: data.percentage
					};
				}
				vm.isLoadTabA = true;
			} else {
				avalon.router.go("error", {}, {
					reload: true
				})
			}
		}).fail(function() {
			avalon.router.go("error", {}, {
				reload: true
			})
		}).always(function() {
			avalon.scan();
		});
	}


	/**
	 * 结算信息-账户信息 tabIndex==2
	 */
	function getBankInfo() {
		var params = {
			pmsInnId: vm.$model.innId,
			appKey: vm.$model.appKey
		}
		service.getBankInfo(params).done(function(data) {
			if (data.status == 200 && data.vo) {
				vm.bankInfo = data.vo
			} else if (!data.vo) {
				vm.bankInfo.bankAccount = "";
				vm.bankInfo.bankCode = "";
				vm.bankInfo.bankName = "";
				vm.bankInfo.bankAddress = "";
			} else {
				avalon.router.go("error", {}, {
					reload: true
				})
			}
		}).fail(function() {
			avalon.router.go("error", {}, {
				reload: true
			})
		}).always(function() {
			avalon.scan();
		});
	}

	/**
	 * 结算信息-历史账单 tabIndex==2
	 * @param pageNo
	 * @param pageSize
	 */
	function getHistoryBills(pageNo, pageSize, isPullTopRefresh) {
		var params = {
			pmsInnId: vm.$model.innId,
			appKey: vm.$model.appKey,
			pageNo: pageNo,
			pageSize: pageSize
		}

		service.getHistoryBills(params).done(function(data) {
			if (data.status == 200) {
				vm.billsListInfo = data.list;
				vm.pageNo = data.page.page;
				vm.pageSize = data.page.rows;
				vm.totalPages = data.page.pageCount;
			} else if (data.status == 400) {
				vm.billsListInfo = [];
			} else {
				avalon.router.go("error", {}, {
					reload: true
				})
			}

			vm.isLoadTabB = true;
		}).fail(function() {
			avalon.router.go("error", {}, {
				reload: true
			})
		}).always(function() {
			if (isPullTopRefresh == true) {
				$.pullToRefreshDone('.pull-to-refresh-content');
			}
			avalon.scan();
		});

	}

	/**
	 * 结算信息-历史账单-滚动加载 tabIndex==2
	 * @param pageNo
	 * @param pageSize
	 */
	function getinfiniteScrollLoadBills(pageNo, pageSize) {
		var params = {
			pmsInnId: vm.$model.innId,
			appKey: vm.$model.appKey,
			pageNo: pageNo,
			pageSize: pageSize
		}
		service.getHistoryBills(params).done(function(data) {
			if (data.status == 200) {
				vm.billsListInfo.pushArray(data.list)
				vm.pageNo = data.page.page;
				vm.pageSize = data.page.rows;
				vm.totalPages = data.page.pageCount;
			} else if (data.status == 400) {
				vm.billsListInfo = [];
			} else {
				avalon.router.go("error", {}, {
					reload: true
				})
			}
		}).fail(function() {
			avalon.router.go("error", {}, {
				reload: true
			})
		}).always(function() {
			vm.showBottomLoading = false;
			avalon.scan();
		});
	}

	return avalon.controller(function($ctrl) {
		$ctrl.$onRendered = function() {};
		$ctrl.$onEnter = function(param, rs, rj) {
			vm.init();
		};
		$ctrl.$onBeforeUnload = function() {};
		$ctrl.$vmodels = [vm];
	})
});