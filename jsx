import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import AddJobModal from "./AddJobModal"
import JobDetailModal from "./JobDetailModal"
import { DragDropContext,Droppable,Draggable } from "@hello-pangea/dnd"

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

    const onDragEnd = async (result) =>{
        const {destination, source, draggableId} = result
        if (!destination) return
        if (destination.droppableId === source.droppableId) return
        const {error} = await supabase
        .from('jobs')
        .update({status: destination.droppableId})
        .eq('id', draggableId)
        if (error) {
            console.error(error)
        }else{
            fetchJobs()
        }
    }

    return (
        <div className="min-h-screen" style={{background: '#0d0d0d'}}>
            <nav style={{background:'#1a1a1a', borderBottom: '0.5px solid #2c333a'}} className="px-6 py-4 flex justify-between items-center">
{/*                                              ↑ CHANGE: '0.5 solid' → '0.5px solid'          */}
                <h1 className="text-xl font-bold" style={{color:'#b6c2cf'}}>Job Tracker</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm" style={{color:'#8c9bab'}}>{session.user.email}</span>  
                    <button onClick={handleSignOut} className="text-sm px-3 py-1 rounded-lg" style={{color:'#f87171', border: '0.5px solid #6b2323'}}>
{/*                                                                                                          ↑ CHANGE: '0.5 solid' → '0.5px solid' */}
                        Sign Out
                    </button>
                </div>
            </nav>
            <main className="p-6">
                <div className="flex justify-end mb-4">
                    <button onClick={() => setShowModal(true)}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{background: '#378ADD', color:'white', border:'none'}}> 
                        + Add Job
                    </button>                  
                </div>
                
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-4 gap-3 items-start">
                        {COLUMNS.map(column => (
                            <Droppable droppableId={column} key={column}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps} className="rounded-xl p-3" style={{background: '#1a1a1a'}}>

                                        <div className="flex justify-between items-center mb-3">
{/*                                         ↑ CHANGE: replace old h2 with this dark styled version */}
                                            <h2 className="text-sm font-medium" style={{color: '#b6c2cf'}}>{column}</h2>
                                            <span className="text-xs px-2 py-1 rounded-full" style={{background: '#2c333a', color: '#8c9bab'}}>
                                                {jobs.filter(j => j.status === column).length}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                        {jobs
                                            .filter(j => j.status === column)
                                            .map((job, index) => (
{/*                                              ↑ CHANGE: .map(job => ( → .map((job, index) => ( */}
                                                <Draggable key={job.id} draggableId={job.id} index={index}>
{/*                                             ↑ ADD: Draggable wrapper */}
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
{/*                                                         ↑ ADD: ref */}
                                                            {...provided.draggableProps}
{/*                                                         ↑ ADD: draggableProps */}
                                                            {...provided.dragHandleProps}
{/*                                                         ↑ ADD: dragHandleProps */}
                                                            onClick={() => setSelectedJob(job)} 
                                                            className="rounded-lg p-3 cursor-pointer"
                                                            style={{background: '#2c333a', border: '0.5px solid #3d4b58', transition: 'all 0.15s', ...provided.draggableProps.style}}
{/*                                                                                                                                                   ↑ ADD: ...provided.draggableProps.style */}
                                                            onMouseEnter={e => e.currentTarget.style.background ='#374148'}
                                                            onMouseLeave={e => e.currentTarget.style.background = '#2c333a'}
                                                        >
                                                            <span className="text-xs px-2 py-1 rounded font-medium inline-block mb-2"
                                                            style={{
                                                                background: job.status === 'Applied' ? '#1d4ed8' : job.status === 'Interview' ? '#065f46' : job.status === 'Offer' ? '#14532d' : '#7f1d1d',
{/*                                                                                                                                                                              ↑ CHANGE: 'offer' → 'Offer' */}
                                                                color: job.status === 'Applied' ? '#93c5fd' : job.status === 'Interview' ? '#6ee7b7' : job.status === 'Offer' ? '#86efac' : '#fca5a5'
{/*                                                                                                                                                                           ↑ CHANGE: 'offer' → 'Offer' */}
                                                            }}>
                                                                {job.status}
                                                            </span>
                                                            <p className="text-sm font-medium" style={{color: '#b6c2cf'}}>{job.company}</p>
                                                            <p className="text-xs" style={{color: '#8c9bab'}}>{job.role}</p>
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {job.location && <span className="text-xs px-2 py-1 rounded" style={{background: '#1a1f23', color: '#8c9bab'}}>{job.location}</span>}
{/*                                                                                                          ↑ CHANGE: 'rouned' → 'rounded' */}
                                                                {job.salary && <span className="text-xs px-2 py-1 rounded" style={{background: '#1a1f23', color: '#8c9bab'}}>{job.salary}</span>}
                                                            </div>
                                                            <div className="flex justify-between items-center mt-2">
                                                                <span className="text-xs" style={{color: '#8c9bab'}}>{job.date_applied}</span>
                                                                {job.url && <a href={job.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className='text-xs' style={{color:'#378ADD'}}>View listing</a>}
                                                            </div>                               
                                                        </div>
                                                    )}
                                                </Draggable>
{/*                                             ↑ ADD: closing Draggable */}
                                            ))}
                                        </div>
                                        {provided.placeholder}
{/*                                     ↑ ADD: provided.placeholder */}
                                    </div>
                                )}
                            </Droppable>
{/*                         ↑ ADD: closing Droppable */}
                        ))}
                    </div>
                </DragDropContext>
{/*             ↑ MOVE: </DragDropContext> to here — was wrongly inside column loop */}
            </main>
            {showModal && (
                <AddJobModal
                    session={session}
                    onClose={() => setShowModal(false)}
                    onJobAdded={fetchJobs}
                />
            )}
            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                    onUpdated={fetchJobs}
                    onDeleted={fetchJobs}                          
                />
            )}
        </div>
    )
}

export default Board