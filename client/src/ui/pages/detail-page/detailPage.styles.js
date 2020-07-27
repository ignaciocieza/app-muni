import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../constants';
const innerHeight = window.innerHeight;

const useStyles = makeStyles(theme => ({
    root: {
        //height: '240vh',
        //height: `calc(${innerHeight}px * 6.5)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: ' 9%',
        marginTop: '3%',
        fontFamily: 'Roboto, sans-serif',
        [theme.breakpoints.down('md')]: {
            //height: '200vh',
            //height: `calc(${innerHeight}px * 7)`,
            width: '100vw',
            margin: '6% 0% 0% 0%',
        }
    },
    title: {
        fontWeight: 700,
        color: colors.blueOne,
        alignSelf: ' flex-start',
        fontSize: '1.2rem',
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            // fontSize: '1.2em',
            // marginTop: '2%',
            // marginBottom: '4%',
            margin: '0% 0% 9% 4%',
            //alignSelf: 'center',
        }
    },
    subtitlePermitido: {
        color: 'green',
    },
    subtitleDenegado: {
        color: 'red',
    },
    qrCode: {
        width: '100%',
        height: `calc(${innerHeight}px * 0.5)`,
    },
    subtitle: {
        margin: '1% 0 -1% 23%',
        fontSize: '0.9rem',
        fontWeight: 900,
        alignSelf: 'flex-start',
        opacity: 0.54,
        [theme.breakpoints.down('md')]: {
            // fontSize: '1em',
            // margin: '3% 0% 1% 11%',
            margin: '1% 0 0% 8%',
        }
    },
    textfield: {
        margin: '2%',
        width: '54%',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        [theme.breakpoints.down('md')]: {
            width: '80%',
            margin: '4% 0% 4% 0%',
        }
    },
    textArea: {
        margin: '2%',
        padding: ' 1%',
        height: '14%',
        width: '52%',
        opacity: 0.5,
        borderRadius: 4,
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        textAlign: 'justify',
        fontSize: '1.5em',
        [theme.breakpoints.down('md')]: {
            width: '78%',
            margin: '4% 0% 4% 0%',
        }
    },
    imagenContein: {
        //height: '18%',
        height: `calc(${innerHeight}px * 0.7)`,
        width: '54%',
        margin: '1%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        border: '1px solid rgba(181, 170, 170, .5)',
        borderRadius: 4,
        [theme.breakpoints.down('md')]: {
            height: `calc(${innerHeight}px * 0.4)`,
            width: '80%',
            margin: '3% 3% 9% 3%',
        }
    },
    imagen: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    fecha: {
        width: '53%',
        [theme.breakpoints.down('md')]: {
            width: '78%',
        }
    },
}));

export default useStyles;