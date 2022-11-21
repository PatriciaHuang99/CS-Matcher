import React from "react";

import MyPreference from "./components/MyPreference/MyPreference";
import Login from "./components/Login/Login";

import Instruction from "./components/Instruction/Instruction";
import MyProfile from "./components/MyProfile/MyProfile";
import Partner from "./components/Partner/Partner";

import Header from "./components/Header";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import "bootstrap/dist/css/bootstrap.min.css"; // only css import need to tackle order issue, react doesn't need
import "./App.css";

function App() {
  const { instance, accounts } = useMsal(); // MSAL = microsoft authentication library

  console.log(accounts);

  function logout(e) {
    e.preventDefault();
    instance.logoutPopup({
      account: accounts[0], // exchange account object using current home acount id
      mainWindowRedirectUri: "http://localhost:3000/log-in", // will rediret to this url of logged out
      postLogoutRedirectUri: "http://localhost:3000/log-in", // need to be the same as set in azure portal
    });
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <Navbar expand="lg">
        {" "}
        {/* delete bg="light" in Navbar, show background color */}
        <Container>
          <Header></Header>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <AuthenticatedTemplate>
                {" "}
                {/* show logout button if logged in */}
                <Nav.Link href="/instruction">Instruction</Nav.Link>
                <Nav.Link href="/">My Match</Nav.Link>{" "} {/* change partner to match */}
                <Nav.Link href="/my-profile">My Profile</Nav.Link>
                <Nav.Link href="/my-preference">My Preference</Nav.Link>
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                {" "}
                {/* show login button if not logged in*/}
                <Nav.Link href="/log-in">Log In</Nav.Link>
              </UnauthenticatedTemplate>
              <AuthenticatedTemplate>
                {" "}
                {/* show logout button if logged in */}
                <Nav.Link onClick={logout} href="/log-out">
                  Log Out
                </Nav.Link>
              </AuthenticatedTemplate>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        {accounts.length === 0 && (
          <>
            <Route path="/" element={<Navigate to="/log-in" />}></Route>
            <Route
              path="/instruction/"
              element={<Navigate to="/log-in" />}
            ></Route>
            <Route
              path="/my-profile"
              element={<Navigate to="/log-in" />}
            ></Route>
            <Route
              path="/my-preference"
              element={<Navigate to="/log-in" />}
            ></Route>
          </>
        )}
        <Route path="/instruction" element={<Instruction />}></Route>
        <Route path="/" exact element={<Partner />}></Route>
        <Route path="/my-profile" element={<MyProfile />}></Route>
        <Route path="/my-preference" element={<MyPreference />}></Route>
        <Route path="/log-in" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
