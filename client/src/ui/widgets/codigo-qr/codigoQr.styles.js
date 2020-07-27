import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../constants';

const useStyles = makeStyles(theme => ({
    content: {
        width: '100%',
        height: '100%',
        //margin:'2%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        [theme.breakpoints.down('md')]: {
            maxHeight: '100%',
            maxWidth: '100%',
        }
    },
    imagenText: {
        textAlign: 'center',
        padding: '2%',
        opacity: '0.7',
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