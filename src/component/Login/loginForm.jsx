import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth';
import googleLogo from '../../assets/login/google.png';
import facebookLogo from '../../assets/login/facebook.png';
import instagramLogo from '../../assets/login/instagram.png';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            loginUser({ email, password });
            navigate('/app');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-form-container">
            <div className="login-header">
                <h1>Login</h1>
                <p>Welcome back user! please login to your account</p>
            </div>

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="email-label label">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="password-label label">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <p>Forgot Password</p>
                </div>

                {error && <p style={{ color: 'salmon', textAlign: 'center' }}>{error}</p>}

                <button className="login-btn" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p>Or</p>

                <div className="social-login">
                    <img src={googleLogo} alt="Login with Google" />
                    <img src={facebookLogo} alt="Login with Facebook" />
                    <img src={instagramLogo} alt="Login with Instagram" />
                </div>

            </form>
        </div>
    )
}