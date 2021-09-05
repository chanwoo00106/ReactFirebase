import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from 'fbase';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

    

    useEffect(() => {
        const getNweets = async () => {
            const dbNweets = await getDocs(collection(db, "nweets"));
            dbNweets.forEach((doc) => {
                const newObj = {
                    ...doc.data(),
                    id: doc.id
                }
                setNweets(prev => [newObj, ...prev]);
            });
        }
        getNweets();
    }, []);
    const onSubmit = async e => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "nweets"), {
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