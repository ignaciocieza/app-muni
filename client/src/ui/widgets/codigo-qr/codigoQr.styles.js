import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../constants';

const useStyles = makeStyles(theme => ({
    content: {
        width: '100%',
        height: '26%',
        //margin:'2%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            height: '18%',
        }
    },
    imagenContent: {
        width: '22%',
        height: '64%',
        border: '1px solid rgba(181, 170, 170, .5)',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: '60%',
        }
    },
    imagen: {
        width: '78%',
        height: '80%',
        [theme.breakpoints.down('md')]: {
            height: 'auto',
        }
    },
    downloadTag: {
        width: '15%',
        margin: '2% 0% 2% 0%',
        fontSize: '1.2rem',
        color: 'transparent',    
        [theme.breakpoints.down('md')]: {
            width: '44%',
        }
    },
    button: {
        width: '100%',
        backgroundColor: colors.blueOne,
        [theme.breakpoints.down('md')]: {
            fontSize: '0.6rem',
            marginTop: '6%',
        }
    }    
}));

export default useStyles;