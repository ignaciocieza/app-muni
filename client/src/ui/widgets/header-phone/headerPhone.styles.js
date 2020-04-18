import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuButton: {
        marginLeft: theme.spacing(2),
    },
}));

export default useStyles;