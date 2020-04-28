import { makeStyles } from '@material-ui/core/styles';
import {colors} from '../../../constants';
const innerHeight = window.innerHeight;

const useStyles = makeStyles(theme => ({
    root: {
        //height: '240vh',
        height: `calc(${innerHeight}px * 3.5)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: ' 9%',
        marginTop: '3%',
        fontFamily: 'Roboto, sans-serif',
        [theme.breakpoints.down('md')]: {
            //height: '200vh',
            height: `calc(${innerHeight}px * 2.8)`,
            width: '100vw',
            margin: '6% 0% 0% 0%',
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
            marginTop: '2%',
            alignSelf: 'center',
        }
    },
    subtitlePermitido: {
        color: 'green',
    },
    subtitleDenegado: {
        color: 'red',
    },
    qrCode: {
        flexGrow: 1,
    },
    subtitle:{
        margin: '1% 0 -1% 23%',
        fontSize: '0.9rem',
        fontWeight: 900,
        alignSelf: 'flex-start',
        opacity: 0.54,
        [theme.breakpoints.down('md')]: {
            margin: '3% 0% 1% 11%',
        }
    },
    textfield: {
        margin:'2%',
        width: '54%',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        [theme.breakpoints.down('md')]: {
            width: '80%',
        }
    },
    textArea: {
        margin: '2%',
        padding:' 1%',
        height: '14%',
        width: '52%',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        borderRadius: 4,
        [theme.breakpoints.down('md')]: {
            width: '78%',
            margin: ' 1%',
            padding:'2%',
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
        borderRadius: 4,
        [theme.breakpoints.down('md')]: {
            height: '15%',
            width: '80%',
            margin: '3% 3% 9% 3%',
        }
    },
    imagen: {
        width: '100%',
        height: '100%',
        //height:'auto,'
    }
}));

export default useStyles;