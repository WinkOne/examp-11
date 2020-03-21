// import React, {Fragment} from 'react';
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Typography from '@material-ui/core/Typography';
// import Toolbar from "../UI/Toolbar/Toolbar";
//
//
// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             flexGrow: 1,
//         },
//         menuButton: {
//             marginRight: theme.spacing(2),
//         },
//         title: {
//             flexGrow: 1,
//         },
//     }),
// );
// export default function ButtonAppBar(props) {
//     const classes = useStyles();
//
//     return (
//         <Fragment>
//             <div className={classes.root}>
//                 <AppBar position="static">
//                     <Toolbar>
//                         <Typography variant="h6" className={classes.title}>
//                             <Toolbar to={props.to} linkName="Artist"/>
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>
//             </div>
//             <main>
//                 {props.children}
//             </main>
//         </Fragment>
//     );
// }