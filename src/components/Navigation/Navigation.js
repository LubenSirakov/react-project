import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Navigation.css';

import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { logout } from '../../services/authService.js';

function Navigation() {
    // const [user, setUser] = useState({});

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser)
    // });
    const [user, setUser] = useState({});
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // setLoading(false);
        });
        return unsubscribe;
    }, [])
    console.log(user?.uid);
    const navigate = useNavigate();
    const onLogoutClick = async () => {
        logout();
        navigate('/');
    }

    const GuestUser = () => {
        return (
            <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </>
        );
    };

    const LoggedUser = () => {
        return (
            <>
                <li>Welcome {user.email}</li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/my-profile">My Profile</Link></li>
                <button onClick={onLogoutClick} >Logout</button>
            </>
        );
    };

    return (
        <>
            <nav id="navbar" className="">
                <div className="nav-wrapper">

                    <div className="logo">

                        <Link to="/"><i className="fas fa-chess-knight"></i>Meds Portal</Link>
                    </div>


                    <ul id="menu">
                        <li><Link to="/">Home</Link></li>
                        {!user
                            ? < GuestUser />
                            : <LoggedUser />
                        }

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navigation;