$("#cusId").focus();

$("#saveCustomer").click(function () {
    let customerId = $("#cusId").val();
    let customerName = $("#cusName").val();
    let customerAddress = $("#address").val();
    let customerSalary = $("#salary").val();

    let customerObject = Customer(customerId,customerName,customerSalary,customerAddress);

    customers.push(customerObject);

    loadAllCustomers();
    bindCusRowClick();
    loadAllCustomerForOption();
    loadAllCusForOrderOpt();
    clearCusTexts();
});

function loadAllCustomers() {
    $("#tblCustomer").empty();

    for (var customer of customers) {
        console.log(customer);

        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.salary}</td><td>${customer.address}</td></tr>`

        $("#tblCustomer").append(row);
    }
}

function bindCusRowClick() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let salary = $(this).children(":eq(2)").text();
        let address = $(this).children(":eq(3)").text();

        $('#cusId').val(id);
        $('#cusName').val(name);
        $('#salary').val(salary);
        $('#address').val(address);
    });
}


$('#customerSearchBtn').click(function () {
    let id = $('#cusId').val();
    let customer = searchCustomer(id);
    if (customer != null) {
        setCusTextField(customer.id,customer.name,customer.salary,customer.address);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There is no Customer available for that id: ' + id,
        });
    }
});

$('#deleteCustomer').click(function () {
    let deleteId = $('#cusId').val();
    let cusOption = confirm("Do you really want to delete customer id: "+deleteId);
    if (cusOption) {
        if(customerDelete(deleteId)) {
            Swal.fire('Customer Successfully Deleted..');
            setCusTextField("","","","");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No such Customer to delete. please check the Id',
            });
        }
    }
});

$('#updateCustomer').click(function () {
    let updateId = $('#cusId').val();
    let response = customerUpdate(updateId);
    if(response){
        Swal.fire('Customer updated Successfully');
        setCusTextField("","","","")
        clearCusUpdates();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Update Failed..!',
        });
    }
});

function customerDelete(deleteCusId){
    let customer = searchCustomer(deleteCusId);
    if(customer != null){
        let cusIndexNo = customers.indexOf(customer);
        customers.splice(cusIndexNo,1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function customerUpdate(id){
    let customer = searchCustomer(id);
    if( customer != null){
        customer.id = $('#cusId').val();
        customer.name = $('#cusName').val();
        customer.salary = $('#salary').val();
        customer.address = $('#address').val();
        loadAllCustomers();
        bindCusRowClick();
        return true;
    } else {
        return false;
    }
}

function searchCustomer(id){
    for (const customer of customers) {
        if(customer.id == id){
            return customer;
        }
    }
    return null;
}

function setCusTextField(id,name,salary,address){
    $('#cusId').val(id);
    $('#cusName').val(name);
    $('#salary').val(salary);
    $('#address').val(address);
}

/****** Customer regular expressions ******/
const regExId = /^(C00-)[0-9]{1,3}$/;
const regCusName = /^[A-z ]{4,20}$/;
const regExSalary = /^\d{0,9}(\.\d{1,4})?$/;
const regExAddress = /^[0-9/A-z. ,]{5,}$/

let customerValidations = [];
customerValidations.push({reg:regExId, field: $('#cusId'),error:'Item Code Pattern Is Wrong : C00-001'});
customerValidations.push({reg:regCusName, field: $('#cusName'),error:'Name Pattern Is Wrong : A-z'});
customerValidations.push({reg:regExSalary, field: $('#salary'),error:'Salary Pattern Is Wrong : 2000 or 2000.00'});
customerValidations.push({reg:regExAddress, field: $('#address'),error:'Address Pattern Is Wrong.'});

$('#cusId,#cusName,#salary,#address').on('keydown',function (event) {
    if (event.key == "Tab"){
        event.preventDefault();
    }
});

$('#cusId,#cusName,#salary,#address').on('keyup',function () {
    customerValidity();
});

$('#cusId,#cusName,#salary,#address').on('blur',function () {
    customerValidity();
});

$('#cusId').on('keydown', function (event) {
    if(event.key == "Enter" && checkCustomer(regExId,$('#cusId'))) {
        $('#cusName').focus();
    }  else {
        $('#cusId').focus();
    }
});

$('#cusName').on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(regCusName, $('#cusName'))) {
        $('#salary').focus();
    }
});

$('#salary').on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(regExSalary, $('#salary'))) {
        $('#address').focus();
    }
});

$('#address').on('keydown', function (event) {
    if (event.key == "Enter" && checkCustomer(regExAddress, $('#address'))) {
        let res = confirm("Do you want to add this customer.?");
        if(res) {
            clearCusTexts();
        }
    }
});

function customerValidity(){
    let errCount = 0;
    for (let validation of customerValidations) {
        if(checkCustomer(validation.reg,validation.field)) {
            inputCusSuccess(validation.field,"");
        } else {
            errCount += 1;
            inputCusError(validation.field,validation.error);
        }
    }
    setCusBtnState(errCount);
}

function checkCustomer(regex,textField){
    let inputValue = textField.val();
    return regex.test(inputValue) ? true : false;
}

function inputCusSuccess(textField,error) {
    if(textField.val().length <= 0){
        defaultCusText(textField,"");
    } else {
        textField.css('border','2px solid green');
        textField.parent().children('span').text(error);
    }
}

function inputCusError(textField,error) {
    if (textField.val().length <= 0) {
        defaultCusText(textField,"");
    } else {
        textField.css('border','2px solid red');
        textField.parent().children('span').text(error);
    }
}

function defaultCusText(textField,error){
    textField.css("border","1px solid #ced4da");
    textField.parent().children('span').text(error);
}

function setCusBtnState(val){
    if (val > 0) {
        $("#saveCustomer").attr('disabled', true);
    } else {
        $("#saveCustomer").attr('disabled', false);
    }
}

function clearCusTexts(){
    $('#cusId').focus();
    $('#cusId,#cusName,#salary,#address').val("");
    customerValidity();
}
