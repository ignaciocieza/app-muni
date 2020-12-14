import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDataQuery } from '../../../api/actions/rafam/rafamActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './searchRafam.styles';

export default function SearchRafam({ type, textFieldLabel, setIsSelectaCategory, fieldName }) {
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.title}>{type.toUpperCase()}</div>
            <div className={classes.buttonContainer}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsSelectaCategory(false)
                    }}
                >
                    Volver
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        //history.push('/rafam/admin', { value , type, subType:'get'}) 
                        dispatch(setDataQuery({ value, type, subType: 'get' }))
                        history.push('/rafam/admin')
                    }}
                >
                    Traer Todo
                </Button>
            </div>
            <div className={classes.inputContainer}>
                <span className={classes.text}>{fieldName}</span>
                <TextField
                    className={classes.textField}
                    id="outlined-basic"
                    label={textFieldLabel}
                    variant="outlined"
                    onChange={e => setValue(e.target.value)}
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                    history.push('/rafam/admin')
                    //history.push('/rafam/admin', { value, type , subType: 'findone'}) --> es inestable
                    dispatch(setDataQuery({ value, type, subType: 'findone' }))
                }}
            >
                Enviar
                </Button>
        </div>
    )
}