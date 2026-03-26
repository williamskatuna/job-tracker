import { useState } from "react";
import { supabase } from "./supabaseClient";

function JobDetailModal({job,onClose, onUpdated,onDeleted}) {

    const[url, setUrl] = useState(job.url || '')
    const[location, setLocation] =useState(job.location || '')
    const[salary,setSalary] = useState(job.salary || '')
    const[contactName, setContactName] =useState(job.contact_name || '')
    const[company, setCompany] = useState(job.company)
    const[role, setRole] = useState(job.role)
    const[status,setStatus] = useState(job.status)
    const[dateApplied, setDateApplied] = useState(job.date_applied)
    const[notes, setNotes] = useState(job.notes)
    const[confirmDelete, setConfirmDelete] = useState(false)


const handleUpdate = async () =>{
    const {error} = await supabase
    .from('jobs')
    .update({
        company,
        role,
        status,
        date_applied: dateApplied,
        notes, 
        url,
        location,
        salary,
        contact_name: contactName
    })
    
    

    .eq('id', job.id)

    if (error){

        console.error(error)
    } else {
        onUpdated()
        onClose()
        
    }
    }

const handleDelete = async () => {
    const {error} = await supabase
    .from('jobs')
    .delete()
    .eq('id', job.id)

    if (error) {
        console.error(error)
    } else {
        onDeleted()
        onClose()
    
    }
    }






return (
    <div className="fixed inset-0 flex items-center justify-center" style={{background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'}}>
        <div className="rounded-xl w-full max-w-lg overflow-hidden mx-4" style={{background: '#22272b'}}>
            <div style={{background: '#1d6fa4', height: '5px'}}></div>
            <div className="p-6">
                
            <div className="flex justify-between items-start mb-4">
                <div>

                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-medium" style={{color: '#b6c2cf'}}>{company}</span>
                        <span className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                            background: status === 'Applied' ? '#1d4ed8' : status === 'Interview' ? '#065f46' : status === 'Offer' ? '#14532d': '#7f1d1d',
                            color: status === 'Applied' ? '#93c5fd' : status === 'Interview' ? '#6ee7b7' : status === 'Offer' ? '#86efac' : '#fca5a5'
                        }}>
                        {status}
                        </span>
            </div>
                    <p className="text-sm" style={{color: '#8c9bab'}}>{role}</p>
                </div>
                    <div>
                <button onClick={onClose} style={{background: 'none', border: 'none', color: '#8c9bab', fontSize: '18px', cursor: 'pointer'}}>✕</button>
                </div>
                </div>

                <div className="rounded-lg p-3 mb-4" style={{background: '#2c333a', border: '0.5px solid #3d4b58'}}>
                    <p className="text-xs mb-2" style={{color: '#8c9bab', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Job listing preview</p>
                    <div className="rounded flex items-center justify-center mb-2" style={{background: '#1a1f23', height: '60px'}}>
                        {url ? <a href={url} target="_blank" rel="noreferrer" className="text-sm" style={{color: '#378ADD'}}>Open listing ↗</a> : <span className="text-sm" style={{color: '#8c9bab'}}> URL preview loads here</span>}
                    </div>
                    <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste job listing URL..."
                    className="w-full rounded-lg px-3 py-2"
                    style={{background: '#1a1f23', border: '0.5px solid #3d4b58', color: '#b6c2cf'}} />

                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                    <label className="text-xs mb-1 block" style={{color: '#8c9bab', textTransform:'uppercase', letterSpacing: '0.05em'}}>Company</label>
                    <input value={company} onChange={e => setCompany(e.target.value)} 
                    className="w-full rounded-lg px-3 py-2"
                    style={{background: '#2c333a', border: '0.5px solid #3d4b58', color: '#b6c2cf'}}/>
                </div>
                <div>
                    <label className="text-xs mb-1 block" style={{color: '#8c9bab', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Role</label>
                    <input value={role} onChange={e => setRole(e.target.value)}
                    className="w-full rounded-lg px-3 py-2"
                    style={{background: '#2c333a', border: '0.05px solid #3d3b58', color:'#b6c2cf'}}/>
                </div>
                </div>

                 <div className="mb-4">
                    <div>
                        <label className="text-xs mb-1 block" style={{color: '#8c9bab', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Status</label>
                        <select value={status} onChange={e => setStatus(e.target.value)}
                            className="w-full rounded-lg px-3 py-2"
                            style={{background:'#2c333a', border: '0.5px solid #3d4b58', color:'#b6c2cf'}}>
                                <option>Applied</option>
                                <option>Interview</option>
                                <option>Offer</option>
                                <option>Rejected</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs mb-1 block" style={{color: '#8c9bab', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Date applied</label>
                        <input type="date" value={dateApplied} onChange={e => setDateApplied(e.target.value)}
                        className="w-full rounded-lg px-3 py-2"
                        style={{background: '#2c333a', border: '0.5px solid #3d4b58', color: '#b6c2cf'}}/>
                    </div>
                    </div>

                        <div className="grid grid-cols-3 gap-3 mb-3">
                        
                        <div>
                        <label className="text-xs mb-1 block" style={{color: '#8c9bab', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Location</label>
                        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Remote / London"
                        className="w-full rounded-lg px-3 py-2"
                        style={{background: '#2c333a', border: '0.5px solid #3d4b58', color: '#b6c2cf'}}/>
                        </div>

                        <div>
                        <label className="text-xs mb-1 block" style={{color: '#8c9bab', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Salary</label>
                        <input value={salary} onChange={e => setSalary(e.target.value)} placeholder="£50k-£70k..."
                        className="w-full rounded-lg px-3 py-2"
                        style={{background: '#2c333a', border: '0.5px solid #3d4b58', color: '#b6c2cf'}}/>
                        </div>

                        <div className="mb-4">
                        <label className="text-xs mb-1 block" style={{color: '#8c9bab', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Contact</label>
                        <input value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Recruiter name..."
                        className="w-full rounded-lg px-3 py-2"
                        style={{background: '#2c333a', border: '0.5px solid #3d4b58', color: '#b6c2cf'}}/>
                        </div>
                        </div>

                        <div className="mb-4">
                        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes..." 
                        rows={5}
                        className="w-full rounded-lg px-3 py-2"
                        style={{background: '#2c333a', border:'0.5px solid #3d4b58', color: '#b6c2cf', resize: 'none'}}/>
                        </div>

                           <div className="flex justify-between items-center">
                    { confirmDelete ? (
                        <div className="flex gap-2">
                            <span className="text-sm text-gray-500">Are You Sure?</span>
                            <button onClick={handleDelete} className="text-red-600 text-sm font-medium" style={{cursor: 'pointer'}}>Yes delete</button>
                            <button onClick={() => setConfirmDelete(false)} className="text-gray-500 text-sm">Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => setConfirmDelete(true)} className="text-red-500 text-sm hover:text-red-700" style={{cursor: 'pointer'}}>Delete</button>
                    )}
                    <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save</button>

            </div>
            
                 </div>
                 
                        

            

          
              
           

               

                </div>

            
        </div>
    

    )
}

export default JobDetailModal









