import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    imagenContent: {
        width: '40%',
        height: 0,
        marginBottom: '2%',
        flexGrow: 4,
        border: '1px solid rgba(181, 170, 170, .5)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
    },
    imagen: {
        width: '100%',
        height: '100%',
    },
    titleImage: {
        fontSize: '1.3rem',
        // position: 'absolute',
        // top: '30%',
        // right: '30%',
    },
    uploadContent: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    button: {
        position: 'absolute',
        top: '90%',
        right: '35%',
    }
}));

export default useStyles;