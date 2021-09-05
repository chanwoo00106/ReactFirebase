import React, { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from 'fbase';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const ntRef = collection(db, "nweets");

    useEffect(() => {
        onSnapshot(ntRef, (snap) => {
            const nweetArray = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray)
        })
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "nweets"), {
                nweet,
                createdAt: Date().slice(0, 15),
                creatorId: auth.currentUser.uid
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
            <div>
                {nweets.map((nweet, i) => (
                    <div key={i}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;