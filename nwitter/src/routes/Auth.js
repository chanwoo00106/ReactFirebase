import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const onSubmit = e => e.preventDefault();

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
                <input type="submit" value="Log In" />
            </form>
        </div>
    );
};

export default Auth;
