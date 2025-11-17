import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    const validateEmail = (em) => {
        // simple email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setShowAlert(false);
        setAlertMsg('');

        if (!validateEmail(email)) {
            setAlertMsg('કૃપયા સાચો ઈમેલ દાખલ કરો.');
            setShowAlert(true);
            return;
        }

        if (password.length < 6) {
            setAlertMsg('પાસવર્ડ ઓછામાં ઓછા 6 અಕ್ಷરોનો હોવો જોઈએ.');
            setShowAlert(true);
            return;
        }

        if (password !== confirm) {
            setAlertMsg('પાસવર્ડ અને કન્ફર્મ પાસવર્ડ મેળ ખાતા નથી.');
            setShowAlert(true);
            return;
        }

        try {
            setLoading(true);
            const resp = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password })
            });

            const data = await resp.json();
            setLoading(false);

            if (!resp.ok) {
                setAlertMsg(data.message || 'Signup નિષ્ફળ. ફરી પ્રયાસ કરો.');
                setShowAlert(true);
                return;
            }

            // success
            alert('Account created successfully. Please login.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            setLoading(false);
            setAlertMsg('Network error — ફરી પ્રયાસ કરો.');
            setShowAlert(true);
        }
    };

    return (
        <div className="containe shadow-lg">
            <div className="con">
                <div className="img-sec shadow-sm">
                    <div className="image shadow-lg"></div>
                </div>

                <div className="loginSec mt-3">
                    <h3 className="text-center">
                        <i className="bi bi-cart4 pb-5"></i> Swift Cart
                    </h3>
                    <h1>Welcome</h1>
                    <p>Create your account</p>
                    <br />

                    {showAlert && (
                        <div
                            className="alert alert-danger alert-dismissible fade show alerrMassage"
                            role="alert"
                        >
                            <strong>Oops!</strong> {alertMsg}
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowAlert(false)}
                            ></button>
                        </div>
                    )}

                    <form onSubmit={handleSignup}>
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="mb-2 mt-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            className="mb-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="mb-5"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                        />
                        <br />
                        <button type="submit" className="btnLog" disabled={loading}>
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>

                    <br />
                    <p>
                        Already have an account? <Link to="/login" className="link">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
