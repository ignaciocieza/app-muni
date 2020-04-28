import validator from 'validator';

export const isDNI = (value) => {
    let auxValue = value.toString();
    
    if (!validator.isNumeric(auxValue, {no_symbols: true}) || auxValue.length > 8 || auxValue.length < 7) {
        return ('* Debe contener sólo números y hasta 8 dígitos');
    }
    return;
};

export const isTelefono=(value)=>{
    let auxValue = value.toString();
    
    if (!validator.isNumeric(auxValue, {no_symbols: true}) || auxValue.length > 10 || auxValue.length < 10) {
        return ('* Debe contener sólo números y 10 dígitos');
    }
    return;
}

