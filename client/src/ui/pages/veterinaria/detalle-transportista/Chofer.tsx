import React from "react";
import { colors } from "../../../../constants";
import { parseDate } from "../../../../api/utils";
import useStyle from "./detalleTransportista.styles";

export default function Chofer({
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
        CHOFERES
      </span>
      {/* {[
        "ID VEHÍCULO",
        "NOMBRE Y APELLIDO",
        "PERMISO",
        "OTORGADO POR",
        "VENCIMIENTO",
      ].map((item, index) => (
        <div
          key={item}
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
      ))} */}
      <div
        style={{
          gridColumn: "1/3",
        }}
        className={classes.choferHeaderContainer}
      >
        <span className={classes.choferHeaderContent}>ID VEHÍCULO</span>
      </div>
      <div
        style={{
          gridColumn: "3/6",
        }}
        className={classes.choferHeaderContainer}
      >
        <span className={classes.choferHeaderContent}>NOMBRE Y APELLIDO</span>
      </div>
      <div
        style={{
          gridColumn: "6/9",
        }}
        className={classes.choferHeaderContainer}
      >
        <span className={classes.choferHeaderContent}>PERMISO</span>
      </div>
      <div
        style={{
          gridColumn: "9/11",
        }}
        className={classes.choferHeaderContainer}
      >
        <span className={classes.choferHeaderContent}>OTORGADO POR</span>
      </div>
      <div
        style={{
          gridColumn: "11/13",
        }}
        className={classes.choferHeaderContainer}
      >
        <span className={classes.choferHeaderContent}>VENCIMIENTO</span>
      </div>

      {currentRegistro.choferes?.map?.((item: any, index: number) => {
        // const marginTop = 10;
        // const marginBottom = 10;

        return (
          <React.Fragment key={index}>
            <span
              style={{
                gridColumn: "1/3",
                gridRow: 3 + index,
              }}
              className={classes.choferCell}
            >
              {item.idVehiculo}
            </span>
            <span
              style={{
                gridColumn: "3/6",
                gridRow: 3 + index,
              }}
              className={classes.choferCell}
            >
              {item.nombreYapellido.toUpperCase()}
            </span>
            <span
              style={{
                gridColumn: "6/9",
                gridRow: 3 + index,
              }}
              className={classes.choferCell}
            >
              {item.permiso.toUpperCase()}
            </span>
            <span
              style={{
                gridColumn: "9/11",
                gridRow: 3 + index,
              }}
              className={classes.choferCell}
            >
              {item.otorgadoPor.toUpperCase()}
            </span>
            <span
              className={classes.choferCell}
              style={{
                gridColumn: "11/13",
                gridRow: 3 + index,
              }}
            >
              {parseDate(item.vencimientoChofer)}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
