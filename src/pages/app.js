import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../components/privateRoute"
import Layout from "../components/layout";
import Login from "../components/login";
import Stock from "../components/stock";

const App = () => {
  return (
    <Layout>
      <Router basepath="/app">
        <PrivateRoute path="/stock" component={Stock} />
        <Login path="/login" component={Login} />
      </Router>
    </Layout>
  )
}
export default App
