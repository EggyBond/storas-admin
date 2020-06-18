import React, { Component, Fragment } from 'react'
import Breadcrumb from '../common/breadcrumb';
import data from '../../assets/data/orders';
import axios from 'axios';
import DatatableTransaction from '../common/datatableTransaction';

export class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }

        this.onViewDetail=this.onViewDetail.bind(this)
    }

    async componentWillMount(){
        let {data} = await axios.get("/transaction/list")

        let dataTransaction = data.result.transactions
        this.setState((prevState)=>({...prevState, data:dataTransaction}))
    }

    onViewDetail(row){
        console.log("View Detail", row);
        this.props.history.push(`${process.env.PUBLIC_URL}/sales/${row.original.id}/detail`);
    };


    render() {
        console.log("transaction", this.state.data);

        return (
            <Fragment>
                <Breadcrumb title="Orders" parent="Sales" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Manage Order</h5>
                                </div>
                                <div className="card-body order-datatable">
                                <DatatableTransaction
                                            onViewDetail= {this.onViewDetail}
                                            multiSelectOption={false}
                                            myData={this.state.data}
                                            pageSize={10}
                                            pagination={true}
                                            class="-striped -highlight"
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Orders
