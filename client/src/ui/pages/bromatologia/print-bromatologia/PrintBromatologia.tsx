import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageLogoBromatologia from "../../../../assets/bromatologia-logo.jpeg";
import { Button } from "@material-ui/core";
import QRCode from "qrcode";
//@ts-ignore
import ReactToPrint from "react-to-print";
import useStyle from "./printBromatologia.styles";
import { setCurrentPermiso } from "../../../../api/actions/bromatologia/bromatologiaActions";
import { parseDate, sortByDate } from "../utils";

const borderStyle = "1px solid #A48C85";

const { innerWidth } = window;
const eqToStyleValue= {one:"98vw", two:"198vw"};
const width = innerWidth < 600 ?  eqToStyleValue.two: eqToStyleValue.one;

export default function PrintBromatologia({ match }: { match: any }) {
  const [qrCode, setQrCode] = useState("");
  const [styleValue, setStyleValue] = useState(width);
  const { currentPermiso } = useSelector((state: any) => state.bromatologia);
  const classes = useStyle();
  const dispatch = useDispatch();
  const ref = React.useRef(null!);
  

  useEffect(() => {
    dispatch(setCurrentPermiso(match.params.id));
    (async function () {
      if (currentPermiso) {
        let aux = await QRCode.toDataURL(
          `https://app-muni.herokuapp.com/bromatologia/detail/${currentPermiso.valuesForm.expediente}`
        );
        setQrCode(aux);
      }
    })();
  }, [dispatch, currentPermiso]);

  if (!currentPermiso) return null;

  const auxRubro = currentPermiso.valuesForm.rubro;

  return (
    <>
      <div className={classes.root}>
        <div
          className={classes.contentGrid}
          style={{ width: styleValue }}
          ref={ref}
        >
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
              gridColumn: "3/5",
              gridRow: 1,
            }}
          >
            RAZON SOCIAL:
          </span>
          <span
            style={{
              gridColumn: "5/8",
              gridRow: 1,
            }}
          >
            {currentPermiso.valuesForm.razonSocial.toUpperCase() || "--"}
          </span>
          <span
            style={{
              gridColumn: "3/5",
              gridRow: 2,
            }}
          >
            RUBRO:
          </span>
          <span
            style={{
              gridColumn: "5/8",
              gridRow: 2,
            }}
          >
            {(auxRubro?.join?.(", ").toUpperCase() ?? auxRubro?.toUpperCase()) ||
              "--"}
          </span>
          <span
            style={{
              gridColumn: "3/5",
              gridRow: 3,
            }}
          >
            DOMICILIO:
          </span>
          <span
            style={{
              gridColumn: "5/8",
              gridRow: 3,
            }}
          >
            {currentPermiso.valuesForm.domicilio.toUpperCase() || "--"}
          </span>
          <span
            style={{
              gridColumn: "3/5",
              gridRow: 4,
            }}
          >
            NOMBRE COMERCIAL:
          </span>
          <span
            style={{
              gridColumn: "5/8",
              gridRow: 4,
            }}
          >
            {currentPermiso.valuesForm.nombreComercial.toUpperCase() || "--"}
          </span>
          <span
            style={{
              gridColumn: "8/10",
              gridRow: 1,
            }}
          >
            CLAVE:
          </span>
          <span
            style={{
              gridColumn: "10/11",
              gridRow: 1,
            }}
          >
            {currentPermiso.valuesForm.clave
              ? currentPermiso.valuesForm.clave
              : "--"}
          </span>
          <span
            style={{
              gridColumn: "8/10",
              gridRow: 2,
            }}
          >
            EXPEDIENTE:
          </span>
          <span
            style={{
              gridColumn: "10/11",
              gridRow: 2,
            }}
          >
            {currentPermiso.valuesForm.expediente || "--"}
          </span>
          <span
            style={{
              gridColumn: "8/10",
              gridRow: 3,
            }}
          >
            INICIO:
          </span>
          <span
            style={{
              gridColumn: "10/11",
              gridRow: 3,
            }}
          >
            {parseDate(currentPermiso.valuesForm.inicio)}
          </span>
          <span
            style={{
              gridColumn: "8/10",
              gridRow: 4,
            }}
          >
            CESE:
          </span>
          <span
            style={{
              gridColumn: "10/11",
              gridRow: 4,
            }}
          >
            {parseDate(currentPermiso.valuesForm.cese)}
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
          <div
            style={{
              gridColumn: 1,
              gridRow: 5,
              borderTop: borderStyle,
              borderBottom: borderStyle,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                marginTop: "10%",
                marginBottom: "10%",
              }}
            >
              ACTA Nª
            </span>
          </div>
          <div
            style={{
              gridColumn: 2,
              gridRow: 5,
              borderTop: borderStyle,
              borderBottom: borderStyle,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span>FECHA</span>
          </div>
          <div
            style={{
              gridColumn: "3/13",
              gridRow: 5,
              //placeSelf: "center",
              //textAlign: "center",
              borderTop: borderStyle,
              borderBottom: borderStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>INSPECCIONES REALIZADAS</span>
          </div>
          {currentPermiso.data
            ?.sort(sortByDate)
            .map((item: any, index: number) => {
              const marginTop = 10;
              const marginBottom = 10;

              return (
                <React.Fragment key={index}>
                  <span
                    style={{
                      gridColumn: 1,
                      gridRow: 6 + index,
                      alignSelf: "center",
                      marginBottom,
                      marginTop,
                      //marginLeft: "15%",
                    }}
                  >
                    {item.acta}
                  </span>
                  <span
                    style={{
                      gridColumn: 2,
                      gridRow: 6 + index,
                      alignSelf: "center",
                      marginBottom,
                      marginTop,
                    }}
                  >
                    {parseDate(item.fecha)}
                  </span>
                  <span
                    style={{
                      gridColumn: "3/13",
                      gridRow: 6 + index,
                      placeSelf: "center",
                      textAlign: "center",
                      marginBottom,
                      marginTop,
                    }}
                  >
                    {item.inspeccionRealizada}
                  </span>
                </React.Fragment>
              );
            })}
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
