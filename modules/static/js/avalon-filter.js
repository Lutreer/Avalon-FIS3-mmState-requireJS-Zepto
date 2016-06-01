//代销详情-结算状态
avalon.filters.consignmentSettlementStatus = function(status) {
    var consignmentSettlementStatus;
    switch (status) {
        case "0":
            consignmentSettlementStatus = "未结算";
            break
        case "1":
            consignmentSettlementStatus = "已结算";
            break
        case "2":
            consignmentSettlementStatus = "纠纷延期";
            break
        default:
            consignmentSettlementStatus = status;
    }
    return consignmentSettlementStatus;
}

//代销详情-确认状态
avalon.filters.consignmentConfirmStatus = function(status) {
    var consignmentConfirmStatus;
    switch (status) {
        case "0":
            consignmentConfirmStatus = "未确认";
            break
        case "1":
            consignmentConfirmStatus = "已确认";
            break
        case "2":
            consignmentConfirmStatus = "系统自动确认";
            break
        default:
            consignmentConfirmStatus = status;
    }
    return consignmentConfirmStatus;
}