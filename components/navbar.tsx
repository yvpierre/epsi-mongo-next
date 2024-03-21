import React from 'react';

const Navbar = () => {
    return (
        <nav className={"navbar"}>
            <div className={"title"}>EPSI Movies</div>
            <div className={"btns"}>
                <div className={"register"}>Register</div>
                <div className={"login"}>Login</div>
            </div>
        </nav>
    );
};

export default Navbar;