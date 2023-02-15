import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [shots_left, setShotsLeft] = useState(10000)
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [shots, setShots] = useState('')
  const [formError, setFormError] = useState(null)
  const [newShots, setNewShots] = useState('0')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newShots) {
      setFormError('Please enter a valid number of shots')
      return
    } else if (newShots < 0) {
      setFormError('Please enter a positive number of shots')
      return
    }

    const { data, error } = await supabase.rpc('add_shots', {user_id: id, new_shots: newShots});
    //console.log({ data })

    // Not adding const together properly so using supabase function
    /*const { data, error } = await supabase
      .from('players')
      .update({ shots })
      .eq('id', id)
      .select()
    */

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
      }
    }

    fetchPlayer()

  }, [id, navigate])

  return (
    <div className="root">
      <nav>
        <h1>Add shots for {first_name} {last_name}</h1>
      </nav>
      <div className="page update">
        <form onSubmit={handleSubmit}>

          <p>{first_name} has {shots} shots so far, {shots_left} shots left to reach 10,000.</p>

          <div><br></br></div>
          <label htmlFor="shots"></label>
          <input 
            type="number"
            id="shots"
            value={ newShots }
            onChange={(e) => setNewShots(e.target.value)}
          />

          <button>Add Shots</button>

          <div><br></br></div>
          <p>Some shot types to work on include:</p>
          <li>Wrist shot from left foot</li>
          <li>Wrist shot from right foot</li>
          <li>Snap shot</li>
          <li>Slap shot</li>
          <li>Backhand shot</li>
          <li>Pass off rebounder for more variety!</li>

          {formError && <p className='error'>{formError}</p>}
        </form>
      </div>
    </div>
  )
}

export default Update