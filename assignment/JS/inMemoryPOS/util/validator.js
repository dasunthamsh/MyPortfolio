function validateAllInputs(arr) {
    let isValid = true;
    for(let v of arr){
        if(v.input.val()!=''){
            if(v.regex.test(v.input.val())){
                v.input.css('border','1px solid #c4c7c4');
                v.valid.css('visibility','hidden');
                isValid&=true;
            }else{
                v.input.css('border','3px solid red');
                v.valid.css('visibility','visible');
                isValid&=false;
            }
        }else{
            v.input.css('border','1px solid #c4c7c4');
            v.valid.css('visibility','hidden');
            isValid&=false;
        }
    }
    return isValid;
}

function validateInput(x) {
    for(let v of itemValidations){
        if(v.name==x){
            return v.regex.test(v.input.val());
        }
    }
    return false;
}