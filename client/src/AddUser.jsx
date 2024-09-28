import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [fName, setFName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8001/addUser', { fName, lName, email, age });
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(err.response.data.errors.map(err => err.msg).join(', '));
                setTimeout(() => setError(""), 5000); // Clear after 5 seconds
            } else {
                setError("An unexpected error occurred.");
                setTimeout(() => setError(""), 5000);
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl mb-4">User Form</h2>
            {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="label">
                        <span className="label-text">First Name</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
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
                        onChange={e => setlName(e.target.value)}
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
                        onChange={e => setAge(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddUser;
