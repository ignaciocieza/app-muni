import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    imagenContent:{
        width: '40%',        
        height: '20%',
        margin:'2%',
        flexGrow: 1,        
        border:'1px solid rgba(181, 170, 170, .5)',
        position:'relative',
        display: 'flex',
        justifyContent: 'center',
    },
    imagen:{
        width:'40%',
        height:'80%',
    },
    button:{
        position:'absolute',
        top:'90%',
        right: '35%',
    },
    downloadTag:{
        color: 'transparent',
        position:'absolute',
        top:'94%',
        right: '40%',
    }
}));

export default useStyles;