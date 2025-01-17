


import React, { useState } from 'react';
import axios from '../../utils/axiosConfig';
import { toast } from 'react-toastify';
import './Register.css'; // Import your CSS file

const Register = ({ setIsAuthenticated, setShowRegister }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const [isAdmin, setIsAdmin] = useState(false);

    const { name, email, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const newUser = {
                name,
                email,
                password,
                role: isAdmin ? 'admin' : 'member', // Assign role based on isAdmin state
            };

            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/auth/register', body, config);

                const { token } = res.data;
                localStorage.setItem('token', token);
                setIsAuthenticated(true);

                // Show success toast
                toast.success('Registration successful');
            } catch (err) {
                console.error(err.response.data);
                // Show error toast
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    const handleClick = () => {
        setShowRegister((prev) => !prev);
    };

    const handleCheckboxChange = (e) => {
        setIsAdmin(e.target.checked);
    };

    return (
        <div className="register-container">
            <h1>Sign Up</h1>
            <div>


                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={(e) => onChange(e)}
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
            <div>
                Already registered ?{' '}
                <span onClick={handleClick} className="register-link">
                    Login
                </span>
            </div>
        </div>
    );
};

export default Register;
