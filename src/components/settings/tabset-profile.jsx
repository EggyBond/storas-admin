import React, { Component } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import {User,Settings} from 'react-feather'
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import { toast, ToastContainer } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";

export class Tabset_profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:{
                birthdate: new Date(),
                email: "",
                fullName: "",
                idPicture: null,
                phoneNo: "",
                profilePicture: null,
                type: ""
            },
            loading: false
        }
        this.handleSubmitForm=this.handleSubmitForm.bind(this)
        this.handleSubmitChangePasswordForm=this.handleSubmitChangePasswordForm.bind(this)
    }

  
    async componentWillMount(){
        let {data} = await axios.get("authentication/userDetail")
        let userData = data.result;
        if(userData.birthdate == undefined){
            userData.birthdate = new Date()
        }else{
            userData.birthdate = new Date(userData.birthdate)
        }
       
        console.log(userData)
        this.setState((prevState)=>({...prevState, userData}))
    }
    
    async handleSubmitForm(event, errors, values) {
        
        event.preventDefault();
        if(errors.length == 0){
            this.setState((prevState)=>({...prevState, loading: true}))
            // var image_url = this.state.oldData.images;
            // for(var i = 0; i < this.state.fileList.length; i++){
            //     var imagepayload = {
            //         fileName: "Warehouse",
            //         image: this.state.fileList[i]
            //     }
            //     await axios
            //     .post("asset/upload", imagepayload)
            //     .then(res => {
            //         image_url.push(res.data.result.url)
            //     })
            //     .catch(err => {
            //       console.log("err", err);
            //     });
            // }
    
            var payload = values;
            // payload.id = this.props.match.params.id;
            // payload.additional_facility = JSON.stringify(values.additional_facility)
            // payload.images = JSON.stringify(image_url)
            // payload.geolocation = this.state.latlng
            // payload.warehouseType = "PASIVE"
            payload.birthdate = this.state.userData.birthdate
                axios
                    .post('authentication/editProfile', payload)
                    .then((response ) => {
                        console.log("data", response)
                        toast.success("Edit Berhasil!")
                        localStorage.setItem('access_token', response.data.result.authToken)
                        this.setState((prevState)=>({...prevState, loading: false}))
                        // this.props.onResetPage()
                    })
                    .catch(error => {
                        var message = ""
                        if (error.response) {
                            // Request made and server responded
                            message = error.response.errorMessage
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                          } else if (error.request) {
                            message = JSON.parse(error.request.response).errorMessage;
                            // The request was made but no response was received
                            console.log(error.request);
                          } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error);
                          }
                        this.setState((prevState)=>({...prevState, loading: false}))
                        toast.error("Edit Gagal! " + message)
                    });
        }
 
    }

    async handleSubmitChangePasswordForm(event, errors, values) {
        
        event.preventDefault();
        if(errors.length == 0){
            this.setState((prevState)=>({...prevState, loading: true}))
    
            var payload = values;
            payload.birthdate = this.state.userData.birthdate
                axios
                    .post('authentication/changePassword', payload)
                    .then((response ) => {
                        console.log("data", response)
                        toast.success("Edit Berhasil!")
                        localStorage.setItem('access_token', response.data.result.authToken)
                        this.setState((prevState)=>({...prevState, loading: false}))
                        // this.props.onResetPage()
                    })
                    .catch(error => {
                        var message = ""
                        if (error.response) {
                            // Request made and server responded
                            message = error.response.data.errorMessage
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                          } else if (error.request) {
                            message = JSON.parse(error.request.response).errorMessage;
                            // The request was made but no response was received
                            console.log(error.request);
                          } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error);
                          }
                        this.setState((prevState)=>({...prevState, loading: false}))
                        toast.error("Edit Gagal! " + message)
                    });
        }
 
    }

    handleChangeDate= date => {
        console.log(date)
        var userData = this.state.userData;
        userData.birthdate = date;
        this.setState({userData})
      };

    render() {
        return (
            <div>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon" >
                        <Tab className="nav-link"><User className="mr-2" />Profile</Tab>
                        <Tab className="nav-link"><Settings className="mr-2" />Ganti Password</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="tab-pane fade show active">
                            <h5 className="f-w-600 f-16">Profile</h5>
                            <div className="table-responsive profile-table">
                            <div className="col-xl-7">
                                    <AvForm className="needs-validation add-product-form" onSubmit={this.handleSubmitForm} onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                                        <div className="form form-label-center">
                                            <div className="form-group mb-3 row">
                                                <label className="col-xl-3 col-sm-4 mb-0">Email </label>
                                                <div className="col-xl-8 col-sm-7">
                                                    <AvField className="form-control" value={this.state.userData.email} name="email" id="validationCustom01" type="text" required />
                                                </div>
                                                <div className="valid-feedback">Looks good!</div>
                                            </div>
                                            <div className="form-group mb-3 row">
                                                <label className="col-xl-3 col-sm-4 mb-0">Fullname </label>
                                                <div className="col-xl-8 col-sm-7">
                                                    <AvField className="form-control" value={this.state.userData.fullName} name="fullName" id="validationCustom01" type="text" required />
                                                </div>
                                                <div className="valid-feedback">Looks good!</div>
                                            </div>
                                            <div className="form-group mb-3 row">
                                                <label className="col-xl-3 col-sm-4 mb-0">Birthday </label>
                                                <div className="col-xl-8 col-sm-7">
                                                    <DatePicker value={this.state.userData.birthdate} onChange={this.handleChangeDate} />
                                                 </div>
                                                <div className="valid-feedback">Looks good!</div>
                                            </div>
                                            <div className="form-group mb-3 row">
                                                <label className="col-xl-3 col-sm-4 mb-0">Enter Password </label>
                                                <div className="col-xl-8 col-sm-7">
                                                    <AvField className="form-control"  name="password" id="validationCustom01" type="password" required />
                                                </div>
                                                <div className="valid-feedback">Looks good!</div>
                                            </div>
                                        </div>
                                        
                                        <div className="offset-xl-3 offset-sm-4">
                                            {
                                            this.state.loading?
                                                        <ClipLoader
                                                            size={50}
                                                            color={"#123abc"}
                                                            loading={this.state.loading}
                                                        />
                                                        :
                                            <button type="submit" className="btn btn-primary">Edit</button>
                                            }
                                        </div>
                                    </AvForm>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="tab-pane fade show active">
                            <h5 className="f-w-600 f-16">Profile</h5>
                            <div className="table-responsive profile-table">
                            <div className="col-xl-7">
                                <AvForm className="needs-validation add-product-form" onSubmit={this.handleSubmitChangePasswordForm} onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                                    <div className="form form-label-center">
                                        <div className="form-group mb-3 row">
                                            <label className="col-xl-5 col-sm-4 mb-0">Enter Old Password </label>
                                            <div className="col-xl-6 col-sm-7">
                                                <AvField className="form-control" name="oldpassword" id="validationCustom01" type="password" required />
                                            </div>
                                            <div className="valid-feedback">Looks good!</div>
                                        </div>
                                        <div className="form-group mb-3 row">
                                            <label className="col-xl-5 col-sm-4 mb-0">Enter New Password </label>
                                            <div className="col-xl-6 col-sm-7">
                                                <AvField className="form-control" name="password1" id="validationCustom01" type="password" required />
                                            </div>
                                            <div className="valid-feedback">Looks good!</div>
                                        </div>
                                        <div className="form-group mb-3 row">
                                            <label className="col-xl-5 col-sm-4 mb-0">Reenter New Password </label>
                                            <div className="col-xl-6 col-sm-7">
                                                <AvField className="form-control" name="password2" id="validationCustom01" type="password" required />
                                            </div>
                                            <div className="valid-feedback">Looks good!</div>
                                        </div>
                                    </div>
                                    
                                    <div className="offset-xl-3 offset-sm-4">
                                         {
                                            this.state.loading?
                                                        <ClipLoader
                                                            size={50}
                                                            color={"#123abc"}
                                                            loading={this.state.loading}
                                                        />
                                                        :
                                            <button type="submit" className="btn btn-primary">Edit</button>
                                            }
                                    </div>
                                </AvForm>
                            </div>
                            </div>
                        </div>
                    </TabPanel>
                    <ToastContainer />
                </Tabs>
            </div>
        )
    }
}

export default Tabset_profile
