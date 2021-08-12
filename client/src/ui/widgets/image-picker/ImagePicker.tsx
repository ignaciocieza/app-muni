import React, { useState } from "react";
import noImage from "../../../assets/no-imagen.png";
import Button from "@material-ui/core/Button";
import { sinEspecificar } from "../../../constants";
import useStyles from "./imagePicker.styles";

export default function ImagePicker({
  title,
  subtitle,
  dispatch,
  currentImg=""
}: {
  title: string;
  subtitle?: string;
  dispatch: any;
  currentImg:any
}) {
  //const { currentImage } = useSelector((state: any) => state.user);
  const [currentImage, setCurrentImage] = useState<any>(currentImg);
  const classes = useStyles();

  function handleImage(e: any) {
    let reader;
    //let formData;
    const file = e.target.files[0];
    // formData = new FormData();
    // formData.append('file', file);
    // console.dir(formData)
    //axios.post('/fileupload', formData)

    if (file) {
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        dispatch(e?.target?.result!);
        setCurrentImage(e?.target?.result!);
      };
    }
  }

  return (
    <div className={classes.imagenContent}>
      <span className={classes.title}>{title}</span>
      {subtitle && <span className={classes.subtitle}>{subtitle}</span>}
      <div className={classes.uploadContent}>
        {currentImage && currentImage !== sinEspecificar ? (
          <img src={currentImage} alt="No imagen" className={classes.imagen} />
        ) : (
          <img src={noImage} alt="No imagen" className={classes.imagen} />
        )}
        <input
          accept="image/*"
          className={classes.input}
          //name="image"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => {
            handleImage(e);
          }}
        />
      </div>
      <label htmlFor="contained-button-file" className={classes.buttonContent}>
        <Button variant="contained" color="primary" component="span">
          Subir Imagen
        </Button>
      </label>
    </div>
  );
}
