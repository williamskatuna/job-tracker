import {useState} from 'react';
import { supabase } from './supabaseClient';

function AddJobModal({session, onClose, onJobAdded}){
    const[company, setCompany] = useState('')
    const[role, setRole] = useState('')
    const[status, setStatus] = useState('Applied')
    const[dateApplied, setDateApplied] = useState('')
    const [notes, setNotes] = useState('')

    const inputStyle = {
    background: '#2c333a',
    border: '0.5px solid #3d4b58',
    color: '#b6c2cf'
}

const labelStyle = {
    color: '#8c9bab',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
}

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
        <div className='fixed inset-0 flex items-center justify-center'
            style={{background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'}}>

                <div className='rounded-xl w-full max-w-lg overflow-hidden mx-4'
                style={{background: '#22272b'}}>

                    <div style={{background: '#1d6fa4', height: '5px'}}></div>

                    <div className='p-6'>
                        <div className='flex justify-between items-center mb-5'>
                            <h2 className='text-base font-medium' style={{color:'#b6c2cf' }}>Add Job</h2>
                            <button onClick={onClose}
                            style={{background: 'none', border: 'none', color: '#8c9bab', fontSize: '18px', cursor: 'pointer' }}>
                                ✕
                            </button>
                        </div>

                        <div className='grid grid-cols-2 gap-3 mb-3'>

                            <div>
                                <label className='text-xs mb-1 block' style={labelStyle}>Company</label>
                                <input value={company} onChange={e => setCompany(e.target.value)} 
                                placeholder='e.g. Acme Corp'
                                className='w-full rounded-lg px-3 py-2'
                                style={inputStyle}/>                                
                            </div>

                            <div>
                                <label className='text-xs mb-1 block' style={labelStyle}>Role</label>
                                <input value={role} onChange={e => setRole(e.target.value)}
                                placeholder='e.g. Frontend Dev' 
                                className='w-full rounded-lg px-3 py-2'
                                style={inputStyle}/>                              
                            </div>

                            </div>

                             <div className='grid grid-cols-2 gap-3 mb-3'>
                                <div className='mb-3'>
                                    <label className='text-xs mb-1 block' style={labelStyle}>Status</label>
                                    <select value={status} onChange={e => setStatus(e.target.value)}
                                        className='w-full rounded-lg px-3 py-2'
                                        style={inputStyle}>
                                            <option>Applied</option>
                                            <option>Interview</option>
                                            <option>Offer</option>
                                            <option>Rejected</option>                                       
                                    </select>
                                </div>

                                <div>
                                    <label className='text-xs mb-1 block' style={labelStyle}>Date Applied</label>
                                    <input type="date" value={dateApplied} onChange={e => setDateApplied(e.target.value)} 
                                    className='w-full rounded-lg px-3 py-2'
                                    style={inputStyle}/>
                                </div>
                                
                            

                            <div className='mb-5'>
                                <label className='text-xs mb-1 block ' style={labelStyle}>Notes</label>
                                <textarea value={notes} onChange={e => setNotes(e.target.value)}
                                    placeholder='Notes...'
                                    rows={4}
                                    className='w-full rounded-lg px-3 py-2'
                                    style={{...inputStyle, resize: 'none'}}/>
                            </div>
                            
                            <div className='flex justify-end gap-3'>
                                <button onClick={onClose}
                                className='px-4 py-2 text-sm rounded-lg'
                                style={{color: '#8c9bab', cursor: 'pointer'}}>
                                    Cancel
                                </button>
                                <button onClick={handleSubmit}
                                className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm'
                                style={{cursor: 'pointer'}}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>            
    )
}

export default AddJobModal





















