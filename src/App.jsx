import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './Login'
import Board from './Board'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!session) {
    return <Login />
  }

  return <Board session={session}/>

}

export default App