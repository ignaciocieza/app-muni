import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import imageLogoBromatologia from "../../../../assets/bromatologia-logo.png";
import QRCode from "qrcode";
const borderStyle = "1px solid #A48C85";

export default function PrintBromatologia({ref}:{ref:React.MutableRefObject<never>}) {
  const [qrCode, setQrCode] = useState("");
  const { currentPermiso } = useSelector((state: any) => state.bromatologia);

  useEffect(() => {
    (async function () {
      let aux = await QRCode.toDataURL(
        `https://permiso.lasflores.gob.ar/bromatologia/detail/${currentPermiso.valuesForm.expediente}`
      );
      setQrCode(aux);
    })();
  }, []);

  return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        //gridTemplateRows: "repeat(12, 1fr)",
        gridGap: 5,
        outline: " 1px solid #A48C85",
        outlineOffset: 4,
        padding: "1%",
        //@ts-ignore
        ref={ref}
      }}>
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
          NOMBRE COMERCIAL:
        </span>
        <span
          style={{
            gridColumn: "5/8",
            gridRow: 1,
          }}
        >
          {currentPermiso.valuesForm.nombreComercial}
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
          {currentPermiso.valuesForm.rubro}
        </span>
        <span
          style={{
            gridColumn: "3/5",
            gridRow: 3,
          }}
        >
          RAZON SOCIAL:
        </span>
        <span
          style={{
            gridColumn: "5/8",
            gridRow: 3,
          }}
        >
          {currentPermiso.valuesForm.razonSocial}
        </span>
        <span
          style={{
            gridColumn: "3/5",
            gridRow: 4,
          }}
        >
          DOMICILIO:
        </span>
        <span
          style={{
            gridColumn: "5/8",
            gridRow: 4,
          }}
        >
          {currentPermiso.valuesForm.domicilio}
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
          --
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
          {currentPermiso.valuesForm.expediente}
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
          {currentPermiso.valuesForm.inicio}
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
          {currentPermiso.valuesForm.cese}
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
        {currentPermiso.data?.map((item: any, index: number) => {
          let a = new Date(item.fecha);
          return (
            <React.Fragment key={index}>
              <span
                style={{
                  gridColumn: 1,
                  gridRow: 6 + index,
                  alignSelf: "center",
                }}
              >
                {item.acta}
              </span>
              <span
                style={{
                  gridColumn: 2,
                  gridRow: 6 + index,
                  alignSelf: "center",
                }}
              >
                {a.toLocaleDateString()}
              </span>
              <span
                style={{
                  gridColumn: "3/13",
                  gridRow: 6 + index,
                  placeSelf: "center",
                }}
              >
                {item.inspeccionRealizada}
              </span>
            </React.Fragment>
          );
        })}
      </div>
  );
}
