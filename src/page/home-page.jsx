import UserInfo from '../component/home/user-info.jsx';
import MostPlayed from '../component/home/most_played.jsx';
import '../styles/home.css';
import DiscoverGames from '../component/home/discover-games.jsx';

export default function HomePage() {
    return (
        <div className="home-container">
            <UserInfo />
            <MostPlayed />
            <DiscoverGames />
        </div>
    )
}