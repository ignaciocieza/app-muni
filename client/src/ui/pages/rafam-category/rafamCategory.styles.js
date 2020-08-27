import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../constants';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: colors.shadow
    },
    rootContent: {
        height: '80vh',
        width: '80vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title:{
        height: '30%',
        alignSelf: 'flex-start',
        fontSize: '1.4rem',
        color: colors.blueOne,
        fontWeight: 900,
    },
    container: {
        width: '80%',
        display: 'flex',
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: '3%',
        backgroundColor: colors.blueOne,
        //borderRadius: '70px',
        //display: 'flex',
        minWidth: '140px',
        maxWidth: '140px',
        minHeight: '140px',
        maxHeight: '140px',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        //cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: colors.shadow
    },
    icon: {
        width: '100%',
        height: ' 54px',
        //flexGrow: 2,
        //color: 'antiquewhite',
        //paddingTop: '7%',
    },
    text: {
        // flexGrow: 1,
        // color: 'antiquewhite',
        // fontSize: 'larger',
    }
}));

export default useStyles;