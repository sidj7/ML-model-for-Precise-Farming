import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

function Navbar() {
    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();
    const { user, isAuthenticated, isLoading } = useAuth0();
    // Inline style for transparency
    const transparentStyle = { backgroundColor: 'rgba(0, 0, 0, 0)' };

    return (
        <nav className="navbar navbar-expand-lg " style={{ background: "transparent" }}>
            <div className="container-fluid">
                <Link to='/' className="navbar-brand mx-3 my-2 fw-bold " >AgriAdvisor</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link to='/' > <button className="navbar-brand mx-3 btn btn-light" >Home <i className="fa-solid fa-house"></i></button></Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/cropguide' >   <button className="navbar-brand mx-3 btn btn-light" >CropGuide <i className="fa-solid fa-leaf"></i></button></Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to='/about' >  <button className="navbar-brand mx-3 btn btn-light" tabIndex="-1" aria-disabled="true">AboutUs <i className="fa-solid fa-address-card"></i></button></Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to='/predictions' >  <button className="navbar-brand mx-3 btn btn-light" tabIndex="-1" aria-disabled="true">Predictions <i className="fa-solid fa-wheat-awn"></i></button></Link>
                        </li>
                        {!isAuthenticated && <li className="nav-item">
                            <button className="navbar-brand mx-3 btn btn-light" onClick={() => loginWithRedirect()} tabIndex="-1" aria-disabled="true">Login <i className="fa-solid fa-right-to-bracket"></i></button>
                        </li>}
                        {isAuthenticated && <li className="nav-item">
                            <button className="navbar-brand mx-3 btn btn-light" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} tabIndex="-1" aria-disabled="true">Logout <i className="fa-solid fa-right-from-bracket"></i></button>
                        </li>}
                        {isLoading && <li className="nav-item">
                            <button className="navbar-brand fa-fade mx-3 btn btn-light" onClick={() => loginWithRedirect()} tabIndex="-1" aria-disabled="true">Loading...</button>
                        </li>}
                        {isAuthenticated && <li className="nav-item">
                            <button className="navbar-brand mx-3 btn btn-light"  tabIndex="-1" aria-disabled="true">{user.name + ' '}<i className="fa-solid fa-circle-user"></i></button>
                        </li>}
                        <li className="nav-item d-none">
                            <button className="navbar-brand mx-3 btn btn-light" tabIndex="-1" aria-disabled="true">Support</button>
                        </li>
                    </ul>



                </div>
            </div>
        </nav>
    );
}

export default Navbar;











