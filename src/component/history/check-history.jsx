import userHead from './img/user-head.png';
import Rank from './img/Ranked.png';
import Notes from './img/Notes.png';
import userHead1 from './img/user-head1.png';
import { useState } from 'react';


const Gplayed = [
    {
        playerHead: userHead,
        userName: "Sandra Monroy",
        userRank: Rank,
        country: "Cameroon",
        profit: "+500"
    },
    {
        playerHead: userHead1,
        userName: "John Doe",
        userRank: Rank,
        country: "China"
    },
    {
        playerHead: userHead,
        userName: "Alice Smith",
        userRank: Rank,
        country: "USA",
        profit: "-1000"
    },
    {
        playerHead: userHead1,
        userName: "Bob Johnson",
        userRank: Rank,
        country: "UK"
    },
    {
        playerHead: userHead,
        userName: "Charlie Brown",
        userRank: Rank,
        country: "Canada",
        profit: "+250"
    },
    {
        playerHead: userHead1,
        userName: "Diana Prince",
        userRank: Rank,
        country: "France"
    },
    {
        playerHead: userHead,
        userName: "Ethan Hunt",
        userRank: Rank,
        country: "Germany",
        profit: "+750"
    },
    {
        playerHead: userHead1,
        userName: "Fiona Gallagher",
        userRank: Rank,
        country: "Ireland"
    },
    {
        playerHead: userHead,
        userName: "George Martin",
        userRank: Rank,
        country: "Spain",
        profit: "-300"
    },
    {
        playerHead: userHead1,
        userName: "Hannah Baker",
        userRank: Rank,
        country: "Italy"
    },
    {
        playerHead: userHead,
        userName: "Ian Somerhalder",
        userRank: Rank,
        country: "Australia",
        profit: "+600"
    },
    {
        playerHead: userHead1,
        userName: "Jenna Fischer",
        userRank: Rank,
        country: "New Zealand"
    }
];

// Create pairs for the contest view
const ContestHistory = [];
for (let i = 0; i < Gplayed.length; i += 2) {
    const playerA = Gplayed[i];
    const playerB = Gplayed[i + 1];
    if (playerA && playerB) {
        ContestHistory.push({
            id: i / 2,
            playerA: {
                avatar: playerA.playerHead,
                name: playerA.userName,
                rank: playerA.userRank,
                country: playerA.country,
            },
            playerB: {
                avatar: playerB.playerHead,
                name: playerB.userName,
                rank: playerB.userRank,
                country: playerB.country,
            },
            outcome: {
                // Assuming playerA's profit is the outcome for the match
                score: playerA.profit || '0', 
            }
        });
    }
}


export default function CheckHistory() {
    const [activeTab, setActiveTab] = useState('games');
    return (
        <div className="check-history-container">
            <div className="check-history-header">
                <h3>Check History</h3>
                <div className="select-date">
                    <p>Select by date</p>
                    <select>
                        <option value="last-week">Last Week</option>
                        <option value="one-month-ago">One month ago</option>
                        <option value="three-month-ago">Three month ago</option>
                    </select>
                </div>
            </div>
            <div className="filter-options">
                <button 
                    className={`btn-option grey-btn${activeTab === 'games' ? ' active' : ''}`}
                    onClick={() => setActiveTab('games')}
                >
                Games Played
                </button>
                <button 
                    className={`btn-option grey-btn${activeTab === 'transactions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('transactions')}
                    >Last Transactions</button>
                <button 
                    className={`btn-option grey-btn${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                    >
                    Notifications</button>
            </div>

            {/*Conditionally render content based on activeTab*/}
            {activeTab === 'games' && (
                <div className="contest-history-list">
                    {ContestHistory.map((contest) => (
                        <div key={contest.id} className="contest-item">
                            <div className="contest-player important">
                                <img src={contest.playerA.avatar} alt={contest.playerA.name} className="player-avatar" />
                                <div className="player-details">
                                    <span className="player-name">{contest.playerA.name}</span>
                                    <div className="country-rank">
                                        <img src={contest.playerA.rank} alt="Rank" className="player-rank-icon" />
                                        <span>{contest.playerA.country}</span>
                                    </div>
                                    <div className={`score ${contest.outcome.score.startsWith('+') ? 'positive' : 'negative'}`}>
                                        {contest.outcome.score}
                                    </div>
                                </div>
                            </div>
                            <div className="outcome">
                                <div className={`score fx ${contest.outcome.score.startsWith('+') ? 'positive' : 'negative'}`}>
                                    {contest.outcome.score.startsWith('+') ? <p>win</p> : <p>Loss</p>}
                                </div>
                                <p>05 : 22</p>
                                <p className="fx-small">3:00:00</p>
                            </div>

                            <div className="contest-player">
                                <div className="player-details">
                                    <p className="player-name">{contest.playerB.name}</p>
                                    <div className="country-rank">
                                        <img src={contest.playerB.rank} alt="Rank" className="player-rank-icon" />
                                        <span>{contest.playerB.country}</span>
                                    </div>
                                </div>
                                <img src={contest.playerB.avatar} alt={contest.playerB.name} className="player-avatar" />
                               
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {activeTab === 'transactions' && (
                <div className="transactions-list">
                    <img src={Notes} alt="Transaction icons" />
                    <p>No transactions available.</p>
                </div>
            )}
            {activeTab === 'notifications' && (
                <div className="notifications-list">
                    <img src={Notes} alt="Notifications Icon" />
                    <p>No Notifications found !</p>
                </div>
            )}

        </div>
    )
}