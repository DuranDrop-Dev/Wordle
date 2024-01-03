import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function EmailForm({ isChecked }) {
    // Firebase method
    const auth = getAuth();

    // Form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Toggle from login to signup
    const [toggleLoginSignup, setToggleLoginSignup] = useState(true);
    const showLoginSignup = () => {
        setToggleLoginSignup(!toggleLoginSignup)
    }

    // Show email Forms boolean
    const [showEmail, setShowEmail] = useState(true);
    const showEmailForms = () => {
        setShowEmail(!showEmail)
    }

    // Gather input data onChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Signup with email get form data
    const handleSignUpBtn = (e) => {
        e.preventDefault();
        console.log('Form data submitted');
        // Send data to firebase
        EmailSignUp(formData);
    };

    // Firebase method
    const EmailSignUp = (data) => {
        try {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("Email User Created:", user.email)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorCode)
                    console.log(errorMessage)
                });
        } catch (error) {
            console.log(error);
        }
    }

    //Loging with email get form data
    const handleLoginBtn = (e) => {
        e.preventDefault();
        // Send data to firebase
        EmailLogin(formData);
    };

    // Firebase method
    const EmailLogin = (data) => {
        try {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log("User Found:", user.email)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorCode)
                    console.log(errorMessage)
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {showEmail &&
                <>
                    <h3>Login with Email</h3>
                    <button onClick={showEmailForms}>Email</button>
                </>
            }
            {!showEmail &&
                <>
                    {toggleLoginSignup &&
                        <>
                            <h3>Login with Email</h3>
                            <form
                                className='myForm'
                                onSubmit={handleLoginBtn}
                            >
                                <div className='inputContainer'>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        autoComplete="email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='inputContainer'>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        autoComplete="current-password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    disabled={!isChecked}
                                    type="submit"
                                >
                                    Login
                                </button>
                                <button
                                    className='textBtn'
                                    onClick={showLoginSignup}
                                >
                                    Create an account
                                </button>
                            </form>
                        </>
                    }

                    {!toggleLoginSignup &&
                        <>
                            <h3>Create an Account</h3>
                            <form
                                className='myForm'
                                onSubmit={handleSignUpBtn}
                            >
                                <div className='inputContainer'>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        autoComplete="email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='inputContainer'>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        autoComplete="new-password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    disabled={!isChecked}
                                    type="submit"
                                >
                                    SignUp
                                </button>
                                <button
                                    className='textBtn'
                                    onClick={showLoginSignup}
                                >
                                    Back to login
                                </button>
                            </form>
                        </>
                    }
                </>
            }
        </>
    );
}

export default EmailForm;
