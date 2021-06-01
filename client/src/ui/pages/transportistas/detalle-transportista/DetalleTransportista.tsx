import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageLogoBromatologia from "../../../../assets/bromatologia-logo.jpeg";
import { Button } from "@material-ui/core";
import QRCode from "qrcode";
//@ts-ignore
import ReactToPrint from "react-to-print";
import useStyle from "./detalleTransportista.styles";
import { setCurrentPermiso } from "../../../../api/actions/bromatologia/bromatologiaActions";
import { parseDate, sortByDate } from "../utils";
import { colors } from "../../../../constants";
import Chofer from "./Chofer";
import Vehiculo from "./Vehiculo";

const borderStyle = "1px solid #A48C85";

const { innerWidth } = window;
const eqToStyleValue = { one: "98vw", two: "198vw" };
const width = innerWidth < 600 ? eqToStyleValue.two : eqToStyleValue.one;

export default function DetalleTransportista({ match }: { match: any }) {
  const [qrCode, setQrCode] = useState("");
  const [styleValue, setStyleValue] = useState(width);
  const { currentRegistro } = useSelector((state: any) => state.transportistas);
  const classes = useStyle();
  const dispatch = useDispatch();
  const ref = React.useRef(null!);

  useEffect(() => {
    dispatch(setCurrentPermiso(match.params.id));
    (async function () {
      if (currentRegistro) {
        let aux = await QRCode.toDataURL(
          `https://app-muni.herokuapp.com/transportistas/detail//${currentRegistro.valuesForm.empresa}`
        );
        setQrCode(aux);
      }
    })();
  }, [dispatch, currentRegistro]);

  if (!currentRegistro) return null;

  return (
    <>
      <div className={classes.root}>
        <div ref={ref} style={{ display: "flex", flexDirection: "column" }}>
          <div className={classes.contentGrid} style={{ width: styleValue }}>
            <div
              style={{
                gridColumn: "1/3",
                gridRow: "1/5",
                borderRight: borderStyle,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                }}
                src={imageLogoBromatologia}
                alt="no imagen"
              />
            </div>
            <span
              style={{
                gridColumn: "5/10",
                gridRow: 3,
                fontSize: "2em",
              }}
            >
              EMPRESA:
            </span>
            <span
              style={{
                gridColumn: "6/13",
                gridRow: 3,
                fontSize: "2em",
                marginLeft: "10%",
              }}
            >
              {currentRegistro.valuesForm.empresa.toUpperCase()}
            </span>
            {qrCode && (
              <div
                style={{
                  gridColumn: "11/13",
                  gridRow: "1/5",
                  borderLeft: borderStyle,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{
                    objectFit: "contain",
                    maxWidth: "100%",
                  }}
                  src={qrCode}
                  alt="no imagen"
                />
              </div>
            )}
          </div>
          <Vehiculo
            currentRegistro={currentRegistro}
            styleValue={styleValue}
            borderStyle={borderStyle}
          />

          {currentRegistro?.choferes?.length ? (
            <Chofer
              currentRegistro={currentRegistro}
              styleValue={styleValue}
              borderStyle={borderStyle}
            />
          ) : null}
        </div>
        {styleValue === eqToStyleValue.one && (
          <ReactToPrint
            trigger={() => {
              //setStyleValue('100vw')
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              return (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  //onClick={()=>setStyleValue('100vw')}
                >
                  Imprimir
                </Button>
              );
            }}
            content={() => ref.current}
          />
        )}
        {styleValue === eqToStyleValue.two && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setStyleValue(eqToStyleValue.one)}
          >
            Ir a imprimir
          </Button>
        )}
        {styleValue !== eqToStyleValue.two && innerWidth < 600 && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setStyleValue(eqToStyleValue.two)}
          >
            Ver Tabla Correctamente
          </Button>
        )}
      </div>
    </>
  );
}