import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './login.css'

function Login() {


    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate();
    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');


    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        if (uname === 'admin' && pass === 'admin') {
            alert('Login Successful');
            localStorage.setItem('user', uname);
            navigate('/', { replace: true }); // cannot go back now
        } else {
            // alert('Invalid Credentials');
            setShowAlert(true);

        }
    };

    return (
        <>

            {showAlert && (
                <div
                    className="alert alert-danger alert-dismissible fade show alerrMassage"
                    role="alert"
                >
                    <strong>Ooops!</strong> Wrong username or password.
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowAlert(false)} // hide alert manually
                    ></button>
                </div>
            )}

            <div className='containe shadow-lg'>
                <div className="con">
                    <div className="img-sec shadow-sm">
                        <div className="image shadow-lg">

                        </div>
                    </div>

                    <div className="loginSec mt-1">

                        <h3><i class="bi bi-cart4"></i> Swift Cart</h3>
                        <h1>Welcome Back</h1>
                        <p>Please login to your Account</p><br />

                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={uname}
                                onChange={(e) => setUname(e.target.value)}
                                required
                            />
                            <br /><br />
                            <input
                                type="password"
                                placeholder="Password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                required
                            />
                            <p className='fPass'><Link className='link'>Forget Password!</Link></p>
                            <br />
                            <button type="submit" className='btnLog'>Login</button>
                        </form>


                        <br /><br /><br />
                        <p>
                            Don't have an account? <Link to="/singup" className='link'>Singup</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Login;
