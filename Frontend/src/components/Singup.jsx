import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './login.css'

function Singup() {
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
            alert('Invalid Credentials');
        }
    };

    return (
        <div className='container'>
            <div className="con">
                <div className="img-sec">
                    <div className="image">

                    </div>
                </div>

                <div className="loginSec">

                    <h3><i class="bi bi-cart4"></i> Swift Cart</h3><br />
                    <h1>Welcome Back</h1>
                    <p>Please login to your Account</p><br /><br />

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
                            type="text"
                            placeholder="E-mail"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required
                        />
                        <br /><br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required
                        />
                        <br /><br />
                        <input
                            type="password"
                            placeholder="Co-Password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                        {/* <p className='fPass'>Forget Password!</p> */}
                        <br /><br /><br /><br />
                        <button type="submit" className='btnLog'>SingUp</button>
                    </form>
                    <br /><br /><br />
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Singup;
