import { makeStyles } from "@material-ui/core";

export default makeStyles((theme)=>({
    root:{
        display:"flex",
        flexFlow:'row nowrap',
        justifyContent:'center',
        alignItems:'center',
        minHeight:'100vh',
    },

    box:{
        padding: theme.spacing(3),
    }
}))