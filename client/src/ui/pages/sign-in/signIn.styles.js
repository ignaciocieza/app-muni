import { makeStyles } from '@material-ui/core/styles';
import imageIglesia from '../../../assets/muni-iglesia.png';
import { colors } from '../../../constants';

const innerHeight = window.innerHeight;

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        fontFamily: 'Noto Sans, sans-serif',
        //transition: 'box-shadow 2000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    form: {
        marginTop: '4%',
        width: '50%',
        [theme.breakpoints.down('md')]: {
            height: `calc(${innerHeight}px * 1)`,
            width: '100%',
            position: 'absolute',
            top: `calc(${innerHeight}px * 0.01)`,
            zIndex: 2,
        }
    },
    contentField: {
        width: '100%',
        height: '81%',
        marginLeft: '2%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            // height: `calc(${innerHeight}px * 0.8)`,
            // width: '100%',
            // position: 'absolute',
            // top: `calc(${innerHeight}px * 0.2)`,
        }
    },
    textField: {
        flexGrow: 1,
        width: '47%',
        margin: '2%',
        [theme.breakpoints.down('md')]: {
            width: '70%',
        }
    },
    imageContent: {
        flexGrow: 1,
        //marginTop: '15%',
        width: '27%',
        [theme.breakpoints.down('md')]: {
            width: '44%',
        }
    },
    image: {
        width: '100%',
        objectFit: 'contain',
        height: '100%',
    },
    button: {
        width: '47%',
        margin: '2% 9%',
        backgroundColor: colors.blueOne,
        [theme.breakpoints.down('md')]: {
            opacity: 0.9,
        }
    },
    textPass:{
        cursor: 'pointer',
        color: colors.blueOne,
        fontWeight: 'bold',
        marginBottom: '1%',
        fontSize: '0.9em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '10%'
        }
    },
    rightSideContent: {
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${imageIglesia})`,
        backgroundColor: colors.grayTwo,
        // boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
        zIndex: 2,
        boxShadow: colors.shadow,
        //height: '100%',
        //backgroundPosition: 'center', 
        //backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover',
        [theme.breakpoints.down('md')]: {
            height: `calc(${innerHeight}px * 1.1)`,
            width: '100%',
            opacity: 0.2,
            zIndex: 1
        }
    },
    square: {
        border: `1px solid ${colors.white}`,
        width: '69%',
        height: '11%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    squareTitle: {
        fontWeight: 400,
        fontSize: 21,
        padding: '1%',
        color: colors.white
    },
    alertErr: {
        width: '46%',
        margin: '0 0 0.2% 3%',
        zIndex: 4,
        position: 'fixed',
        bottom: 0,
        [theme.breakpoints.down('md')]: {
            width: '91%',
            padding: '0 0 6% 3%',
        },
    },
    accountCircle:{
        opacity: 0.5
    }
}));

export default useStyles;