const dataColumns = {
    comercios: [
        {
            title: "Numero de Comercio",
            field: "nro_comercio"
        },
        {
            title: "Nombre",
            field: "nombre"
        },
        {
            title: "Nombre Fantasia",
            field: "nom_fantasia"
        },
        {
            title: "Calle",
            field: "calle"
        },
        {
            title: "Numero",
            field: "nro"
        },
        {
            title: "Rubro",
            field: "rubro"
        },
    ],
    inmuebles: [
        {
            title: "Numero de Inmueble",
            field: "nro_inmueble"
        },
        {
            title: "Partida Catastral",
            field: "par_catastral"
        },
        {
            title: "Calle",
            field: "calle"
        },
        {
            title: "Numero",
            field: "nro"
        },
    ],
    rodados: [
        {
            title: "Numero de Rodado",
            field: "nro_rodado"
        },
        {
            title: "Año",
            field: "anio"
        },
        {
            title: "Dominio",
            field: "dominio"
        },
        {
            title: "Cilindrada",
            field: "cilindrada"
        },
        {
            title: "Carroceria",
            field: "carroceria"
        },
        {
            title: "Res Pago",
            field: "res_pago"
        },
        {
            title: "Dp Calle",
            field: "dp_calle"
        },
        {
            title: "Dp Numero",
            field: "dp_nro"
        },
        {
            title: "Dominio Actual",
            field: "dominio_actual"
        },
        {
            title: "Marca Motor",
            field: "motor_marca"
        },
        {
            title: "Chasis",
            field: "chasis"
        },
        {
            title: "Valuacion",
            field: "valuacion"
        },
    ],
    contribuyentes: [
        {
            title: "Numero de Contribuyente",
            field: "nro_contrib"
        },
        {
            title: "Cuim",
            field: "cuim"
        },
        {
            title: "Apellido Nombre",
            field: "apynom"
        },
        {
            title: "Cod Calle",
            field: "cod_calle"
        },
        {
            title: "Calle",
            field: "calle"
        },
        {
            title: "Numero",
            field: "nro"
        },
        {
            title: "Cod Postal",
            field: "cod_postal"
        },
        {
            title: "Cod Loc",
            field: "cod_loc"
        },
        {
            title: "Cod Prov",
            field: "cod_prov"
        },
        {
            title: "Telefonos",
            field: "telefonos"
        },
        {
            title: "Email",
            field: "email"
        },
        {
            title: "Fecha Alta",
            field: "fecha_alta",
            render: rowData => { return (new Date(rowData.fecha_alta).toLocaleString("en", 'dd/MM/yyyy').split(',')[0]) }
        },
        {
            title: "Fecha Baja",
            field: "fecha_baja",
            render: rowData => { return (new Date(rowData.fecha_baja).toLocaleString("en", 'dd/MM/yyyy').split(',')[0]) }
        },
        {
            title: "Detalle",
            field: "detalle"
        },
        {
            title: "Tipo Doc",
            field: "tipo_doc"
        },
        {
            title: "Nro Doc",
            field: "nro_doc"
        },
        {
            title: "Dp Cod Calle",
            field: "dp_cod_calle"
        },
        {
            title: "Dp Calle",
            field: "dp_calle"
        },
        {
            title: "Dp Numero",
            field: "dp_nro"
        },
        {
            title: "Dp Cod Postal",
            field: "dp_cod_postal"
        },
        {
            title: "Dp Cod Loc",
            field: "dp_cod_loc"
        },
        {
            title: "Dp Cod Pro",
            field: "dp_cod_pro"
        },
        {
            title: "Resp Pago",
            field: "resp_pago"
        },
    ]
}

export default dataColumns;