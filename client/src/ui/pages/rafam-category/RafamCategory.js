import React, { useState } from 'react';
import SearchRafam from '../../widgets/search-rafam/SearchRafam';
import dataAux from './dataAux';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import Fab from '@material-ui/core/Fab';
import useStyles from './rafamCategory.styles';

export default function RafamCategory() {
    const [isSelectaCategory, setIsSelectaCategory] = useState(false);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {isSelectaCategory ? (
                <SearchRafam setIsSelectaCategory={setIsSelectaCategory} textFieldLabel={isSelectaCategory.label} type={isSelectaCategory.type} fieldName={isSelectaCategory.fieldName} />
            ) : (
                    <div className={classes.rootContent}>
                        <span className={classes.title}>RAFAM</span>
                        <div className={classes.container}>
                            {dataAux.map(({ type, label, fieldName }) => (
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    key={label}
                                    className={classes.iconContainer}
                                    onClick={() => {
                                        setIsSelectaCategory({ ...isSelectaCategory, type, label, fieldName })
                                    }}
                                >
                                    <div>
                                        {(type === 'comercios') && <StoreOutlinedIcon className={classes.icon} />}
                                        {(type === 'inmuebles') && <HomeWorkOutlinedIcon className={classes.icon} />}
                                        {(type === 'rodados') && <DriveEtaOutlinedIcon className={classes.icon} />}
                                        {(type === 'contribuyentes') && <ReceiptOutlinedIcon className={classes.icon} />}
                                        <span className={classes.text}> {type.charAt(0).toUpperCase() + type.slice(1)} </span>
                                    </div>
                                </Fab>
                            ))}
                        </div>
                    </div>
                )}
        </div>
    );
}