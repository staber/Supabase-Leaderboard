import { Link } from 'react-router-dom'

const PlayerCard = ({ player, stat }) => {
    return (
        <div className="player-card">
            <img className='avatar' src={player.avatar} alt="" />
            <h3 className='name'>{player.first} {player.last}</h3>
            <p className='number'>#{player.number}</p>
            <div className="stat">
                <Link to={'/' + player.id}>
                    {stat == 'shots' ? player.shots : (stat == 'wrist' ? player.wrist_roller_reps : player.rebounder_hours)}
                </Link>
            </div>
        </div>
    )
}

export default PlayerCard