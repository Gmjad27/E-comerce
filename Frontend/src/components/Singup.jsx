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
        <div className='containe'>
            <div className="con">
                <div className="img-sec">
                    <div className="image">

                    </div>
                </div>

                <div className="loginSec mt-3">

                    <h3><i class="bi bi-cart4"></i> Swift Cart</h3>
                    <h1>Welcome Back</h1>
                    <p>Please login to your Account</p><br />

                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Username"
                            className='mb-2'
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="E-mail"
                            className='mb-2'
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            className='mb-2'
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Co-Password"
                            className='mb-2'
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                    
                        <br /><br />
                        <button type="submit" className='btnLog'>SingUp</button>
                    </form>
                    <br />
                    <p>
                        Already have an account? <Link to="/login" className='link'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Singup;
