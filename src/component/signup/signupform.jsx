import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, passwordStrength } from '../../services/auth';
import googleLogo from '../../assets/login/google.png';
import facebookLogo from '../../assets/login/facebook.png';
import instagramLogo from '../../assets/login/instagram.png';

export default function SignupForm() {
    // Local component state for form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const { label: strengthLabel, score } = passwordStrength(password);

    function validate() {
        if (!username.trim()) return 'Username is required';
        if (!/^[\w.-]{3,}$/.test(username)) return 'Username must be at least 3 chars (letters, numbers, _ . -)';
        if (!email.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (password !== confirmPassword) return 'Passwords do not match';
        return null;
    }

    function clearForm() {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccess('');
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setSubmitting(true);
        try {
            const user = registerUser({ username, email, password });
            setSuccess(`Account created for ${user.username}. Redirecting to login...`);
            clearForm();
            // Short delay so user sees success message before redirect
            setTimeout(() => navigate('/login'), 1100);
        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="signup-form-container">
            <div className="signup-form-header">
                <h1>Signup</h1>
                <p>Create an account so as to start earning money</p>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="username-label signup-label">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="email-label signup-label">
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

                    <div className="password-label signup-label">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <small style={{ color: score >= 3 ? 'lightgreen' : 'orange' }}>Strength: {strengthLabel}</small>
                    </div>

                    <div className="password-label signup-label">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>

                    {error && <p style={{ color: 'salmon', textAlign: 'center' }}>{error}</p>}
                    {success && <p style={{ color: 'lightgreen', textAlign: 'center' }}>{success}</p>}

                    <button className="signup-btn" type="submit" disabled={submitting}>
                        {submitting ? 'Creating...' : 'Signup'}
                    </button>

                    <p className="align-center">Or</p>

                    <div className="social-signup">
                        <img src={googleLogo} alt="Signup with Google" />
                        <img src={facebookLogo} alt="Signup with Facebook" />
                        <img src={instagramLogo} alt="Signup with Instagram" />
                    </div>

                </form>
            </div>
        </div>
    );
}