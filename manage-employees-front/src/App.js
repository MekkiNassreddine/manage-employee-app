import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import ListRequest from "./pages/listRequest/ListRequest"
import SingleRequest from "./pages/singleRequest/SingleRequest"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import HomeEmployee from "./employeePages/employeeHome/HomeEmployee";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [role, setRole] = useState("")
  const [token, setToken] = useState("")
  const [employee, setEmployee] = useState({})

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const storedUser = localStorage.getItem('user');
      const parsedUser = JSON.parse(storedUser);
      const roleUser = parsedUser.role;
      const tokenUser = parsedUser.token;
  
        setRole(roleUser);
        setToken(tokenUser)
        setEmployee(parsedUser)
      
    }
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div>
          {localStorage.getItem('token') === null && <Login />}
          {role === 'ADMIN' && 
          <div>
              <BrowserRouter>
                 <Routes>
                   <Route path="/">
                   <Route index element={<Login />} />
                   <Route path="home" element={localStorage.getItem('token') ? <Home /> : <Login />} />
                   <Route path="users">
                   <Route index element={localStorage.getItem('token') ? <List /> : <Login />} />
                   <Route path=":id_card" element={localStorage.getItem('token') ? <Single /> : <Login />} />
                   <Route
                     path="new"
                     element={localStorage.getItem('token') ? <New title="Add New User" /> : <Login />}
                   />
                 </Route>
                 <Route path="requests">
                 <Route index element={localStorage.getItem('token') ? <ListRequest /> : <Login />} />
                 <Route path=":id_card_request" element={localStorage.getItem('token') ? <SingleRequest /> : <Login />} />
                 </Route>
                 </Route>
                </Routes>
                </BrowserRouter>
          </div>}
          {role === 'CLIENT' &&
            <div>
              <BrowserRouter>
                 <Routes>
                     <Route path="home" element={localStorage.getItem('token') ? <HomeEmployee employee={employee} /> : <Login />} />
                 </Routes>
              </BrowserRouter>
            </div>
          }
      </div>
    </div>
  );
}

export default App;