import { Link } from 'react-router-dom'

const PlayerCard = ({ player, stat }) => {
    return (
        <div className="player-card">
            <Link to={'/' + player.id}>
                <img className='avatar' src={player.avatar} alt="" />
            </Link>
            <Link to={'/' + player.id}>
                <h3 className='name'>{player.first} {player.last}</h3>
            </Link>
            <p className='number'>#{player.number}</p>
            <div className="stat">
                <Link to={'/' + player.id}>
                    {stat == 'shots' ? player.shots : (stat == 'wrist' ? player.wrist_roller_reps : player.rebounder_mins)}
                </Link>
            </div>
        </div>
    )
}

export default PlayerCard