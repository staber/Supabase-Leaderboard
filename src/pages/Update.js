import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [formError, setFormError] = useState(null)

  const [shots, setShots] = useState('')
  const [newShots, setNewShots] = useState('0')
  const [shots_left, setShotsLeft] = useState(10000)

  const [rebound, setRebound] = useState('')
  const [newRebound, setNewRebound] = useState('0')
  const [rebounds_left, setReboundsLeft] = useState(75)

  const [wristReps, setWristReps] = useState('')
  const [newWristReps, setNewWristReps] = useState('0')
  const [wrist_roller_left, setWristRollerLeft] = useState(1000)


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newShots) {
      setFormError('Please enter a valid number of shots')
      return
    } else if (newShots < 0) {
      setFormError('Please enter a positive number of shots')
      return
    }
    if (!newRebound) {
      setFormError('Please enter a valid number of rebounder hours')
      return
    } else if (newRebound < 0) {
      setFormError('Please enter a positive number of rebounder hours')
      return
    }
    if (!newWristReps) {
      setFormError('Please enter a valid number of wrist roller reps')
      return
    } else if (newWristReps < 0) {
      setFormError('Please enter a positive number of wrist roller reps')
      return
    }

    const { data, error } = await supabase.rpc('add_stats', {user_id: id, new_shots: newShots, new_wrist: newWristReps, new_rebound: newRebound});

    if (error) {
      console.log(error)
      setFormError('Error submitting data')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }

  }

  useEffect(() => {
    const fetchPlayer = async() => {
      const { data, error } = await supabase
        .from('players')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', {replace: true})
      }
      if (data) {
        setFirstName(data.first)
        setLastName(data.last)
        setShots(data.shots)
        setNewShots('0')
        setShotsLeft(10000-data.shots)
        setRebound(data.rebounder_hours)
        setNewRebound('0')
        setReboundsLeft(75-data.rebounder_hours)
        setWristReps(data.wrist_roller_reps)
        setNewWristReps('0')
        setWristRollerLeft(1000-data.wrist_roller_reps)
      }
    }

    fetchPlayer()

  }, [id, navigate])

  return (
    <div className="root">
      <nav>
        <h1>{first_name} {last_name}</h1>
      </nav>
      <div className="page update">
        <form onSubmit={handleSubmit}>

          <h3>Shots</h3>
          <label htmlFor="shots"></label>
          <input 
            type="number"
            id="shots"
            value={ newShots }
            onChange={(e) => setNewShots(e.target.value)}
          />
          <p>{first_name} has {shots} shots so far, {shots_left} shots left to reach 10,000.</p>

          <div><br></br></div>
          <h3>Wrist Roller Reps</h3>
          <label htmlFor="wrist"></label>
          <input 
            type="number"
            id="wrist"
            value={ newWristReps }
            onChange={(f) => setNewWristReps(f.target.value)}
          />
          <p>{first_name} has {wristReps} wrist roller reps so far, {wrist_roller_left} reps left to reach 1,000.</p>

          <div><br></br></div>
          <h3>Rebounder Hours</h3>
          <label htmlFor="rebounder"></label>
          <input 
            type="number"
            id="rebound"
            value={ newRebound }
            onChange={(g) => setNewRebound(g.target.value)}
          />
          <p>{first_name} has {rebound} rebouder hours so far, {rebounds_left} hours left to reach 75.</p>

          <div><br></br></div>
          <button>Add Stats</button>

          {formError && <p className='error'>{formError}</p>}

          <div><br></br></div>
          <div><br></br></div>
          <p>Some shot types to work on include:</p>
          <li>Wrist shot from left foot</li>
          <li>Wrist shot from right foot</li>
          <li>Snap shot</li>
          <li>Slap shot</li>
          <li>Backhand shot</li>
          <li>Pass off rebounder for more variety!</li>
        </form>
      </div>
    </div>
  )
}

export default Update