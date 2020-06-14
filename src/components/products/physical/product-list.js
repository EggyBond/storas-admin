import React, { Component,Fragment } from 'react'
import Breadcrumb from '../../common/breadcrumb';
import data from '../../../assets/data/physical_list';
import { Edit, Trash2, Link } from 'react-feather'
import axios from 'axios';
import IMG4 from "../../../assets/images/product-list/4.jpg"
import { Button } from 'antd';

export class Product_list extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data
        }
        // this.onEditClick=this.onEditClick.bind(this)
    }
    async componentWillMount(){
        let {data} = await axios.get("/product/list", {params: {ownedOnly: true}})
        let result = data.result.products
        let products = result.map(product_data=>{
            let images_list = JSON.parse(product_data.images)
            if(images_list.length > 0){
                let images = images_list[0];
                return {...product_data, images}
            }else{
                return {...product_data, images : IMG4}
            }

        })
        this.setState((prevState)=>{
            return {...prevState, data: products}
        })
    }

    onEditClick(id){
        this.props.history.push(`${process.env.PUBLIC_URL}/products/physical/${id}/edit`);
    }
    onDeleteClick(id){
        var payload = {id: id}
        new Promise((resolve, reject) => {
            axios
                .put('product/delete', payload)
                .then(({data}) => {
                    if (data.success === true) {
                        resolve(data);
                    }
                    this.props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
                    this.props.history.push(`${process.env.PUBLIC_URL}/products/physical/product-list`);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    render() {
        var CurrencyFormat = require('react-currency-format');
        return (
            <Fragment>
                <Breadcrumb title="Product List" parent="Physical" />
                <div className="container-fluid">
                    <div className="row products-admin ratio_asos">
                        {
                            this.state.data.map((myData, i) => {
                                return (
                                    <div className="col-xl-3 col-sm-6" key={i}>
                                        <div className="card">
                                            <div className="products-admin">
                                                <div className="card-body product-box">
                                                    <div className="img-wrapper">
                                                        <div className="lable-block">
                                                            {(myData.tag === 'new' )?<span className="lable3">{myData.tag}</span> : ''}
                                                            {(myData.discount === 'on sale' )?<span className="lable4">{myData.discount}</span> : '' }
                                                            </div>
                                                        <div className="front">
                                                            <a className="bg-size"><img className="img-fluid blur-up bg-img lazyloaded" src={myData.images} style={{height:"200px"}}/></a>
                                                            <div className="product-hover">
                                                                <ul>
                                                                    <li>
                                                                        <Button className="btn" type="button" onClick={() => this.onEditClick(myData.id)}>
                                                                            <Edit className="editBtn" />
                                                                        </Button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="btn" type="button" onClick={() => this.onDeleteClick(myData.id)}>
                                                                            <Trash2 className="deleteBtn" />
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-detail">
                                                        <div className="rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                        <a> <h6 >{myData.name}</h6></a>
                                                       
                                                        <h5 ><CurrencyFormat value={myData.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <div>{value}/Day</div>} /> <del >{myData.discount_price}</del></h5>
                                                        <a> <h6 >{myData.district}, {myData.city}</h6></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Product_list
