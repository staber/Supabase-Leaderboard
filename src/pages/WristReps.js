import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

import PlayerCard from "../components/PlayerCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [players, setPlayers] = useState(null)
  const [orderBy, setOrderBy] = useState('wrist_roller_reps')

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
      .from('players')
      .select()
      .order(orderBy, {ascending: (orderBy == 'wrist_roller_reps' ? false : true)})

      if (error) {
        setFetchError('Could not fetch player database')
        setPlayers(null)
        console.log(error)
      }
      if (data) {
        setPlayers(data)
        setFetchError(null)
      }
    }

    fetchPlayers()

  }, [orderBy])

  return (
    <div className="root">
      <nav>
        <h1>Wrist Roller Reps Leaderboard</h1>
      </nav>
      <div className="page home">
        <div className="order-by">
          <Link to="/">Shots</Link>
          <Link to="/rebounder">Rebounder</Link>
          <Link to="/wristreps">Wrist Roller</Link>
        </div>
        {fetchError && (<p>{fetchError}</p>)}
        {players && (
          <div className="players">
            <div className="player-list">
              {players.map(player => (
                <PlayerCard key={player.id} player={player} stat={'wrist'}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    
  )
}

export default Home