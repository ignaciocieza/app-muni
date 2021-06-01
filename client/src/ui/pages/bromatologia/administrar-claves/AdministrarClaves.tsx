import React from "react";
import useStyles from "./administrarCalves.styles";
import ListaClaves from "../../../widgets/bromatologia/lista-claves/ListaClaves";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector } from "react-redux";
import {
  setRubro,
  setNombreComercial,
  setRazonSocial,
} from "../../../../api/actions/bromatologia/bromatologiaActions";
import SnackBar from "../../../widgets/snack-bar/SnackBar";

export default function AdministrarClaves() {
  const classes = useStyles();
  //@ts-ignore
  const { rubro } = useSelector((state) => state.bromatologia);
  //@ts-ignore
  const { nombreComercial } = useSelector((state) => state.bromatologia);
  //@ts-ignore
  const { razonSocial } = useSelector((state) => state.bromatologia);
  //@ts-ignore
  const { errorDB } = useSelector((state) => state.bromatologia);

  return (
    <div className={classes.root}>
      {errorDB && (
        <SnackBar
          message={errorDB}
          variant="error"
          hPosition="right"
          isResetErrors={true}
        />
      )}
      <span className={classes.title}>BROMATOLOGÍA</span>
      <span className={classes.subtitle}>VALOR ÚNICO</span>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>RAZÓN SOCIAL</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaClaves
            categoriaItem={razonSocial}
            categoriaToDispatch={setRazonSocial}
            placeHolder="Ingrese Razón Social"
            titleButton="Agregar Razón Social"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>RUBRO</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaClaves
            categoriaItem={rubro}
            categoriaToDispatch={setRubro}
            placeHolder="Ingrese Rubro"
            titleButton="Agregar Rubro"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>NOMBRE COMERCIAL</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaClaves
            categoriaItem={nombreComercial}
            categoriaToDispatch={setNombreComercial}
            placeHolder="Ingrese Nomnbre Comercial"
            titleButton="Agregar Nomnbre Comercial"
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
