import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Users = () => {
    const [user, setUser] = useState([]); 
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:8001/'); 
                
                setUser(res.data);
            } catch (err) {
                console.error(err); 
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>; 
    if (error) return <div>Error: {error.message}</div>;

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8001/deleteUser/${id}`);
            window.location.reload();
        } catch(err) {console.log(err);}
    }

    return (
        <>
        <div className="overflow-x-auto">
            <div className="p-4 sticky top-0 z-50 ">
                <Link to='/addUser' className='btn btn-info'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Add
                </Link>
            </div>
        
            <h1 className='text-xl text-center'>Basic Crud Operations Using MVC Architecture</h1>
            <div className="p-16">
                <table className="table">
                        <thead className='text-center'>
                            <tr>
                                <th className='text-lg'>First Name</th>
                                <th className='text-lg'>Last Name</th>
                                <th className='text-lg'>Age</th>
                                <th className='text-lg'>Email</th>
                                <th className='text-lg'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.fName}</td>
                                        <td>{data.lName}</td>
                                        <td>{data.age}</td>
                                        <td>{data.email}</td>
                                        <td className='grid gap-1'>
                                            <Link to={`updateUser/${data.id}`} className="btn btn-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>

                                                Edit
                                            </Link>
                                            <button className="btn btn-error" onClick={openModal}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                               
                                                Delete
                                            </button>

                                            {isOpen && (
                                                <dialog className="modal" open>
                                                    <div className="modal-box">
                                                        <h3 className="font-bold text-lg inline-flex items-center">Warning
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2" >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                            </svg>
                                                        </h3>
                                                        <p className="py-4">Are you sure you want to delete this Data?</p>
                                                        <div className="modal-action">
                                                            <form method="dialog" className="flex gap-x-2">
                                                                <button type="button" className='btn' onClick={closeModal}>No</button>
                                                                <button type="button" className="btn btn-error" onClick={ e => handleDelete(data.id)}>Yes</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

            </div>
            

           
        </div>
       
        </>
       
    );
};

export default Users;
