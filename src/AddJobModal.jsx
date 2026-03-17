import {useState} from 'react';
import { supabase } from './supabaseClient';

function AddJobModal({session, onClose, onJobAdded}){
    const[company, setCompany] = useState('')
    const[role, setRole] = useState('')
    const[status, setStatus] = useState('applied')
    const[dateApplied, setDateApplied] = useState('')
    const [notes, setNotes] = useState('')

    const handleSubmit = async () => {
        const{error} = await supabase
        .from('jobs')
        .insert({
            company,
            role,
            status,
            date_applied: dateApplied,
            notes,
            user_id:session.user.id
        })

        if(error){
            console.error(error)
        }else{
            onJobAdded()
            onClose()
        }
   }

    return(
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white rounded-xl p-6 w-full max-w-md'>
                <h2 className='text-lg font-bold mb-4'>Add Job</h2>
                <input placeholder='company' value={role} onChange={e => setCompany(e.target.value)} className='w-full border rounded-lg px-3 py-2 mb-3'/>
                <input placeholder='Role' value={company} onChange={e => setRole(e.target.value)} className='w-full border rounded-lg px-3 py-2 mb-3'/>
                <select value={status} onChange={e => setStatus(e.target.value)}className='w-full border rounded-lg px-3 py-2 mb-3'>
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                </select>
                <input type="date" value={dateApplied} onChange={e => setDateApplied (e.target.value)} className='w-full border rounded-lg px-3 py-2 mb-3'/>
                <textarea placeholder='Notes' value={notes} onChange={e => setNotes(e.target.value)} className='w-full border rounded-lg px-3 py-2 mb-4 '/>
                <div className='flex justify-end gap-3'>
                    <button onClick={onClose} className='px-4 py-2 text-gray-500 hover:text-gray-700'>Cancel</button>
                    <button onClick={handleSubmit} className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>Save</button>              
                </div>           
            </div>
        </div>
    )
}

export default AddJobModal





















