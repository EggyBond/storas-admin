import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

export class DatatableTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: this.props.myData,
            tableData:[
                {
                    customerId: 2,
                    id: 7,
                    ownerId: 1,
                    status: "NOT PAID",
                    totalAmount: 200000,
                    transactionTime: "2020-06-15T23:49:53.571Z",
                    warehouseId: 19,
                    warehouseName: "Bond Warehouse"
                },
                {
                    customerId: 2,
                    id: 8,
                    ownerId: 1,
                    status: "NOT PAID",
                    totalAmount: 250000,
                    transactionTime: "2020-06-15T23:49:53.571Z",
                    warehouseId: 19,
                    warehouseName: "Bond Warehouse"
                }
            ],
            
        }
    }

    selectRow = (e, i) => {
        if (!e.target.checked) {
            this.setState({
                checkedValues: this.state.checkedValues.filter((item, j) => i !== item)
            });
        } else {
            this.state.checkedValues.push(i);
            this.setState({
                checkedValues: this.state.checkedValues
            })
        }
    }

    handleRemoveRow = () => {
        const selectedValues = this.state.checkedValues;
        const updatedData = this.state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        this.setState({
            myData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.myData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ myData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.myData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    render() {
        const { pageSize, myClass, multiSelectOption, pagination } = this.props;
        const { myData } = this.props

        const columns = [
            {
                Header: "Warehouse Name",
                accessor: "warehouseName",
                style: {
                    textAlign: 'center'
                },
            },
            {
                Header: "Total Amount",
                accessor: "totalAmount",
                style: {
                    textAlign: 'center'
                },
                Cell: (row)=>{
                    return (
                        <CurrencyFormat value={row.original.totalAmount} displayType={'text'} thousandSeparator={true} prefix={'Rp '} renderText={value => <div>{value}</div>} /> 
                    )},
                    
            },
            {
                Header: "Transaction Time",
                accessor: "transactionTime",
                style: {
                    textAlign: 'center'
                },
                Cell: (row)=>{
                    console.log(row)
                    return (
                        <div>{moment(row.original.transactionTime).format("DD MMM YYYY HH:mm")}</div>
                    )}
            },
            {
                Header: "Start Date",
                accessor: "startDate",
                style: {
                    textAlign: 'center'
                },
                Cell: (row)=>{
                    console.log(row)
                    return (
                        <div>{moment(row.original.startDate).format("DD MMM YYYY")}</div>
                    )}
            },
            {
                Header: "End Date",
                accessor: "endDate",
                style: {
                    textAlign: 'center'
                },
                Cell: (row)=>{
                    console.log(row)
                    return (
                        <div>{moment(row.original.endDate).format("DD MMM YYYY")}</div>
                    )}
            },
            {
                Header: "Status",
                accessor: "status",
                style: {
                    textAlign: 'center'
                },
            },
            {
                Header: <b>Action</b>,
                id: 'delete',
                accessor: str => "delete",
                Cell: (row) => (
                    <div>
                        <span onClick={() => {
                            if (window.confirm('Are you sure you wish to delete this item?')) {
                            }
                            toast.success("Successfully Deleted !")

                        }}>
                            <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}
                            ></i>
                        </span>

                        <span onClick={() => this.props.onViewDetail(row)}><i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i></span>
                   </div>
                ),
                style: {
                    textAlign: 'center'
                },
                sortable: false
            }
        ];
        
        console.log(columns,myData)
        return (
            <Fragment>
                <ReactTable
                    data={myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

export default DatatableTransaction
