import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#ebe8e8',
        boxShadow: '-3px -3px 7px #ffffffb2, 3px 3px 5px rgba(94, 104, 121, 0.945)',
        borderRadius: '4px',
        padding: theme.spacing(2, 4, 3),
        textAlign: 'center',
        fontFamily: 'Sulphur Point, sans-serif',
    },
    text: {
        margin: '1%',
        color: '#8b8b8b',
    },
    imageContent: {
        boxShadow: '-3px -3px 7px #ffffffb2, 3px 3px 5px rgba(94, 104, 121, 0.945)',
        borderRadius: '4px',
        padding: theme.spacing(2, 4, 3),
    },
    image: {
        height: 500,
        width: 500,
        borderRadius: '4px',
        [theme.breakpoints.down('md')]: {
            height: 300,
            width: 300,
        }
    }
}));

export default useStyles;