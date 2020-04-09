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
    },
    imagenContent: {
        width: '22%',
        height: '64%',
        border: '1px solid rgba(181, 170, 170, .5)',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
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
            width: '100%',
        }
    },
    button: {
        margin: '2% 0% 2% 0%',
        width: '14%',
        backgroundColor: colors.blueOne,
        position:'relative',
        [theme.breakpoints.down('md')]: {
            top: '83%',
            right: '8%',
            fontSize: '0.6rem',
        }
    },
    downloadTag: {
        fontSize: '1.2rem',
        color: 'transparent',
        position: 'absolute',
        top: '72%',
        right: '40%',
        [theme.breakpoints.down('md')]: {
            top: '85%',
            right: '8%',
        }
    }
}));

export default useStyles;