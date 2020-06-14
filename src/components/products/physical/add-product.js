import React, { Component,Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import CKEditors from "react-ckeditor-component";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import one from '../../../assets/images/pro3/1.jpg'
import user from '../../../assets/images/user.png';
import axios from 'axios';
import { MyMapComponent } from './MyMapComponent';
import AvCheckbox from 'availity-reactstrap-validation/lib/AvCheckbox';
import AvCheckboxGroup from 'availity-reactstrap-validation/lib/AvCheckboxGroup';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export class Add_product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
            file: '',
            fileList: [],
            dummyimgs: [
                { img: user },
                { img: user },
                { img: user },
                { img: user },
                { img: user },
                { img: user },
            ],
            latlng: { lat: -34.397, lng: 150.644 },
            image_url: [],
            valid: false
        }
        this.handleSubmitForm=this.handleSubmitForm.bind(this)
        this.onMapClick=this.onMapClick.bind(this)
        this.onChangeDescription=this.onChangeDescription.bind(this)
        this.handleValidSubmit=this.handleValidSubmit.bind(this)
        this.handleInvalidSubmit=this.handleInvalidSubmit.bind(this)
        
        
    }


    IncrementItem = () => {
        this.setState(prevState => {
            if (prevState.quantity < 9) {
                return {
                    quantity: prevState.quantity + 1
                }
            } else {
                return null;
            }
        });
    }
    DecreaseItem = () => {
        this.setState(prevState => {
            if (prevState.quantity > 0) {
                return {
                    quantity: prevState.quantity - 1
                }
            } else {
                return null;
            }
        });
    }
    handleChange = (event) => {
        this.setState({ quantity: event.target.value });
    }

    handleUpload = ({ fileList }) => {
        console.log('fileList', fileList);
    
        this.setState({ fileList });
      };
      
    //image upload
    _handleSubmit(e) {
        e.preventDefault();
        console.log("hit")
    }

    _handleImgChange(e, i) {
        e.preventDefault();
        let file = e.target.files[0];
        if(file === undefined){
            const { dummyimgs } = this.state;
            dummyimgs[i].img = user;
            this.setState((prevState)=>{
                var fileList = prevState.fileList;
                fileList.splice(i, 1)
                return {...prevState, fileList, dummyimgs}
            })
            
        }else{
            let reader = new FileReader();
            const { dummyimgs } = this.state;
            reader.onloadend = (b) => {
                dummyimgs[i].img = reader.result;
                this.setState((prevState)=>{
                    var fileList = prevState.fileList;
                    fileList.push(b.target.result)
                    return {...prevState, fileList, dummyimgs}
                }) 
                console.log(this.state.fileList)
            }
            reader.readAsDataURL(file)
        }

    }

    async handleSubmitForm(event, errors, values) {
        
        event.preventDefault();
        if(this.state.valid){
            console.log("SUBMIT", values)
            var image_url = []
            for(var i = 0; i < this.state.fileList.length; i++){
                var imagepayload = {
                    fileName: "Warehouse",
                    image: this.state.fileList[i]
                }
                await axios
                .post("http://localhost:5000/api/app/asset/upload", imagepayload)
                .then(res => {
                    console.log("res", res);
                    image_url.push(res.data.result.url)
                    console.log("image url", this.state.image_url);
                })
                .catch(err => {
                  console.log("err", err);
                });
            }
    
            var payload = values;
    
            payload.additional_facility = JSON.stringify(values.additional_facility)
            payload.images = JSON.stringify(image_url)
            payload.geolocation = this.state.latlng
            payload.warehouseType = "PASIVE"
            console.log("payload", payload)
            new Promise((resolve, reject) => {
                axios
                    .post('product/upsert', payload)
                    .then(({data}) => {
                        if (data.success === true) {
                            resolve(data);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
 
    }

    onMapClick(mapsMouseEvent){
        this.setState((prevState)=>{
            return {...prevState,latlng: mapsMouseEvent.latLng.toJSON()}
        })
    }
    handleValidSubmit(){
        this.setState((prevState)=>{
            return {...prevState, valid: true}
        })
    }
    handleInvalidSubmit(){
        this.setState((prevState)=>{
            return {...prevState, valid: false}
        })
    }
    onChangeDescription(value){
        console.log(value)
    }
    render() {

        return (
            <Fragment>
                <Breadcrumb title="Add Product" parent="Physical" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Add Product</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row product-adding">
                                        <div className="col-xl-5">
                                            <div className="add-product">
                                                <div className="row">
                                                    <div className="col-xl-9 xl-50 col-sm-6 col-9">
                                                        <img src={this.state.dummyimgs[0].img == user? one: this.state.dummyimgs[0].img } alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
                                                    </div>
                                                    <div className="col-xl-3 xl-50 col-sm-6 col-3">

                                                        <ul className="file-upload-product">
                                                            {
                                                                this.state.dummyimgs.map((res, i) => {
                                                                    return (
                                                                        <li key={i}>
                                                                            <div className="box-input-file">
                                                                                <input className="upload" type="file" onChange={(e) => this._handleImgChange(e, i)} />
                                                                                <img src={res.img} style={{ width: 50, height: 50 }} />
                                                                                <a id="result1" onClick={(e) => this._handleSubmit(e.target.id)}></a>

                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-7">
                                            <AvForm className="needs-validation add-product-form" onSubmit={this.handleSubmitForm} onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                                                <div className="form form-label-center">
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Nama produk :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control" name="name" id="validationCustom01" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Harga :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control mb-0" name="price" id="validationCustom02" type="number" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                                <div className="form">
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-sm-4">Deskripsi :</label>
                                                        <div className="col-xl-8 col-sm-7 description-sm">
                                                            <AvField className="form-control mb-0" name="decription" id="validationCustom02" type="textarea" required />   
                                                        </div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Kota :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField type="select" value="Bekasi" name="city"  required>
                                                                <option value="Bekasi">Bekasi</option>
                                                                <option value="Jakarta Pusat">Jakarta Pusat</option>
                                                                <option value="Jakarta Timur">Jakarta Timur</option>
                                                                <option value="Jakarta Barat">Jakarta Barat</option>
                                                            </AvField>
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Kecamatan :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField type="select" value="Jatiasih" name="district" required>
                                                                <option value="Jatiasih">Jatiasih</option>
                                                                <option value="Jati Mekar">Jati Mekar</option>
                                                            </AvField>
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Pin Point Map :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <MyMapComponent isMarkerShown={true} latlng={this.state.latlng} onMapClick={this.onMapClick}></MyMapComponent>
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form form-label-center">
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Luas Area :</label>
                                                            <div className="col-xl-7 col-sm-7">
                                                                <AvField className="form-control" name="building_area" id="validationCustom01" type="number" required />
                                                            </div>
                                                            <div className="col-xl-1 col-sm-7">
                                                                m<sup>2</sup>
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Kapasitas Listrik :</label>
                                                            <div className="col-xl-7 col-sm-7">
                                                                <AvField className="form-control mb-0" name="electricity" id="validationCustom02" type="number" required />
                                                            </div>
                                                            <div className="col-xl-1 col-sm-7">
                                                                kW
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Jumlah Lantai :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvField className="form-control mb-0" name="total_floor" id="validationCustom02" type="number" required />
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">PDAM :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvField className="form-control mb-0" name="padm" id="validationCustom02" type="number" required />
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Fasilitas Tambahan :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvCheckboxGroup className="form-control mb-0" inline name="additional_facility">
                                                                    <AvCheckbox customInput label="AC" value="AC" />
                                                                    <AvCheckbox customInput label="Telepon" value="Telepon" />
                                                                    <AvCheckbox customInput label="WIFI" value="WIFI" />
                                                                    <AvCheckbox customInput label="Kamar Mandi" value="Kamar Mandi"  />
                                                                </AvCheckboxGroup>
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="offset-xl-3 offset-sm-4">
                                                    <button type="submit" className="btn btn-primary">Add</button>
                                                    <button type="button" className="btn btn-light">Discard</button>
                                                </div>
                                            </AvForm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Add_product
