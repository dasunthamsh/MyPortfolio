function Item(p_code,p_name,p_price,p_qty) {
    var code = p_code;
    var name = p_name;
    var price = p_price;
    var qty = p_qty;

    this.setItemCode = function (c){
        code = c;
    }
    this.setItemName = function (n){
        name = n;
    }
    this.setItemPrice = function (p){
        price = p;
    }
    this.setItemQty = function (q){
        qty = q;
    }

    this.getItemCode = function () {
        return code;
    }
    this.getItemName = function () {
        return name;
    }
    this.getItemPrice = function () {
        return price;
    }
    this.getItemQty = function () {
        return qty;
    }
}