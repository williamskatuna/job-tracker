import { supabase } from './supabaseClient'

function Login() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-10 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Tracker</h1>
        <p className="text-gray-500 text-sm">Track your job applications in one place</p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login