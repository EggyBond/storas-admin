import React, { Component,Fragment } from 'react'
import {Link} from 'react-router-dom'
//images import
import man from '../../../assets/images/dashboard/man.png'
export class User_menu extends Component {
    onLogout (){
        localStorage.removeItem("access_token");
        localStorage.removeItem("isLoggedIn");
    }
    render() {
        return (
            <Fragment>
                    <li className="onhover-dropdown">
                        <div className="media align-items-center">
                            <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={man} alt="header-user" />
                            <div className="dotted-animation"><span className="animate-circle"></span><span className="main-circle"></span></div>
                        </div>
                        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
                            <li><Link to={`${process.env.PUBLIC_URL}/settings/profile`} ><i data-feather="user"></i>Edit Profile</Link></li>
                            <li><Link to={`${process.env.PUBLIC_URL}/auth/login`} onClick={this.onLogout}><i data-feather="log-out"></i>Logout</Link></li>
                        </ul>
                    </li>
            </Fragment>
        )
    }
}

export default User_menu
