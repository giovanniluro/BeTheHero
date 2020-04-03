import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/registrar" exact component={Register}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/incidents/new" exact component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}
