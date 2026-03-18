import { useState } from "react";
import { supabase } from "./supabaseClient";

function JobDetailModal({job,onClose, onUpdated,onDeleted}) {
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
        notes
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Job Details</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">X</button>
            </div>

            <input value={company} onChange={e=> setCompany(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-3" placeholder="Company"/>
            <input value={role} onChange={e => setRole(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-3" placeholder="Role"/>

            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-3">
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
            </select>

            <input type="date" value={dateApplied} onChange={e => setDateApplied(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-3"/>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4" placeholder="Notes"/>

                <div className="flex justify-between items-center">
                    { confirmDelete ? (
                        <div className="flex gap-2">
                            <span className="text-sm text-gray-500">Are You Sure?</span>
                            <button onClick={handleDelete} className="text-red-600 text-sm font-medium">Yes delete</button>
                            <button onClick={() => setConfirmDelete(false)} className="text-gray-500 text-sm">Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => setConfirmDelete(true)} className="text-red-500 text-sm hover:text-red-700">Delete</button>
                    )}
                    <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save</button>


                </div>

            
        </div>
    </div>
    )
}

export default JobDetailModal









