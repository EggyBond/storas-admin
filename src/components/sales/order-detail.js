import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from 'react-responsive-modal';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';


// image import
import two from '../../assets/images/pro3/2.jpg';
import twentySeven from '../../assets/images/pro3/27.jpg';
import one from '../../assets/images/pro3/1.jpg';
import size_chart from '../../assets/images/size-chart.jpg'
import CurrencyFormat from 'react-currency-format';
import { MyMapComponent } from '../products/physical/MyMapComponent';

export class Order_detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
            rating: 1,
            open: false,
            nav1: null,
            nav2: null,
            transactionData: {
                customerId: 2,
                id: 7,
                ownerId: 1,
                paymentDestination: {},
                paymentList: [],
                productInfo:{
                    city: "",
                    id: 0,
                    images: [],
                    name: "",
                    price: 0,
                    warehouseType: "PASIVE",
                    description: "",
                    geoLocation:{
                        lng:106.96166716671388, 
                        lat:-6.291728960071744
                    }
                },
                status: "",
                totalAmount: 0,
                transactionTime: ""
            }
        }
    }

    async componentWillMount(){

        let id = this.props.match.params.id;
        let {data} = await axios.get("/transaction/detail", {params: {id}})
        let transactionData = data.result;
        let images = JSON.parse(transactionData.productInfo.images)
        transactionData.productInfo.images = images;
        console.log(transactionData)
        this.setState((prevState)=>({...prevState, transactionData}))

    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }
    onStarHover(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    } /* on icon hover handler */
    onStarHoverOut(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
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
    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }
    render() {
        const { open } = this.state;
        const { rating } = this.state;
        return (

            <Fragment>
                <Breadcrumb title="Transaction Detail" parent="Sales" />

                <div className="container-fluid">
                    <div className="card">
                        <div className="row product-page-main card-body">
                            <div className="col-xl-4">
                                <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}
                                    className="product-slider" >
                                    {
                                        this.state.transactionData.productInfo.images.map((image)=>{
                                            return(
                                                <div className="item">
                                                    <img className="img-fluid" src={image} alt="" style={{width: "500px"}}/>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="item">
                                        <img className="img-fluid" src={twentySeven} alt="" />
                                    </div>
                                </Slider>

                               
                            </div>
                            <div className="col-xl-8">
                                <div className="product-page-details product-right mb-0">
                                    <h2>{this.state.transactionData.productInfo.name}</h2>
                                    <div style={{ fontSize: 27, height: 31 }}>
                                        {/* <StarRatingComponent
                                            name="rate1"
                                            starCount={5}
                                            value={rating}
                                            onStarClick={this.onStarClick.bind(this)}
                                            onStarHover={this.onStarHover.bind(this)}
                                            onStarHoverOut={this.onStarHoverOut.bind(this)}
                                        /> */}
                                        <p>Transaction ID # {this.state.transactionData.id}</p>
                                    </div>
                                    <hr />
                                    <h6 className="product-title">Warehouse description</h6>
                                    <p>{this.state.transactionData.productInfo.description}</p>
                                    <hr />
                                    <h6 className="product-title">Total Harga</h6>
                                    <div className="product-price digits mt-2">
                                        <CurrencyFormat value={this.state.transactionData.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'Rp '} renderText={value => <h3>{value}</h3>} />
                                    </div>
                                    {/* <hr /> */}
                                    {/* <h6 className="product-title size-text">Fasilitas Tambahan
                                        <span className="pull-right">
                                            <a data-toggle="modal" data-target="#sizemodal" onClick={this.onOpenModal}>size chart</a>
                                        </span>
                                    </h6> */}
                                    <Modal open={open} onClose={this.onCloseModal}>
                                        <div>
                                            <img src={size_chart} alt="" className="img-fluid blur-up lazyloaded" />
                                        </div>
                                    </Modal>
                                    {/* <div className="size-box">
                                        <ul>
                                            <li className="active"><a href="#">AC</a></li>
                                            <li><a href="#">TOILET</a></li>
                                            <li><a href="#">WIFI</a></li>
                                        </ul>
                                    </div> */}
                                    <hr />
                                    <h6 className="product-title">Peta</h6>
                                    <div className="col-xl-8 col-sm-7">
                                        <MyMapComponent isMarkerShown={true} latlng={this.state.transactionData.productInfo.geoLocation} onMapClick={this.onMapClick}></MyMapComponent>
                                    </div>
                                    <hr />
                                    <h6 className="product-title">Status</h6>
                                    <p>{this.state.transactionData.status}</p>
                                    <hr />
                                    <h6 className="product-title">Sisa Waktu Sewa</h6>
                                    <div className="timer">
                                        <p id="demo"><span>25 <span className="padding-l">:</span> <span className="timer-cal">Hari</span> </span><span>22 <span className="padding-l"></span> <span className="timer-cal">Jam</span> </span>
                                        </p>
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

export default Order_detail
