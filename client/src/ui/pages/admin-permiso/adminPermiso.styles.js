import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root:{
        margin: '1% 1% 0 8%',
        [theme.breakpoints.down('md')]: {
            margin: '5% 1% 0 1%',
        }
    }
}));

export default useStyles;