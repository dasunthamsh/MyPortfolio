var customers = new Array();
customers.push(new Customer('C-000-000','Dinuth Dheeraka', 'Kalutara',9877654565));
customers.push(new Customer('C-000-001', 'Sethmal Fonseka', 'Galle',9876543456));
customers.push(new Customer('C-000-002',  'Kaveen Kashmika', 'Jaffna', 8767654345));

var items = new Array();
items.push(new Item('I-000-000','Kome',400,10));
items.push(new Item('I-000-001','Toffee',20,100));
items.push(new Item('I-000-002','Jam',500,200));

var orders = new Array();

var ordersHistory = new Array();
var test = new Array();
test.push({code:'I-000-001',name:'Kome',price: 100, qty:10});
test.push({code:'I-000-002',name:'Toffee',price: 5, qty:50});
ordersHistory.push({
    orderCode : 'OR-0000',
    customerCode : 'C-000-000',
    total : 10,
    subtotal : 10,
    discount : 10,
    cash : 10,
    balance : 10,
    itemsList : test
});