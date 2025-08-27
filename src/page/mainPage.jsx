import { NavLink, Outlet, /*useNavigate*/ } from 'react-router-dom';
/*import { getCurrentUser, logoutUser } from '../services/auth';*/
import '../styles/mainpage.css';

export default function MainPage() {
    /**
     * const user = getCurrentUser();
    const navigate = useNavigate();

    function handleLogout() {
        logoutUser();
        navigate('/login');
    }
     */

    return (
        <div className="app-layout">
            <main className="main-content">
                <Outlet />
            </main>
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li><NavLink to="/app/cash"><img src="../src/assets/cash.png" alt="Cash page icon" /></NavLink></li>
                        <li><NavLink to="/app/referrals"><img src="../src/assets/referrals.png" alt="Referrals icon" /></NavLink></li>
                        <li><NavLink to="/app/home"><img src="../src/assets/home.png" alt="Home page icon" /></NavLink></li>
                        <li><NavLink to="/app/history"><img src="../src/assets/history.png" alt="History icon" /></NavLink></li>
                        <li><NavLink to="/app/stats"><img src="../src/assets/menu-info.png" alt="Stats icon" /></NavLink></li>
                    </ul>
                </nav>
            </aside>
        </div>
    );
}