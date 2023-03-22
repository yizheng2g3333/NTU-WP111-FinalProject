import React from 'react';
import './App.css';
import Menu_list from './containers/Menu_list';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './containers/HomePage';
import Favorite from "./containers/Favorite"
import Setting from "./containers/Setting"
import Developer from "./containers/Developer"
import Category from './containers/Category';
import SearchPage from './containers/Search';
import Report from './containers/Report';
import SpotPage from "./containers/SpotPage"
import { Layout } from 'antd';
import { Register } from './containers/Register';
import { Login } from './containers/Login';
import Protected from './components/ProtectedRoutes';
import { useState } from 'react';

const App = () => {

  // State Initialisation
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("")

  return (
    <Router>
      <Layout>
        {loggedIn
          ? <Menu_list setLoggedIn={setLoggedIn} setUser={setUser} username={username} />
          : <></>
        }
        <Routes>
          <Route path='/' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setUsername={setUsername} />} />
          <Route path='/register' element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setUsername={setUsername} />} />
          <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setUsername={setUsername} />} />

          {/* protected contents */}
          <Route
            path="/homepage"
            element={
              <Protected loggedIn={loggedIn}>
                <HomePage user={user} />
              </Protected>
            }
          />
          <Route
            path="/search"
            element={
              <Protected loggedIn={loggedIn}>
                <SearchPage user={user} />
              </Protected>
            }
          />
          <Route
            path="/spot/:id"
            element={
              // <Protected loggedIn={loggedIn}>
              <SpotPage />
              // </Protected>
            }
          />
          <Route
            path="/:id"
            element={
              <Protected loggedIn={loggedIn}>
                <Category user={user} />
              </Protected>
            }
          />
          <Route
            path="/favorite"
            element={
              <Protected loggedIn={loggedIn}>
                <Favorite user={user} />
              </Protected>
            }
          />
          <Route
            path="/setting"
            element={
              <Protected loggedIn={loggedIn}>
                <Setting user={user} />
              </Protected>
            }
          />
          <Route
            path="/developer"
            element={
              <Protected loggedIn={loggedIn}>
                <Developer />
              </Protected>
            }
          />
          <Route
            path="/report"
            element={
              <Protected loggedIn={loggedIn}>
                <Report user={user} />
              </Protected>
            }
          />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
