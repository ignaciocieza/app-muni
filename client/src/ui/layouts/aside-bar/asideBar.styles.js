import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../constants';

const useStyles = makeStyles(theme => ({
    root: {
        width: '7vw',
        height: '100vh',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: colors.blueOne,
        fontFamily: 'Roboto, sans-serif',
    },
    contentButton: {
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '30% 0 30% 0',
    },
    contentButtonActive: {
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //margin: '22%',
        margin: '30% 0 30% 0',
        borderLeft: `5px solid ${colors.gold}`,
    },
    icon: {
        color: colors.blueTwo,
        margin: '10%',
    },
    iconActive: {
        color: colors.gold,
        margin: '10%',
    },
    title: {
        color: colors.gray,
        fontWeight: 'regular',
        fontSize: 13,
    },
}));

export default useStyles;