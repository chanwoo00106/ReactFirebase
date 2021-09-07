import React, { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from 'fbase';
import Nweet from 'components/Nweet';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, "nweets"), (snap) => {
            const nweetArray = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        })
    }, []);

    const onFileChange = e => {
        const {
            target: {files}
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = finishedEvent => {
            console.log(finishedEvent);
        }
        reader.readAsDataURL(theFile);
    }
    

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
                <input type="file" onChange={onFileChange} accept="image/*" />
            </form>
            {nweets.map((nweet, i) => (
                <Nweet key={i} nweet={nweet} id={nweet.id} />
            ))}
        </div>
    );
};

export default Home;