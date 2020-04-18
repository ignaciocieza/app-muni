import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../constants';

const useStyles = makeStyles(theme => ({
    root: {
        height: '12vh',
        fontFamily: 'Roboto, sans-serif',
    },
    rootContein: {
        position: 'fixed',
        height: '13vh',
        width: '100%',
        zIndex: '10',
        borderBottom: `5px solid ${colors.gold}`,
        backgroundColor: colors.white,
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
        }
    },
    imageContent: {
        width: '13%',
        margin: '1% 1% 1% 3%',
        [theme.breakpoints.down('md')]: {
            width: '44%',
            margin: '1% 7% 1% 3%',
        }
    },
    image: {
        width: '100%',
        height:'auto',
    },
    buttonContent: {
        width: '20%',
        marginRight: '1%',
        display: 'flex',
        alignItems: 'center',
        //justifyContent: 'space-between',
    },
    imageAvatar: {
        //width: 50, 
        //borderRadius: '50%',
        //color: theme.palette.getContrastText(deepOrange[500]),
        marginRight: '3%',
        backgroundColor: colors.blueOne,
    },
    titleContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.blueOne,
    },
    subTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.grayTwo
    },
    icon: {
        cursor:'pointer',
        width: 50,
        marginLeft:'9%',
        color: colors.blueOne,
    },
    iconSignIn: {
        width: '50px',
        marginRight: '3%',
        cursor: 'pointer',
        color: colors.blueOne,
        alignSelf: 'center',
    },
}));

export default useStyles;