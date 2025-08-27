import { useState, useEffect, useRef, useCallback } from 'react';
import marioImg from './games/super-mario.png';
import wakatuffImg from './games/wakatuff.png';
import lastOfUsImg from './games/last-of-us.png';
import ratingImg from './games/rating-mario.png';
import filterIcon from './filter.png';

const gameListing = [
    { image: marioImg, title: 'Mario Bros Ultimate', rating: '4.5' },
    { image: wakatuffImg, title: 'Lengendary Wakatuff', rating: '4.2' },
    { image: lastOfUsImg, title: 'The Last of Us', rating: '4.8' }
];

export default function MostPlayed() {
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);

    const goTo = useCallback((i) => {
        setIndex((i + gameListing.length) % gameListing.length);
    }, []);

    const next = useCallback(() => goTo(index + 1), [index, goTo]);

    useEffect(() => {
        timerRef.current && clearTimeout(timerRef.current);
        timerRef.current = setTimeout(next, 4000); // auto-advance every 4s
        return () => clearTimeout(timerRef.current);
    }, [index, next]);

    return (
        <div className="most-played">
            <div className="most-played-header">
                <h2>Most Played Games</h2>
                <div className="search-category">
                    <p>Search by category</p>
                    <img src={filterIcon} alt="Filter" />
                </div>
            </div>

            <div className="carousel" role="region" aria-label="Most played games">
                <div className="slides" style={{ transform: `translateX(-${index * 100}%)` }}>
                    {gameListing.map((game, i) => (
                        <div
                            key={game.title}
                            className={"slide" + (i === index ? ' active' : '')}
                            aria-hidden={i !== index}
                        >
                            <div className="slide-bg">
                                <img src={game.image} alt={game.title} />
                            </div>
                            <div className="overlay-info">
                                <h3>{game.title}</h3>
                                <div className="rating">
                                    <img src={ratingImg} alt="Rating stars" />
                                    <span>{game.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="dots" role="tablist">
                    {gameListing.map((_, i) => (
                        <button
                            key={i}
                            className={"dot" + (i === index ? ' active' : '')}
                            onClick={() => goTo(i)}
                            aria-label={`Show slide ${i + 1}`}
                            aria-selected={i === index}
                            role="tab"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}