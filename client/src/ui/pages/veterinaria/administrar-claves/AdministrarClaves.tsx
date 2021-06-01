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
  setEspeciesAnimales,
  setColores,
} from "../../../../api/actions/veterinaria/veterinariaActions";
//import SnackBar from "../../../widgets/snack-bar/SnackBar";

export default function AdministrarClaves() {
  const { especiesAnimales } = useSelector((state: any) => state.veterinaria);
  const { colores } = useSelector((state: any) => state.veterinaria);
  //@ts-ignore
  //const { errorDBtransporte } = useSelector((state) => state.transportistas);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* {errorDBtransporte && (
        <SnackBar
          message={errorDBtransporte}
          variant="error"
          hPosition="right"
          isResetErrors={true}
        />
      )} */}
      <span className={classes.title}>TRANSPORTISTAS</span>
      <span className={classes.subtitle}>VALOR ÚNICO</span>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>RAZA</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaClaves
            categoriaItem={especiesAnimales}
            categoriaToDispatch={setEspeciesAnimales}
            placeHolder="Ingrese una especie"
            titleButton="Agregar una especie"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>COLORES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListaClaves
            categoriaItem={colores}
            categoriaToDispatch={setColores}
            placeHolder="Ingrese el color del animal"
            titleButton="Agregar color del animal"
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
