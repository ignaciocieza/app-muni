import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../constants';

const innerHeight = window.innerHeight;

const useStyles = makeStyles(theme => ({
    imagenContent: {
        width: '54%',
        height: '22%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
        [theme.breakpoints.down('md')]: {
            width: '80%',
            height: `calc(${innerHeight}px * 0.4)`,
            top: `calc(${innerHeight}px * 0.8)`,
            marginBottom: '15%',
        }
    },
    title: {
        margin: '2% 0% 2% 0%',
        fontSize: '0.9rem',
        fontWeight: 900,
        alignSelf: 'flex-start',
        opacity: 0.54,
    },
    subtitle: {
        margin: '0% 0% 2% 3%',
        fontSize: '0.9rem',
        fontWeight: 400,
        alignSelf: 'flex-start',
        opacity: 0.7,
    },
    uploadContent: {
        width: '100%',
        height: '70%',
        border: '1px solid rgba(181, 170, 170, .5)',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        borderRadius: 4,
        [theme.breakpoints.down('md')]: {
            height: '72%',
        }        
    },
    imagen: {
        width: '100%',
        height: `calc(${innerHeight}px * 0.5)`,
        [theme.breakpoints.down('md')]: {
            height: `calc(${innerHeight}px * 0.3)`,
        }
    },   
    input: {
        display: 'none',
    },  
    buttonContent: {
        marginTop: '5%',
        marginBottom: '2%',
        backgroundColor: colors.blueOne,
    },
}));

export default useStyles;