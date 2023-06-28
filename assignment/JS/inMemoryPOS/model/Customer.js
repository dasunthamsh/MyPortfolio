function Customer(p_code,p_name,p_address,p_salary) {
    var code = p_code;
    var name = p_name;
    var address = p_address;
    var salary = p_salary;

    this.setCustomerCode = function (c) {
        code = c;
    }
    this.setCustomerName = function (n) {
        name = n;
    }
    this.setCustomerAddress = function (a) {
        address = a;
    }
    this.setCustomerSalary = function (s) {
        salary = s;
    }

    this.getCustomerCode = function () {
        return code;
    }
    this.getCustomerName = function () {
        return name;
    }
    this.getCustomerAddress = function () {
        return address;
    }
    this.getCustomerSalary = function () {
        return salary;
    }
}