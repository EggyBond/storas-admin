import React, { Component, Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User, Unlock } from 'react-feather';
import { withRouter } from 'react-router-dom';
import { Input, Form, notification } from 'antd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

export class LoginTabset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeShow: true,
            startDate: new Date(),
            password: "",
            loading: false
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
            this.setState((prevState)=>({...prevState, loading: true}))
            var payload = value
            payload.password = this.state.password; 
            return new Promise((resolve, reject) => {   
                axios
                    .post('authentication/login', payload)
                    .then(({ data, status }) => {
                        if (status === 200) {
                            this.setState((prevState)=>({...prevState, loading: false}))
                            localStorage.setItem('access_token', data.result.authToken)
                            resolve(data);
                            var userData = data.result.userData
                            this.props.onLogin(userData);
                            this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
                            localStorage.setItem("isLoggedIn", true)
                        }

                    })
                    .catch(error => {
                        this.setState((prevState)=>({...prevState, loading: false}))
                        toast.error("Email atau Password Salah!")
                        console.log(error)
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
               
                                    <div className="form-button">
                                        {
                                            this.state.loading?
                                                        <ClipLoader
                                                            size={50}
                                                            color={"#123abc"}
                                                            loading={this.state.loading}
                                                        />
                                                        :
                                                <button className="btn btn-primary" type="submit"  onClick={() => this.routeChange()}>Login</button>
                                        }
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

                                <div className="form-button">
                                    <button className="btn btn-primary" type="submit" onClick={() => this.routeChange()}>Register</button>
                                </div>

                            </form>
                        </TabPanel>
                    </Tabs>
                </Fragment>
                <ToastContainer />
            </div>
        )
    }
}

export default withRouter(LoginTabset)

