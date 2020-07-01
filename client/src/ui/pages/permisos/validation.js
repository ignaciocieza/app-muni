import validator from 'validator';

/**
 * Devuelve null si no hay error.
 * @param {dni} value 
 */
export const isDNI = (value) => {
    let auxValue = value.toString();

    if (!validator.isNumeric(auxValue, { no_symbols: true }) || auxValue.length > 8 || auxValue.length < 7) {
        return ('* Debe contener sólo números y hasta 8 dígitos');
    }
    return;
};

/**
 * Devuelve null si no hay error.
 * @param {telefono} value 
 */
export const isTelefono = (value) => {
    let auxValue = value.toString();

    if (!validator.isNumeric(auxValue, { no_symbols: true }) || auxValue.length > 10 || auxValue.length < 10) {
        return ('* Debe contener sólo números y 10 dígitos');
    }
    return;
}

/**
 * Devuelve null si no hay error.
 * @param {mail} value 
 */
export const isMail = (value) => {
    if (!validator.isEmail(value)) {
        return ('* El correo electrónico debe tener un formato valido');
    }
    return;
};

/**
 * Devuelve un array vacio si no tiene errores.
 * @param {valores de usuario} values 
 */
export const isValidSubmitCirculacion = (values, currentImage, admin) => {
    let respError = [];

    if (isDNI(values.dni)) {
        respError.push({ type: 'error', text: 'Debe ingresar un DNI válido', key: '1' });
    }
    if (isTelefono(values.numeroTelefono)) {
        respError.push({ type: 'error', text: 'Debe ingresar un Número de Teléfono válido', key: '2' });
    }
    if (values.email) {
        if (isMail(values.email)) {
            respError.push({ type: 'error', text: 'Debe ingresar un Email válido', key: '3' });
        }
    }
    if (!values.permisoTipo) {
        respError.push({ type: 'error', text: 'Debe ingresar un Tipo de Permiso', key: '4' });
    }
    if (!currentImage) {
        respError.push({ type: 'error', text: 'Debe ingresar una Imagen', key: '5' });
    }
    if (admin) {
        if (values.permiso === 'PENDIENTE' || !values.permiso) {
            respError.push({ type: 'error', text: 'Debe ingresar un Permiso', key: '6' })
        }
    }
    return respError;
};

export const isValidSubmitIngreso = (userValues) => {
    let respError = [];

    if (isDNI(userValues.dni)) {
        respError.push({ type: 'error', text: 'Debe ingresar un DNI válido', key: '7' });
    };
    if (userValues.numeroTelefono) {
        if (isTelefono(userValues.numeroTelefono)) {
            respError.push({ type: 'error', text: 'Debe ingresar un Número de Teléfono válido', key: '8' });
        };
    }
    if (!userValues.cantidadPasajeros) {
        respError.push({ type: 'error', text: 'Debe ingresar cantidad de pasajeros', key: '9' });
    };
    if (!userValues.acceso) {
        respError.push({ type: 'error', text: 'Debe ingresar un acceso', key: '10' });
    };
    if (!userValues.residencia) {
        respError.push({ type: 'error', text: 'Debe ingresar una residencia', key: '11' });
    };
    if (!userValues.registro) {
        respError.push({ type: 'error', text: 'Debe ingresar un registro', key: '12' });
    }
    if (!userValues.motivoViaje) {
        respError.push({ type: 'error', text: 'Debe ingresar un motivo de viaje', key: '13' });
    }
    if (!userValues.destinoViaje) {
        respError.push({ type: 'error', text: 'Debe ingresar el destino de viaje', key: '14' });
    }
    if (!userValues.tiempoDestino) {
        respError.push({ type: 'error', text: 'Debe ingresar un tiempo en destino', key: '15' });
    }
    if (!userValues.entraCuarentena) {
        respError.push({ type: 'error', text: 'Debe ingresar si entra en cuarentena', key: '16' });
    }
    return respError;
};