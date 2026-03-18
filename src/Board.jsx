import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import AddJobModal from "./AddJobModal"
import JobDetailModal from "./JobDetailModal"

const COLUMNS = ['Applied', 'Interview', 'Offer', 'Rejected']


function Board({session}) {
    const[jobs, setJobs] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedJob, setSelectedJob] = useState(null)

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
        <div className="min-h-screen style=" style={{background: '#0d0d0d'}}>
            <nav style={{background:'#1a1a1a', borderBottom: '0.5 solid #2c333a'}} className="px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold" style={{color:'#b6c2cf'}}>Job Tracker</h1>
                <div className="flex items-center gap-4">
                <span className="text-sm" style={{color:'#8c9bab'}}> {session.user.email}</span>  
                <button onClick={handleSignOut} className="text-sm px-3 py-1 rounded-lg" style={{color:'#f87171', border: '0.5 solid #6b2323'}}>
                    Sign Out
                </button>
                </div>
            </nav>
            <main  className="p-6">
                <div className="flex justify-end mb-4">
                <button onClick={() => setShowModal (true)}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{background: '#378add', color:'white', border:'none'}}> 
                    + Add Job
                </button>                  
                </div>

                <div className="grid grid-cols-4 gap-3 items-start">
                    {COLUMNS.map(column => (
                    <div key={column} className="rounded-xl p-3" style={{background: '#1a1a1a'}}>
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
                        <div key={job.id} onClick={() => setSelectedJob(job)} 
                        className="rounded-lg p-3 cursor-pointer"
                        style={{background: '#2c333a', border: '0.5px solid #3d4b58', transition: 'all 0.15s'}}
                        onMouseEnter={e => e.currentTarget.style.background ='#374148'}
                        onMouseLeave={e => e.currentTarget.style.background = '#2c333a'}
                        >
                            <span className="text-xs px-2 py-1 rounded font-medium inline-block mb-2"
                            style={{
                                background: job.status === 'Applied' ? '#1d4ed8' : job.status === 'Interview' ? '#065f46' : job.status === 'offer' ? '#14532d' : '#7f1d1d',
                                color: job.status === 'Applied' ? '#93c5fd' : job.status === 'Interview' ? '#6ee7b7' : job.status === 'offer' ? '#86efac' : '#fca5a5'

                            }}>
                                {job.status}
                            </span>
                            <p className="text-sm font-medium" style={{color: '#b6c2cf'}}>{job.company}</p>
                            <p className="text-xs" style={{color: '#8c9bab'}}>{job.role}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {job.location && <span className="text-xs px-2 py-1 rouned" style={{background: '#1a1f23', color: '#8c9bab'}}>{job.location}</span>}
                                {job.salary && <span className="text-xs px-2 py-1 rounded" style={{background: '#1a1f23', color: '#8c9bab'}}>{job.salary}</span>}
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs" style={{color: '#8c9bab'}}>{job.date_applied}</span>
                                {job.url && <a href={job.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className='text-xs' style={{color:'#378ADD'}}>View listing </a>}
                            </div>
                                                      
                        </div>                                   
                        ))}
                        </div>
                    </div>
                    )
                    )}
                </div>
            </main>
            {showModal && (
                <AddJobModal
                session={session}
                onClose={() => setShowModal(false)}
                onJobAdded={fetchJobs}


                />
            )}
            { selectedJob && (
                <JobDetailModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
                onUpdated={fetchJobs}
                onDeleted={fetchJobs}                          
                />



            )


            }
            


        </div>
    )
}

export default Board



