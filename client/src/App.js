import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router'
import { observer } from 'mobx-react'
import createHistory from "history/createBrowserHistory"
import { gd, gm, gs } from './stores'
import Nav from './page/Nav.jsx'
import envConfig from './tools/envConfig.js'
import './App.css'
const history = createHistory()
gm.setHistory(history);
envConfig.initEnvConfig();
envConfig.getInitRoter();

@observer
 class App extends Component {
  render() {
    let prefx = envConfig.prefx;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Router history={history}>
          <Switch>
            <Route exact path={prefx + "/"} component={Nav} />
            <Route exact path={prefx + "/add_code"} component={Nav} />
            {/*  <Route exact path={prefx + "/logining"} component={LoginIng}/>
            <Route exact path={prefx + "/login_wb"} component={Login_WB}/>
            <Route exact path={prefx + "/login_Err"} component={Login_Err}/>
            <Route exact path={prefx + "/register"} component={Register}/> */}
            {/* <PrivateRoute path={prefx + "/"} component={Nav}/> */}
            {/* <PrivateRoute path={prefx + "/"} component={Nav} /> */}


            {/* <Route path="/" render={() => (
              gs.isLogin ? <Redirect to="/login" /> : <Redirect to="/nav" />
            )} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;