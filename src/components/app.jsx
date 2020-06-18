import React, { Component } from 'react'
import Sidebar from './common/sidebar_components/sidebar';
import Right_sidebar from './common/right-sidebar';
import Footer from './common/footer';
import Header from './common/header_components/header';
import { connect } from 'react-redux';

export class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            ltr:true,
            divName:'RTL',
        }
    }
    ChangeRtl(divName){
        if(divName === 'RTL') {
            document.body.classList.add('rtl');
            this.setState({divName: 'LTR'});
        }else{
            document.body.classList.remove('rtl');
            this.setState({divName: 'RTL'});
        }
    }
    render() {
        const {data} = this.props;
        // console.log("Jangkrik", data)
        return (
            <div>
                <div className="page-wrapper" >
                    <Header />
                    <div className="page-body-wrapper">
                        <Sidebar userData={data.user}/>
                        <Right_sidebar userData={data.user}/>
                        <div className="page-body">
                            {this.props.children}
                        </div>
                            <Footer />
                    </div>
                </div>
                <div className="btn-light custom-theme" onClick={ () => this.ChangeRtl(this.state.divName)}>{this.state.divName}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(App)
