import { getCurrentUser } from '../../services/auth';
import userHead from './user-head.png';
import rankedIcon from './Ranked.png';

// Simple pill badge showing points / rank placeholder
function PointsBadge({ points = 15000 }) {
    const formatted = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(points);
    return (
        <div className="points-badge" aria-label={`${formatted} points`}>
            <span className="points-number">{formatted}</span>
            <span className="points-plus">+</span>
        </div>
    );
}

export default function UserInfo() {
    const user = getCurrentUser();
    return (
        <div className="user-info">
            <div className="user-info-header">
                <img src={userHead} alt="User profile" />
                <div className="user-info-details">
                    <h2>{user ? user.username : 'Guest'}</h2>
                    <div className="country">
                        <img src={rankedIcon} alt="Ranked icon" />
                        <span>Cameroon</span>
                    </div>
                </div>
                <PointsBadge />
            </div>
        </div>
    );
}