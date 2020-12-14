import React, { useState } from "react";
import { Chip, Paper, TextField, Button, Icon } from "@material-ui/core";
import useStyles from "./listaClaves.styles";
import { useDispatch } from "react-redux";

interface ListaClavesProps {
  categoriaItem: string[];
  categoriaToDispatch: (e: string[]) => {};
}

export default function ListaClaves({
  categoriaItem,
  categoriaToDispatch,
}: ListaClavesProps) {
  const [mainData, setMainData] = useState(categoriaItem);
  const [searchData, setSearchData] = useState<Array<string>>();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setValue(e.target.value);
    let aux = mainData.filter((item) => {
      return item.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
    });
    setSearchData(aux);
  }

  function onDelete(item: string) {
    setMainData(
      mainData?.filter(function (ele) {
        return ele !== item;
      })!
    );
    setSearchData(
      searchData?.filter(function (ele) {
        return ele !== item;
      })!
    );
  }

  return (
    <div className={classes.root}>
      <TextField
        variant="outlined"
        required
        name="value"
        className={classes.textfield}
        onChange={handleChange}
        value={value}
        placeholder="Ingrese Clave..."
        //error={!!errors.nombre}
        //helperText={errors.nombre}
      />
      <div className={classes.contentButton}>
        <Button
          variant="outlined"
          color="primary"
          //className={classes.button}
          endIcon={<Icon>send</Icon>}
          //type="submit"
          onClick={() => {
            const aux = value.toUpperCase();
            mainData.push(aux);
            setMainData(mainData);
            setSearchData([aux]);
          }}
        >
          Agregar Clave
        </Button>
      </div>
      <Paper elevation={3} className={classes.paper}>
        {(searchData || mainData).map((item) => (
          <Chip
            key={item}
            label={item}
            onDelete={() => onDelete(item)}
            color="primary"
            variant="outlined"
            style={{ marginBottom: "2%" }}
          />
        ))}
      </Paper>
      <Button
          variant="contained"
          color="primary"
          className={classes.button}
          //style={{ marginTop: "12%" }}
          //endIcon={<Icon>send</Icon>}
          //type="submit"
          onClick={() => {
            console.dir(mainData);
            dispatch(categoriaToDispatch(mainData));
            setSearchData(undefined);
            setValue("");
          }}
        >
          Guardar
        </Button>
    </div>
  );
}
