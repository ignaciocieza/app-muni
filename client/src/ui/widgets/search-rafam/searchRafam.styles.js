import { makeStyles } from '@material-ui/core/styles';
import { colors} from '../../../constants';

const useStyles = makeStyles(theme => ({
    container: {
        width: '80vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title:{
        height: '25%',
        alignSelf:' flex-start',
        fontSize: '1.4rem',
        color: colors.blueOne,
        fontWeight: 900,
    },
    inputContainer: {
        width: '80%',
        height: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#e9ecef',
        backgroundColor: colors.gray,
        borderRadius: '7px',
        boxShadow: colors.shadow
    },
    text: {
        marginRight: '5%',
        fontSize: '1.4rem',
        fontWeight: 700,
        color: colors.blueOne,
        letterSpacing: '1px',
    },
    textField: {
        backgroundColor: 'white'
    },
    buttonContainer: {
        marginBottom: '2%',
        width: '80%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    button: {
        marginTop: '3%',
        marginRight: '3%'
    }
}));

export default useStyles;