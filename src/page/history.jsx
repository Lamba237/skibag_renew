import UserInfo from '../component/home/user-info.jsx';
import CheckHistory from '../component/history/check-history.jsx';
import '../styles/history.css';

export default function History() {
    return (
        <div className="history-container">
            <UserInfo />
            <CheckHistory />
        </div>
    )
}