import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db, auth, storage } from 'fbase';
import Nweet from 'components/Nweet';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

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
            setAttachment(finishedEvent.currentTarget.result);
        }
        reader.readAsDataURL(theFile);
    }
    

    const onSubmit = async e => {
        e.preventDefault();
        setNweet("");
        const fileRef = storage(auth.currentUser, uuidv4())
        const response = await fileRef.putString(attachment, "data_url");
        console.log(response) 
        try {
            // await addDoc(collection(db, "nweets"), {
            //     nweet,
            //     createdAt: Date().slice(0, 15),
            //     creatorId: auth.currentUser.uid
            // });
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
                {attachment && (
                    <div>
                        <img src={attachment} alt="add img" height="50px" width="50px" />
                        <button onClick={() => setAttachment()}>Clear</button>
                    </div>
                )}
            </form>
            {nweets.map((nweet, i) => (
                <Nweet key={i} nweet={nweet} id={nweet.id} />
            ))}
        </div>
    );
};

export default Home;