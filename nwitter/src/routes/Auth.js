import React, { useState } from 'react';
import { auth } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    // 이런 코드가 있으면 알려달라고 노마드형
    const onChagne = (e) => {
        const {
            target: {name, value}
        } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        if (newAccount){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                setError(error.code)
            });
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                console.log(error.code)
                console.log(error.message)
            });
        }
    }

    const toggleAccount = () => setNewAccount(prev => !prev);
    const onSocialClick = e => {
        const {target: {name}} = e;
        let provider

        try {
            if (name === 'google') {
                provider = new GoogleAuthProvider();
            } else if (name === 'github') {
                provider = new GithubAuthProvider();
            }
        } catch (e) {
            console.error(e)
        }
        
        signInWithPopup(auth, provider)
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                name="email"
                type="email"
                placeholder="Email"
                required // 빈 값이 들어오지 못하게 한다
                value={email}
                onChange={onChagne}
                />
                <input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChagne}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
};

export default Auth;
