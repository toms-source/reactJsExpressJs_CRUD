import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:8001/user/${id}`);
                const user = res.data;
                setFName(user.fName);
                setLName(user.lName);
                setEmail(user.email);
                setAge(user.age);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserData();
    }, [id]);

    const handleSubmit = async (e) => {
      e.preventDefault();
        try {
            await axios.put(`http://localhost:8001/updateUser/${id}`, { fName, lName, email, age });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert("Error updating user");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">User Form</h2>
            <form onSubmit={handleSubmit} className="p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">First Name</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={fName}
                        onChange={e => setFName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">Last Name</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={lName}
                        onChange={e => setLName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">Age</span>
                    </label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>

                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;