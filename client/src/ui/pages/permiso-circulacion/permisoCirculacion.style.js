import { makeStyles } from '@material-ui/core/styles';
import { colors} from '../../../constants';
const innerHeight = window.innerHeight;

const useStyles = makeStyles(theme => ({
    form: {
        marginLeft: '10%',
        height: '250vh',
        paddingTop: '2%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
        [theme.breakpoints.down('md')]: {
            height:'unset',
            position: 'relative'
        }
    },
    title: {
        paddingTop:'1%',
        marginBottom: '4%',
        fontSize: '1.2rem',
        alignSelf: 'flex-start',
        fontWeight:700,
        color: colors.blueOne
    },
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
        [theme.breakpoints.down('md')]: {
            margin: '5%',
        }
    },
    formControl: {
        margin: '2%',
        width: '54%',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        [theme.breakpoints.down('md')]: {
            marginBottom:'unset',
            width: '84%',
            marginLeft: '4%',
        }
    },
    textArea: { 
        margin: '2%',   
        width: '54%',
        height: '14%',
        opacity: 0.5,
        fontSize: '1.2rem',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        [theme.breakpoints.down('md')]: {
            width: '80%',
            height: `calc(${innerHeight}px * 0.4)`,
            position: 'absolute',
            top: `calc(${innerHeight}px * 1.4)`,
            margin: '1%',
        }
    },
    button: {
        margin: '1%',
        width: '14%',
        backgroundColor: colors.blueOne,
        [theme.breakpoints.down('md')]: {
            width: '53%',
            position: 'absolute',
            top: `calc(${innerHeight}px * 1.85)`,
            margin: '5%',
        }
    },
}));

export default useStyles;