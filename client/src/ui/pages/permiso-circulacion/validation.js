import validator from 'validator';

export const isDNI = (value) => {
    let auxValue = value.toString();
    
    if (!validator.isNumeric(auxValue) || auxValue.length > 8 || auxValue.length < 8) {
        return ('* Debe contener solo numeros y no mas de 8 caracteres');
    }
    return;
};

