import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css'; // Importing the CSS file

function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // For signup
    const [confirmPassword, setConfirmPassword] = useState(''); // For signup
    const [isSignup, setIsSignup] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (isSignup && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const url = isSignup ? '/api/signup' : '/api/login';
        const data = isSignup ? { name, email, password } : { email, password };

        try {
            const response = await axios.post(url, data);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return ( <
        div className = "auth-form-container" >
        <
        h2 > { isSignup ? 'Signup' : 'Login' } < /h2> <
        form onSubmit = { handleSubmit } > {
            isSignup && ( <
                div >
                <
                label > Name: < /label> <
                input type = "text"
                value = { name }
                onChange = {
                    (e) => setName(e.target.value) }
                required /
                >
                <
                /div>
            )
        } <
        div >
        <
        label > Email: < /label> <
        input type = "email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value) }
        required /
        >
        <
        /div> <
        div >
        <
        label > Password: < /label> <
        input type = "password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value) }
        required /
        >
        <
        /div> {
            isSignup && ( <
                div >
                <
                label > Confirm Password: < /label> <
                input type = "password"
                value = { confirmPassword }
                onChange = {
                    (e) => setConfirmPassword(e.target.value) }
                required /
                >
                <
                /div>
            )
        } {
            error && < p > { error } < /p>} <
                button type = "submit" > { isSignup ? 'Signup' : 'Login' } < /button> <
                button type = "button"
            onClick = {
                    () => setIsSignup(!isSignup) } >
                Switch to { isSignup ? 'Login' : 'Signup' } <
                /button> <
                /form> <
                /div>
        );
    }

    export default AuthForm;