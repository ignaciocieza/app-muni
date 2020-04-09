import { makeStyles } from '@material-ui/core/styles';
import {colors} from '../../../constants';

const useStyles = makeStyles(theme => ({
    root: {
        height: '240vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: ' 9%',
        marginTop: '3%',
        fontFamily: 'Roboto, sans-serif',
        [theme.breakpoints.down('md')]: {
            height: '200vh',
        }
    },
    title: {
        fontWeight:700,
        color: colors.blueOne,
        alignSelf: ' flex-start',
        fontSize: '1.2rem',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
        }
    },
    subtitlePermitido: {
        //fontSize: '2rem',
        color: 'green',
    },
    subtitleDenegado: {
        //fontSize: '2rem',
        color: 'red',
    },
    qrCode: {
        flexGrow: 1,
    },
    // textFieldContent: {
    //     width: '74%',
    //     flexGrow: 1,
    //     flexWrap: 'wrap',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     [theme.breakpoints.down('md')]: {
    //         width: '68%',
    //         flexGrow: '8',
    //         margin: '1%',
    //     }
    // },
    subtitle:{
        margin: '1% 0 -1% 23%',
        fontSize: '0.9rem',
        fontWeight: 900,
        alignSelf: 'flex-start',
        opacity: 0.54,
    },
    textfield: {
        margin:'2%',
        width: '54%',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
    },
    textArea: {
        margin: '2%',
        height: '14%',
        width: '54%',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        [theme.breakpoints.down('md')]: {
            width: '66%',
            margin: ' 1%',
            flexGrow: 9,
        }
    },
    imagenContein: {
        height: '18%',
        width: '54%',
        margin: '1%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        border: '1px solid rgba(181, 170, 170, .5)',
        [theme.breakpoints.down('md')]: {
            height: '15%',
            width: '80%',
            margin: '2%',
        }
    },
    imagen: {
        width: '100%',
        height: '100%',
        //height:'auto,'
    }
}));

export default useStyles;