import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../../constants';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        margin: '4% 0% 0% 10%',
        fontFamily: 'Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            margin: '4% 0% 0% 0%',
        }
    },
    title: {
        fontSize: '1.4rem',
        color: colors.blueOne,
        fontWeight: 900,
        flexGrow: 1,
        [theme.breakpoints.down('md')]: {
            marginTop: '4%',
            alignSelf: 'center',
        }
    },
    subtitle: {
        width:'22%',
        lineHeight: 2,
        fontSize: '0.9rem',
        fontWeight: 700,
        flexGrow: 1,
        alignSelf: 'center',
        textAlign:'center',
        opacity: 0.5,
        [theme.breakpoints.down('md')]: {
            width: '80%',
        }
    },
    permisosContent: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap:'wrap',
        flexGrow: 4,
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 5,
            alignItems: 'center',
        }
    }
}));

export default useStyles;