import React from "react";
import { colors } from "../../../../constants";
import { parseDate } from "../utils";
import useStyle from "./detalleTransportista.styles";

export default function Vehiculo({
  currentRegistro,
  styleValue,
  borderStyle,
}: {
  currentRegistro: any;
  styleValue: any;
  borderStyle: string;
}) {
  const classes = useStyle();
  return (
    <div className={classes.contentGrid} style={{ width: styleValue }}>
      <span
        style={{
          gridColumn: "1/10",
          gridRow: 1,
          color: colors.blueOne,
          fontWeight: 600,
          letterSpacing: 3,
          fontSize: "1.3em",
          marginBottom: "1%",
          marginTop: "1%",
          marginLeft: "1%",
        }}
      >
        VEHÍCULOS
      </span>
      {[
        "CUIL-CUIT",
        "ID VEHÍCULO",
        "APELLIDO Y NOMBRE",
        "DOMICILIO",
        "TELÉFONO",
        "LOCALIDAD",
        "ALIMENTO A TRANSPORTAR",
        "DOMINIO",
        "MARCA",
        "MODELO AÑO",
        "EQUIPO FRÍO",
        "NRO SENANSA",
        "HABILITACIÓN MUNICIPAL",
        "VENCIMIENTO",
      ].map((item, index) => (
        <div
          style={{
            gridColumn: index + 1,
            gridRow: 2,
            borderTop: borderStyle,
            borderBottom: borderStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8em",
            textAlign: "center",
          }}
        >
          <span
            style={{
              marginTop: "10%",
              marginBottom: "10%",
            }}
          >
            {item}
          </span>
        </div>
      ))}
      {currentRegistro.vehiculos?.map?.((item: any, index: number) => {
        const marginTop = 10;
        const marginBottom = 10;

        return (
          <React.Fragment key={index}>
            <span
              style={{
                gridColumn: 1,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.cuilCuit}
            </span>
            <span
              style={{
                gridColumn: 2,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.idVehiculo}
            </span>
            <span
              style={{
                gridColumn: 3,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {
                item.apellidoYNombre
                //parseDate(element)
              }
            </span>
            <span
              style={{
                gridColumn: 4,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.domicilio}
            </span>
            <span
              style={{
                gridColumn: 5,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.telefono}
            </span>
            <span
              style={{
                gridColumn: 6,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.localidad}
            </span>
            <span
              style={{
                gridColumn: 7,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.tipoAlimentoTransportar}
            </span>
            <span
              style={{
                gridColumn: 8,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.dominio}
            </span>
            <span
              style={{
                gridColumn: 9,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.marca}
            </span>
            <span
              style={{
                gridColumn: 10,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.modeloAnio}
            </span>
            <span
              style={{
                gridColumn: 11,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.equipoFrio}
            </span>
            <span
              style={{
                gridColumn: 12,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.nroSenasa ? item.nroSenasa : "--"}
            </span>
            <span
              style={{
                gridColumn: 13,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {item.nroMunicipal ? item.nroMunicipal : "--"}
            </span>
            <span
              style={{
                gridColumn: 14,
                gridRow: 3 + index,
                alignSelf: "center",
                marginBottom,
                marginTop,
                //marginLeft: "15%",
                fontSize: "0.8em",
                justifySelf: "center",
              }}
            >
              {parseDate(item.vencimiento)}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
