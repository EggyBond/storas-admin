import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './app';

// Components
import Dashboard from './dashboard';

// Products physical
import Category from './products/physical/category';
import Sub_category from './products/physical/sub-category';
import Product_list from './products/physical/product-list';
import Add_product from './products/physical/add-product';
import Product_detail from './products/physical/product-detail';

//Product Digital
import Digital_category from './products/digital/digital-category';
import Digital_sub_category from './products/digital/digital-sub-category';
import Digital_pro_list from './products/digital/digital-pro-list';
import Digital_add_pro from './products/digital/digital-add-pro';

//Sales
import Orders from './sales/orders';
import Transactions_sales from './sales/transactions-sales';
//Coupons
import ListCoupons from './coupons/list-coupons';
import Create_coupons from './coupons/create-coupons';

//Pages
import ListPages from './pages/list-page';
import Create_page from './pages/create-page';
import Media from './media/media';
import List_menu from './menus/list-menu';
import Create_menu from './menus/create-menu';
import List_user from './users/list-user';
import Create_user from './users/create-user';
import List_vendors from './vendors/list-vendors';
import Create_vendors from './vendors/create.vendors';
import Translations from './localization/translations';
import Rates from './localization/rates';
import Taxes from './localization/taxes';
import Profile from './settings/profile';
import Reports from './reports/report';
import Invoice from './invoice';
import Datatable from './common/datatable'
import axios from 'axios';
import Edit_product from './products/physical/edit-product';
import Order_detail from './sales/order-detail';

export class MainComponent extends Component {

    render() {



        return (
            <App>
                <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
                    
                <Route path={`${process.env.PUBLIC_URL}/products/physical/category`} component={Category} />
                <Route path={`${process.env.PUBLIC_URL}/products/physical/sub-category`} component={Sub_category} />
                <Route path={`${process.env.PUBLIC_URL}/products/physical/product-list`} component={Product_list} />
                <Route path={`${process.env.PUBLIC_URL}/products/physical/product-detail`} component={Product_detail} />
                <Route path={`${process.env.PUBLIC_URL}/products/physical/add-product`} component={Add_product} />
                <Route path={`${process.env.PUBLIC_URL}/products/physical/:id/edit`} component={Edit_product} />

                <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-category`} component={Digital_category} />
                <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-sub-category`} component={Digital_sub_category} />
                <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-product-list`} component={Digital_pro_list} />
                <Route path={`${process.env.PUBLIC_URL}/products/digital/digital-add-product`} component={Digital_add_pro} />

                <Route path={`${process.env.PUBLIC_URL}/sales/orders`} component={Orders} />
                <Route path={`${process.env.PUBLIC_URL}/sales/:id/detail`} component={Order_detail} />
                <Route path={`${process.env.PUBLIC_URL}/sales/transactions`} component={Transactions_sales} />

                <Route path={`${process.env.PUBLIC_URL}/coupons/list-coupons`} component={ListCoupons} />
                <Route path={`${process.env.PUBLIC_URL}/coupons/create-coupons`} component={Create_coupons} />

                <Route path={`${process.env.PUBLIC_URL}/pages/list-page`} component={ListPages} />
                <Route path={`${process.env.PUBLIC_URL}/pages/create-page`} component={Create_page} />

                <Route path={`${process.env.PUBLIC_URL}/media`} component={Media} />

                <Route path={`${process.env.PUBLIC_URL}/menus/list-menu`} component={List_menu} />
                <Route path={`${process.env.PUBLIC_URL}/menus/create-menu`} component={Create_menu} />

                <Route path={`${process.env.PUBLIC_URL}/users/list-user`} component={List_user} />
                <Route path={`${process.env.PUBLIC_URL}/users/create-user`} component={Create_user} />

                <Route path={`${process.env.PUBLIC_URL}/vendors/list_vendors`} component={List_vendors} />
                <Route path={`${process.env.PUBLIC_URL}/vendors/create-vendors`} component={Create_vendors} />

                <Route path={`${process.env.PUBLIC_URL}/localization/transactions`} component={Translations} />
                <Route path={`${process.env.PUBLIC_URL}/localization/currency-rates`} component={Rates} />
                <Route path={`${process.env.PUBLIC_URL}/localization/taxes`} component={Taxes} />

                <Route path={`${process.env.PUBLIC_URL}/reports/report`} component={Reports} />

                <Route path={`${process.env.PUBLIC_URL}/settings/profile`} component={Profile} />

                <Route path={`${process.env.PUBLIC_URL}/invoice`} component={Invoice} />

                <Route path={`${process.env.PUBLIC_URL}/data-table`} component={Datatable} />

            </App>
        )
    }
}

export default MainComponent
