import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import { ScrollContext } from 'react-router-scroll-4';
import Login from './components/auth/login';
import PrivateRoute from './components/auth/protectedRoute';
import MainComponent from './components/maincomponent';
import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';

class Root extends Component {
    render() {
        axios.defaults.baseURL = "http://localhost:5000/api/app";

        axios.interceptors.request.use(
            (config) => {
              let token = localStorage.getItem('access_token');
          
              if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
              }
              return config;
            },
          
            (error) => {
              return Promise.reject(error);
            }
          );
        return (
            <Provider store={store}>
                <BrowserRouter basename={'/'}>
                    <ScrollContext>
                        <Switch>
                            
                            <Route exact path={`${process.env.PUBLIC_URL}/auth/login`} component={Login} />
                            <PrivateRoute  path={`${process.env.PUBLIC_URL}/`} component={MainComponent} />

                        </Switch>
                    </ScrollContext>
                </BrowserRouter>
            </Provider>

        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


