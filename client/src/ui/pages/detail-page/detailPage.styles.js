import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root:{
        height: '100vh',
        display:'flex',
        flexDirection:'column',        
        alignItems: 'center',
    },
    title:{
        fontSize:'2rem',
    },
    subtitlePermitido:{
        //fontSize: '2rem',
        color:'green',
    },
    subtitleDenegado:{
        //fontSize: '2rem',
        color:'red',
    },
    qrCode:{
        flexGrow:1,
    },
    textFieldContent:{
        width:'50%',
        flexGrow:1,
        flexWrap: 'wrap',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imagenContein:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow:1,
        height:0,
    },
    imagen:{
        width:'30%',
        height:'100%',        
    }
}));

export default useStyles;