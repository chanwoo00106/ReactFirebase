import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from 'fbase';
import Nweet from 'components/Nweet';

const Home = () => {
    const [nweet, setNweet] = useState('');
    

    const onSubmit = async e => {
        e.preventDefault();
        setNweet("");
        try {
            await addDoc(collection(db, "nweets"), {
                nweet,
                createdAt: Date().slice(0, 15),
                creatorId: auth.currentUser.uid
            });
        } catch (e) {
            console.error(e);
        }
    };

    const onChange = e => setNweet(e.target.value);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    max={120}
                />
                <input
                    type="submit"
                    value="Nweet"
                />
            </form>
            <Nweet />
        </div>
    );
};

export default Home;