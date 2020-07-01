import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //transition: 'box-shadow 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    title: {
        marginTop: '2%',
        fontSize: '3rem',
        opacity: 0.5,
        flexGrow: 1,
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            //flexGrow: 3,
            flexGrow: 'unset',
            fontSize: '2rem',
            paddingTop: '9%',
        }
    },
    titleError: {
        fontSize: '3rem',
        opacity: 0.5,
        flexGrow: 1,
        textAlign: 'center',
        color: 'red',
        [theme.breakpoints.down('md')]: {
            //flexGrow: 3,
            flexGrow: 'unset',
            fontSize: '2rem',
        }
    },
    imagenContent: {
        //flexGrow: 6,
        width: '77%',
        marginTop: '3%',
        marginBottom: '6%',
        [theme.breakpoints.down('md')]: {
            width: '93%',
            // flexGrow: 5,
            // marginBottom: '76%',
            marginTop: '50%',
        }
    },
    imagen: {
        width: '100%',
        //height: '100%',
        height: 'auto,'
    },
    alert: {
        width: '80vw',
        [theme.breakpoints.down('md')]: {
            width: '99vw',
            position: 'absolute',
            bottom: 0,
            left: 0,
        },
    },
    alertSuccs:{
        width: '78vw',
        position: 'fixed',
        bottom: 0,
        [theme.breakpoints.down('md')]: {
            width: '99vw',
            margin:0,
            left: 0,
        },
    }
}));

export default useStyles;