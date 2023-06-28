var selectedItemCode = '';
var selectedCustomer = '';
$(document).ready(function () {
    loadItemIdsToCmbx();
    loadCustomerIdsToCmbx();
    loadCustomerTblData();
    loadItemTblData();
    autoGenerateOrderId();
});

$(document).ready(function () {
    $('#order-page-discount').on('keyup', function (e) {
        if($('#order-page-discount').val()!=''){
            setSubTotal();
        }else{
            $('#order-page-sub-total').val($('#order-page-total').val());
        }
    });
});

$(document).ready(function () {
    $('#order-page-cash').on('keyup', function (e) {
        if($('#order-page-cash').val()!=''){
            let balance = getBalance();
            $('#order-page-balance').val(balance);
            validateCash(balance);
        }else{
            $('#order-page-balance').val('');
        }
    });
});

$('#order-page-item-qty').on('keyup', function (e) {
    let qty = parseInt($('#order-page-item-qty').val());
    let qoh = parseInt($('#order-page-item-qoh').val());
    if(qty>qoh){
        $('#order-page-add-item-btn').prop('disabled', true);
        $('#order-page-item-qty').css('border','3px solid #f50433')
        $('#valid-qty').css('visibility','visible');
    }else{
        $('#order-page-add-item-btn').prop('disabled', false);
        $('#order-page-item-qty').css('border','1px solid #c4c7c4');
        $('#valid-qty').css('visibility','hidden');
    }
});

$('#order-page-search-bar').on('keypress',function (e) {
    if(e.which==13){
        let orderHistory = findOrder($('#order-page-search-bar').val());
        if(orderHistory!=null){
            setSearchedOrderItems(orderHistory.itemsList);
            setSearchedCustomerData(orderHistory.customerCode);
            setSearchedPaymentsDetails(orderHistory);
        }
    }
});

$('#purchase-btn').click(function () {
    if($('#order-page-balance').val()!=''){
        let itemList = duplicateArray(orders);
        addNewOrderHistory(itemList);
        $('#order-page-tbl-body').empty();
        orders = new Array();
        clearInputFieldsData($('#order-page-total'),$('#order-page-sub-total'),$('#order-page-discount'),
            $('#order-page-cash'),$('#order-page-balance'),$('#order-page-item-name'),$('#order-page-item-price'),$('#order-page-item-qoh'),$('#order-page-item-qty'),$('#order-page-customer-name'),
            $('#order-page-customer-address'),$('#order-page-customer-tele'))
        autoGenerateOrderId();
    }else{
        alert('Please enter the cash');
    }
});

function validateCash() {
    if(arguments[0]<0){
        $('#order-page-cash').css('border','3px solid red');
        $('#purchase-btn').prop('disabled', true);
        $('#valid-cash').css('visibility','visible');
    }else{
        $('#order-page-cash').css('border','1px solid #c4c7c4');
        $('#purchase-btn').prop('disabled', false);
        $('#valid-cash').css('visibility','hidden');
    }
}

function setSearchedPaymentsDetails(orderHistory) {
    $('#order-page-total').val(orderHistory.total);
    $('#order-page-sub-total').val(orderHistory.subtotal);
    $('#order-page-discount').val(orderHistory.discount);
    $('#order-page-cash').val(orderHistory.cash);
    $('#order-page-balance').val(orderHistory.balance);
}

function addNewOrderHistory(itemList) {
    ordersHistory.push({
        orderCode : $('#order-page-order-code').val(),
        customerCode : selectedCustomer,
        total : $('#order-page-total').val(),
        subtotal : $('#order-page-sub-total').val(),
        discount : $('#order-page-discount').val(),
        cash : $('#order-page-cash').val(),
        balance :$('#order-page-balance').val(),
        itemsList : itemList
    });
}

function duplicateArray(arr) {
    let itemList = new Array();
    for(let o of arr){
        itemList.push(o);
    }
    return itemList;
}

function findOrder(orderId) {
    for(let o of ordersHistory){
        if(o.orderCode==orderId){
            return o;
        }
    }
    return null;
}

function setSearchedOrderItems(itemList) {
    $('#order-page-tbl-body').empty();
    for(let o of itemList){
        let row = "<tr><td>" + o.code + "</td><td>" + o.name + "</td><td>" + o.price + "</td><td>" + o.qty + "</td><td>" + o.price*o.qty + "</td></tr>";
        $('#order-page-tbl-body').append(row);
    }
}

function loadItemIdsToCmbx() {
    $('#item-id-cmbx').empty();
    for(let i of items){
        let option = "<option>"+i.getItemCode()+"</option>";
        $('#item-id-cmbx').append(option);
    }
}

function loadCustomerIdsToCmbx() {
    $('#customer-id-cmbx').empty();
    for(let c of customers){
        let option = "<option>"+c.getCustomerCode()+"</option>";
        $('#customer-id-cmbx').append(option);
    }
}

