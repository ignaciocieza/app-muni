import { makeStyles } from '@material-ui/core/styles';
import imageIglesia from '../../../assets/muni-iglesia.png';
import { colors } from '../../../constants';

const innerHeight = window.innerHeight;

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        fontFamily: 'Noto Sans, sans-serif',
    },
    form: {
        marginTop: '4%',
        [theme.breakpoints.down('md')]: {
            position: 'relative',
        }
    },
    contentField: {
        width: '100%',
        height: '78%',
        marginLeft: '2%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            height: `calc(${innerHeight}px * 0.8)`,
            width: '100%',
            position: 'absolute',
            top: `calc(${innerHeight}px * 0.2)`,
        }
    },
    textField: {
        flexGrow: 1,
        width: '47%',
        margin: '2%',
        [theme.breakpoints.down('md')]: {
            width: '65%',
        }
    },
    imageContent: {
        flexGrow: 1,
        //marginTop: '15%',
        width: '27%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        width: '47%',
        margin: '2% 9%',
        backgroundColor: colors.blueOne,
        [theme.breakpoints.down('md')]: {
            width: '35%',
            marginBottom: '43%',
        }
    },
    rightSideContent: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${imageIglesia})`,
        backgroundColor: colors.grayTwo,
        //height: '100%',
        //backgroundPosition: 'center', 
        //backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover'
    },
    square: {
        border: `1px solid ${colors.white}`,
        width: '69%',
        height: '11%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    squareTitle: {
        fontWeight: 400,
        fontSize: 21,
        padding: '1%',
        color: colors.white
    }
}));

export default useStyles;