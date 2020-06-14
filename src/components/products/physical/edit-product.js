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

export class Edit_product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
            file: '',
            fileList: [],
            dummyimgs: [

            ],
            latlng: { 
                lat: -34.397, 
                lng: 150.644 
            },
            image_url: [],
            valid: false,
            imagePreview: one,
            oldData: {
                additional_facility: [],
                building_area: 0,
                city: "",
                description: null,
                district: "",
                electricity: 0,
                geoLocation: {lng: 150.5855395781398, lat: -34.74611542904515},
                id: 0,
                name: "",
                pdam: 0,
                price: 0,
                total_floor: 0,
                warehouseType: ""
            },
        
        }
        this.handleSubmitForm=this.handleSubmitForm.bind(this)
        this.onMapClick=this.onMapClick.bind(this)
        this.onChangeDescription=this.onChangeDescription.bind(this)
        this.handleValidSubmit=this.handleValidSubmit.bind(this)
        this.handleInvalidSubmit=this.handleInvalidSubmit.bind(this)
        
    }

    async componentWillMount(){

        let id = this.props.match.params.id;
        let {data} = await axios.get("/product/detail", {params: {id}})
        let product = data.result;
        product.additional_facility = JSON.parse(product.additional_facility)
        product.images = JSON.parse(product.images)
        this.setState((prevState)=>{
            let images = product.images
            let dummyimgs = prevState.dummyimgs
            for(var i = 0; i < images.length; i++){

                dummyimgs.push({img: images[i]})
            }
            return{...prevState, oldData : product, latlng: product.geoLocation, dummyimgs}
        })
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
    
        this.setState({ fileList });
      };
      
    //image upload
    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImgChange(e, i) {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        const { dummyimgs } = this.state;
        reader.onloadend = (b) => {
            dummyimgs.push({img : reader.result});
            this.setState((prevState)=>{
                var fileList = prevState.fileList;
                fileList.push(b.target.result)
                return {...prevState, fileList, dummyimgs}
            }) 
        }
        reader.readAsDataURL(file)
    }

    _handleImgDelete(i) {
        const { dummyimgs, fileList, oldData } = this.state;
        if(oldData.images[i] != undefined){
            oldData.images.splice(i, 1);
        }else{
            fileList.splice(i, 1)
        }
        dummyimgs.splice(i, 1);
        this.setState((prevState)=>{
            return {...prevState, fileList, dummyimgs, oldData, imagePreview: one}
        }) 
    }

    _handleMouseOver(i) {
        var dummyimgs = this.state.dummyimgs
        var imagePreview = dummyimgs[i].img === user? one : dummyimgs[i].img
        this.setState((prevState)=>({...prevState, imagePreview}))
    }

    async handleSubmitForm(event, errors, values) {
        
        event.preventDefault();
        if(this.state.valid){
            var image_url = this.state.oldData.images;
            for(var i = 0; i < this.state.fileList.length; i++){
                var imagepayload = {
                    fileName: "Warehouse",
                    image: this.state.fileList[i]
                }
                await axios
                .post("http://localhost:5000/api/app/asset/upload", imagepayload)
                .then(res => {
                    image_url.push(res.data.result.url)
                })
                .catch(err => {
                  console.log("err", err);
                });
            }
    
            var payload = values;
            payload.id = this.props.match.params.id;
            payload.additional_facility = JSON.stringify(values.additional_facility)
            payload.images = JSON.stringify(image_url)
            payload.geolocation = this.state.latlng
            payload.warehouseType = "PASIVE"
            new Promise((resolve, reject) => {
                axios
                    .put('product/update', payload)
                    .then(({data}) => {
                        if (data.success === true) {
                            resolve(data);
                            this.props.history.push(`${process.env.PUBLIC_URL}/products/physical/product-list`);
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
                                                        <img src={this.state.imagePreview} alt="" className="img-fluid image_zoom_1 blur-up lazyloaded" />
                                                    </div>
                                                    <div className="col-xl-3 xl-50 col-sm-6 col-3">


                                                        <ul className="file-upload-product">
                                                            {
                                                                this.state.dummyimgs.map((res, i) => {
                                                                    return (
                                                                        <li key={i}>
                                                                            <div className="box-input-file">
                                                                                <img src={res.img} style={{ width: 50, height: 50 }} onMouseOver={()=> this._handleMouseOver(i)}/>
                                                                            </div>
                                                                            <button style={{height: "25px", width: "25px"}} onClick={() => this._handleImgDelete(i)}><h6>x</h6></button>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                            <li key={this.state.dummyimgs.length}>
                                                                <div className="box-input-file">
                                                                        <input className="upload" type="file" onChange={(e) => this._handleImgChange(e, this.state.dummyimgs.length)} />
                                                                        <img src={user} style={{ width: 50, height: 50 }}/>

                                                                </div>
                                                            </li>
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
                                                            <AvField className="form-control" value={this.state.oldData.name} name="name" id="validationCustom01" type="text" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Harga :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField className="form-control mb-0" value={this.state.oldData.price} name="price" id="validationCustom02" type="number" required />
                                                        </div>
                                                        <div className="valid-feedback">Looks good!</div>
                                                    </div>
                                                </div>
                                                <div className="form">
                                                    <div className="form-group row">
                                                        <label className="col-xl-3 col-sm-4">Deskripsi :</label>
                                                        <div className="col-xl-8 col-sm-7 description-sm">
                                                            <AvField className="form-control mb-0" value={this.state.oldData.description} name="description" id="validationCustom02" type="textarea" required />   
                                                        </div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-sm-4 mb-0">Kota :</label>
                                                        <div className="col-xl-8 col-sm-7">
                                                            <AvField type="select" value={this.state.oldData.city} name="city"  required>
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
                                                            <AvField type="select" value={this.state.oldData.district} name="district" required>
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
                                                                <AvField className="form-control" value={this.state.oldData.building_area} name="building_area" id="validationCustom01" type="number" required />
                                                            </div>
                                                            <div className="col-xl-1 col-sm-7">
                                                                m<sup>2</sup>
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Kapasitas Listrik :</label>
                                                            <div className="col-xl-7 col-sm-7">
                                                                <AvField className="form-control mb-0" value={this.state.oldData.electricity} name="electricity" id="validationCustom02" type="number" required />
                                                            </div>
                                                            <div className="col-xl-1 col-sm-7">
                                                                kW
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Jumlah Lantai :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvField className="form-control mb-0" value={this.state.oldData.total_floor} name="total_floor" id="validationCustom02" type="number" required />
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">PDAM (Tidak Wajib) :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvField className="form-control mb-0" value={this.state.oldData.pdam} name="pdam" id="validationCustom02" type="number" />
                                                            </div>
                                                            <div className="valid-feedback">Looks good!</div>
                                                        </div>
                                                        <div className="form-group mb-3 row">
                                                            <label className="col-xl-3 col-sm-4 mb-0">Fasilitas Tambahan :</label>
                                                            <div className="col-xl-8 col-sm-7">
                                                                <AvCheckboxGroup className="form-control mb-0" value={this.state.oldData.additional_facility} inline name="additional_facility">
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

export default Edit_product