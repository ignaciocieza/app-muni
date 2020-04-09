import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    content: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        marginTop:'2%',
        fontSize: '3rem',
        opacity: 0.5,
        flexGrow: 1,
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            //flexGrow: 3,
            flexGrow: 'unset',
            fontSize: '2rem',    
        }
    },
    titleError:{
        fontSize: '3rem',
        opacity: 0.5,
        flexGrow: 1,
        textAlign: 'center',
        color:'red',
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
            marginTop: '33%',
        }
    },
    imagen: {
        width: '100%',
        //height: '100%',
        height:'auto,'
    }
}));

export default useStyles;