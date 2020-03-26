import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    form: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: '2rem'
    },
    textfieldContent: {
        flexGrow: 0.5,
        width: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textfield: {
        alignSelf: 'flex-start'
    },
    textAreaLabel: {
        flexGrow: 1,
        fontSize: '0.8rem',
    },
    textArea: {
        flexGrow: 1,
        width: '50%'
    },
    button: {
        margin: '1%'
    },
    formControl: {
        marginBottom: 'auto',
        minWidth: '20%',
    }
}));

export default useStyles;