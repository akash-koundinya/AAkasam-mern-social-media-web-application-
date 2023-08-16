import { BrowserRouter,Navigate,Routes,Route } from "react-router-dom";
import HomePage  from "scenes/homePage"; //here this the use of jsonconfig w starting every thing from src so that we may not bother aboutt ./ or../
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import {useMemo} from "react";
import   {useSelector}    from "react-redux";
import {CssBaseline,ThemeProvider}from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {themeSettings} from "./themes";
import state from "state";



// first we set up routes
// after that we set redux tool kit state
function App() {// when ever u want to use the state use us eSelector and grab the state from state folder
  const mode=useSelector((state)=>state.mode); // this will help us to grab us to craete initial  state
const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]); // setting theeme setiings and setting default mode
 const isAuth=Boolean(useSelector((state)=> state.token))// this is for authorization//if token exists wecan go goto any other page

//we set oer theme now we pass it into material ui
 
 
 // this is how you do routing  in reacter theme={theme}>
  
 // css baseline convinient to reset our css
 // with themeprovider we set our theme 
 return (
    <div className="App">
  
    <BrowserRouter> 
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Routes>
        <Route path="/"  element ={<LoginPage/>} />
        <Route path="/home"  element ={isAuth ? <HomePage/>: <Navigate to="/"/>} />{/*if there is a token then we go to home page other we navigate back to login page*/}
        <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/"/>} /> 
      </Routes> </ThemeProvider>
    </BrowserRouter>
  

    </div>
  );
}

export default App;

//will craeate windgets in componenet folder