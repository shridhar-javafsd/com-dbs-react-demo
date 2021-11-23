import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DbsDemo from './components/DbsDemo';

import Login from './components/Login';

const Routes = () => {
    return (
            <div>
                <Router>
                    <div>
                        <div>
                            <Switch>
                                <Route exact path="/"> <Login /> </Route>
                                <Route path="/login"> <Login /> </Route>
                                <Route path="/dbsdemo"> <DbsDemo /> </Route>
                                <Route path="/*"> <Login /> </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
    );
}
export default Routes;