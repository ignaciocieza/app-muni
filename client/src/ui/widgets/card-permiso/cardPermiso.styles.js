import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../constants';

const useStyles = makeStyles((theme) => ({
    root: {
        cursor:'pointer',
        width: '25vw',
        height: '30vh',
        display: 'flex',
        fontFamily: 'Roboto, sans-serif',
        boxShadow: '5px 5px 8px -6px rgba(0,0,0,0.65)',
        [theme.breakpoints.down('md')]: {
            width: '80vw',
            marginBottom: "2%",
        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 auto',
    },
    title: {
        fontSize: '1.4rem',
        margin: '16% 0% 0% 16%',
        fontWeight: 900,
        [theme.breakpoints.down('md')]: {
            fontSize: '1.2rem',
            zIndex: 1,
        }
    },
    subtitle: {
        fontSize: '0.9rem',
        fontWeight: 700,
        color: colors.blueOne,
        margin: '5% 0 0 16%',        
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

export default useStyles;