function getBalance() {
    return ( parseFloat($('#order-page-cash').val())-parseFloat($('#order-page-sub-total').val()) );
}

function setSubTotal() {
    let discount = parseFloat($('#order-page-total').val())/100*parseFloat($('#order-page-discount').val());
    // $('#order-page-sub-total').val( parseFloat($('#order-page-total').val())-parseFloat($('#order-page-discount').val()) );
    $('#order-page-sub-total').val( parseFloat($('#order-page-total').val())-discount );
}

function setSearchedItemData(itemCode) {
    // clearInputItemData();
    let item = searchItem(itemCode);
    if(item!=null){
        // $('#order-page-item-code').val(item.code);
        $('#order-page-item-name').val(item.getItemCode());
        $('#order-page-item-price').val(item.getItemPrice());
        $('#order-page-item-qoh').val(item.getItemQty());
    }
}

function setSearchedCustomerData(customerCode) {
    let customer = searchCustomer(customerCode);
    if(customer!=null){
        $('#order-page-customer-name').val(customer.getCustomerName());
        $('#order-page-customer-address').val(customer.getCustomerAddress());
        $('#order-page-customer-tele').val(customer.getCustomerSalary());
    }
}

function clearInputItemData() {
    $('#order-page-item-code').val('');
    $('#order-page-item-name').val('');
    $('#order-page-item-price').val('');
    $('#order-page-item-qoh').val('');
}

$('#order-page-add-item-btn').click(function () {
    if($('#order-page-item-qty').val()!=''){
        addNewItemForOrderTbl();
        loadOrderItemTblData();
        $('#order-page-total').val(calculateTotalPrice());
        $('#order-page-sub-total').val(calculateTotalPrice());
    }else{
        alert('please select a item or fill the quantity');
    }
});

function addNewItemForOrderTbl() {
    let orderItem = {
        code: selectedItemCode,
        name: $('#order-page-item-name').val(),
        price: $('#order-page-item-price').val(),
        qty: $('#order-page-item-qty').val()
    }
    if(getOrderItemIndex(selectedItemCode)!=-1){
        updateItemQTY(getOrderItemIndex(selectedItemCode),orderItem.qty);
    }else{
        orders.push(orderItem);
    }
    updateItemQOH(orderItem.code,'decrease',orderItem.qty);
    loadItemTblData();
    setSearchedItemData(selectedItemCode);
    clearInputFieldsData($('#order-page-item-qty'));
}

function loadOrderItemTblData() {
    $('#order-page-tbl-body').empty();
    for(let o of orders){
        let row = "<tr><td>" + o.code + "</td><td>" + o.name + "</td><td>" + o.price + "</td><td>" + o.qty + "</td><td>" + o.price*o.qty + "</td></tr>";
        $('#order-page-tbl-body').append(row);
    }
    addDeleteEvent();
}

function calculateTotalPrice() {
    let total = 0;
    for(let o of orders){
        total+=(o.qty*o.price);
    }
    return total;
}

function getOrderItemIndex(itemCode) {
    for(let i = 0; i<orders.length; i++){
        if(orders[i].code==itemCode){
            return i;
        }
    }
    return -1;
}

function updateItemQTY(orderItemIndex,newQty) {
    let orderItem = orders[orderItemIndex];
    orderItem.qty =parseInt(orderItem.qty)+parseInt(newQty);
}

$('#item-id-cmbx').change(function (e) {
    setSearchedItemData(e.target.value);
    selectedItemCode = e.target.value;
});

$('#customer-id-cmbx').change(function (e) {
    setSearchedCustomerData(e.target.value);
    selectedCustomer = e.target.value;
});

function addDeleteEvent() {
    $('#order-page-tbl-body>tr').dblclick(function () {
        if(confirm('Do you want to remove this item from cart?')){
            updateItemQOH(($(this).children('td:nth-child(1)')).text(),'increase',($(this).children('td:nth-child(4)')).text());
            removeItemFromCart(getOrderItemIndex(($(this).children('td:nth-child(1)')).text()));
            loadOrderItemTblData();
            loadItemTblData();
            setSearchedItemData(selectedItemCode);
            $('#order-page-total').val(calculateTotalPrice());
            $('#order-page-sub-total').val(calculateTotalPrice());
        }
    });
}

function removeItemFromCart(itemIndex) {
    orders.splice(itemIndex,1);
}

function autoGenerateOrderId() {
    if(ordersHistory.length!=0){
        let oldId = ordersHistory[ordersHistory.length-1].orderCode;
        let newNumber = parseInt(oldId.substring(3,oldId.length))+1;
        $('#order-page-order-code').val('OR-'+("000" + newNumber).slice(-4));
    }else{
        $('#order-page-order-code').val('OR-0000');
    }
}