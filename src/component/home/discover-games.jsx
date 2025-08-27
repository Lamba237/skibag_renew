import gameImage1 from './discover-games/game1.png';
import gameImage2 from './discover-games/game3.png';
import gameImage3 from './discover-games/game2.png';
import ratingImg from './games/rating-mario.png';


const discoverGames = [
    {
        image: gameImage1,
        title: "Far Cry way home 2",
        rating: "4.5",
    },
    {
        image: gameImage2,
        title: "Legendary Wakatuff",
        rating: "4.2",
    },
    {
        image: gameImage3,
        title: "Adventure of Dofuss",
        rating: "4.3"
    },
];

export default function DiscoverGames() {
    return (
        <div className="discover-games-container">
            <div className="discover-games-header">
                <h2>Discover More</h2>
                <img src="../src/component/home/notification.png" alt="Notification Icon" />
            </div>

            <div className="games-grid">
                {discoverGames.map((game) => (
                    <div className="grid-items">
                        <img src={game.image} alt={game.title} />
                        <div className="grid-text-item">
                            <h2>{game.title}</h2>
                            <div className="rating">
                                <img src={ratingImg} alt="Rating stars" />
                                <span>{game.rating}</span>
                            </div>
                        </div>

                        <button className="play-now-btn">Play Now</button>
                    </div>
                ))}
            </div>
        </div>
    )
}