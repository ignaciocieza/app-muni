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
  setLocalidades,
  setTipoAlimentosTransportar,
  setEmpresas,
} from "../../../../api/actions/transporte/transportistaActions";
import SnackBar from "../../../widgets/snack-bar/SnackBar";

export default function AdministrarClaves() {
  const classes = useStyles();
  //@ts-ignore
  const { localidades } = useSelector((state) => state.transportistas);
  const { tipoAlimentosTransportar } = useSelector(
    //@ts-ignore
    (state) => state.transportistas
  );
  //@ts-ignore
  const { empresas } = useSelector((state) => state.transportistas);
  //@ts-ignore
  const { errorDBtransporte } = useSelector((state) => state.transportistas);

  return (
    <div className={classes.root}>
      {errorDBtransporte && (
        <SnackBar
          message={errorDBtransporte}
          variant="error"
          hPosition="right"
          isResetErrors={true}
        />
      )}
      <span className={classes.title}>TRANSPORTISTAS</span>
      <span className={classes.subtitle}>VALOR ÚNICO</span>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>LOCALIDADES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaClaves
            categoriaItem={localidades}
            categoriaToDispatch={setLocalidades}
            placeHolder="Ingrese una localidad"
            titleButton="Agregar una localidad"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>ALIMENTOS A TRANSPORTAR</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaClaves
            categoriaItem={tipoAlimentosTransportar}
            categoriaToDispatch={setTipoAlimentosTransportar}
            placeHolder="Ingrese los Alimentos"
            titleButton="Agregar Alimento a Transportar"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>EMPRESAS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaClaves
            categoriaItem={empresas}
            categoriaToDispatch={setEmpresas}
            placeHolder="Ingrese Empresa"
            titleButton="Agregar Empresa"
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
