import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'

function Login() {
  const [showAlert, setShowAlert] = useState(false);
  const [serverMsg, setServerMsg] = useState('');
  const navigate = useNavigate();
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');

  useEffect(() => {
    // check token or stored user
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    setServerMsg('');

    try {
      const resp = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: uname, password: pass })
      });

      const data = await resp.json();

      if (!resp.ok) {
        setServerMsg(data.message || 'Login failed');
        setShowAlert(true);
        return;
      }

      // success: store token & username
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.username);
      // optional: set auth headers globally if using axios
      navigate('/', { replace: true }); // cannot go back now
    } catch (err) {
      console.error(err);
      setServerMsg('Network error');
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <div className="alert alert-danger alert-dismissible fade show alerrMassage" role="alert">
          <strong>Ooops!</strong> {serverMsg || 'Wrong username or password.'}
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}

      <div className='containe shadow-lg'>
        <div className="con">
          <div className="img-sec shadow-sm">
            <div className="image shadow-lg"></div>
          </div>

          <div className="loginSec mt-1">
            <h3><i className="bi bi-cart4"></i> Swift Cart</h3>
            <h1>Welcome Back</h1>
            <p>Please login to your Account</p><br />

            <form onSubmit={handleLogin}>
              <input type="text" placeholder="Username" value={uname} onChange={(e) => setUname(e.target.value)} required />
              <br /><br />
              <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} required />
              <p className='fPass'><Link className='link'>Forget Password!</Link></p>
              <br />
              <button type="submit" className='btnLog'>Login</button>
            </form>

            <br /><br /><br />
            <p>Don't have an account? <Link to="/signup" className='link'>Signup</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
