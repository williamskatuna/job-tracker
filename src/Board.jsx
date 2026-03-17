import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"

const COLUMNS = ['Applied', 'Interview', 'Offer', 'Rejected']


function Board({session}) {
    const[jobs, setJobs] = useState([])
    const [showModal, setShowModal] = useState(false)

    async function fetchJobs(){
    const {data, error} = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', session.user.id)
    
    console.log('url:', import.meta.env.VITE_SUPABASE_URL)
    console.log('key:', import.meta.env.VITE_SUPABASE_ANON_KEY)
    console.log('jobs data:', data)
    console.log('error:', error)

    if (error){
       
    } else {
        setJobs(data)
    }
}
    useEffect(() => {
        fetchJobs()
    }, [])


const handleSignOut = async () => {
    await supabase.auth.signOut()
}


    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Job Tracker</h1>
                <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{session.user.email}</span>
                <button onClick={handleSignOut} className="text-sm text-red-500 hover:text-red-700">
                    Sign Out
                </button>
                </div>
            </nav>
            <main  className="p-6">
                <div className="flex justify-end mb-4">
                <button onClick={() => setShowModal (true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"> 
                    + Add Job
                </button>
                    
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {COLUMNS.map(column => (
                    <div key={column} className="bg-white rounded-xl  shadow p-4">
                        <h2 className="font-semibold text-gray-700 mb-3">
                        {column}
                        <span className="ml-2 text-sm text-gray-400">
                            ({jobs.filter(j=> j.status === column).length})
                        </span>
                        </h2>
                        <div className="flex flex-col gap-2">
                        {jobs
                        
                        .filter(j => j.status === column)
                        .map(job => (
                        <div key={job.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <p className="font-medium text-gray-800">{job.company}</p>
                            <p className="text-sm text-gray-500">{job.role}</p>
                            <p className="text-xs text-gray-400 mt-1">{job.date_applied}</p>
                        </div>                                   
                        ))}
                        </div>
                    </div>
                    )
                    )}
                </div>
            </main>
        </div>
    )
}

export default Board



