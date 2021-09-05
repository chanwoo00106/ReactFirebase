import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from 'fbase';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const onSubmit = async e => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'nweets'), {
                nweet,
                createdAt: Date().slice(0, 15)
            });
            setNweet("");
        } catch (e) {
            console.error(e);
        }
    };
    const onChange = e => setNweet(e.target.value);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" max={120} />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    );
};

export default Home;