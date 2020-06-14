import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter } from 'react-router-dom';
import { Input, Form, notification } from 'antd';
import axios from 'axios';

export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            startDate: new Date(),
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlePassowrdChange = this.handlePassowrdChange.bind(this)
        
    }

    clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    routeChange = (value) => {
        if(value!== undefined){
            var payload = value
            payload.password = this.state.password; 
            return new Promise((resolve, reject) => {   
                axios
                    .post('authentication/login', payload)
                    .then(({ data, status }) => {
                        if (status === 200) {
                            localStorage.setItem('access_token', data.result.authToken)
                            resolve(data);
                            this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
                            localStorage.setItem("isLoggedIn", true)
                        }

                    })
                    .catch(error => {
                        console.log(error.response.data.errorMessage)
                        reject(error);
                    });
            });
        }

      }

      onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

      handlePassowrdChange(event) {

        var password = event.target.value;
        this.setState((prevState)=>({...prevState, password}));
      }
    render() {

        return (
            <div>
                <Fragment>
                    <Tabs>
                        <TabList className="nav nav-tabs tab-coupon" >
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><User />Login</Tab>
                            <Tab className="nav-link" onClick={(e) => this.clickActive(e)}><Unlock />Register</Tab>
                        </TabList>

                        <TabPanel>
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={this.routeChange}
                                onFinishFailed={this.onFinishFailed}
                                >
                                <form className="form-horizontal auth-form">
                                    <div className="form-group">
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                {
                                                  type: 'email',
                                                  message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                  required: true,
                                                  message: 'Please input your E-mail!',
                                                },
                                              ]}
                                        >
                                            <Input placeholder="Email" className="form-control"/>
                                        </Form.Item>
                                    </div>
                                    <div className="form-group">
                                        <input required="" name="password" type="password" className="form-control" placeholder="Password" onChange={this.handlePassowrdChange}/>
                                    </div>
                                    <div className="form-terms">
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                            <label className="d-block">
                                                        <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                                            Reminder Me <span className="pull-right"> <a href="#" className="btn btn-default forgot-pass p-0">lost your password</a></span>
                                                    </label>
                                        </div>
                                    </div>
                                    <div className="form-button">
                                        <button className="btn btn-primary" type="submit"  onClick={() => this.routeChange()}>Login</button>
                                    </div>
                                    <div className="form-footer">
                                        <span>Or Login up with social platforms</span>
                                        <ul className="social">
                                            <li><a className="fa fa-facebook" href=""></a></li>
                                            <li><a className="fa fa-twitter" href=""></a></li>
                                            <li><a className="fa fa-instagram" href=""></a></li>
                                            <li><a className="fa fa-pinterest" href=""></a></li>
                                        </ul>
                                    </div>
                                </form>
                                </Form>
                        </TabPanel>
                        <TabPanel>
                            <form className="form-horizontal auth-form">
                                <div className="form-group">
                                    <input required="" name="login[username]" type="email" className="form-control" placeholder="Username" id="exampleInputEmail12" />
                                </div>
                                <div className="form-group">
                                    <input required="" name="login[password]" type="password" className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <input required="" name="login[password]" type="password" className="form-control" placeholder="Confirm Password" />
                                </div>
                                <div className="form-terms">
                                    <div className="custom-control custom-checkbox mr-sm-2">
                                        <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                        <label className="d-block">
                                            <input className="checkbox_animated" id="chk-ani2" type="checkbox" />
                                            I agree all statements in <span><a href="">Terms &amp; Conditions</a></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-button">
                                    <button className="btn btn-primary" type="submit" onClick={() => this.routeChange()}>Register</button>
                                </div>
                                <div className="form-footer">
                                    <span>Or Sign up with social platforms</span>
                                    <ul className="social">
                                        <li><a className="fa fa-facebook" href=""></a></li>
                                        <li><a className="fa fa-twitter" href=""></a></li>
                                        <li><a className="fa fa-instagram" href=""></a></li>
                                        <li><a className="fa fa-pinterest" href=""></a></li>
                                    </ul>
                                </div>
                            </form>
                        </TabPanel>
                    </Tabs>
                </Fragment>
            </div>
        )
    }
}

export default withRouter(LoginTabset)

