import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from 'fbase';

const Nweet = () => {
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

    const oneDeleteClick = async (id) => {
        const ok = window.confirm("Are you suer you want delete this nweet?")
        console.log(id)
        if (ok) await deleteDoc(doc(db, 'nwitter', 'fuckfisdoifsdfisdp'))
    }


    return (
        <>
            {nweets.map((nweet, i) => (
                <div key={i}>
                    <h4>{nweet.nweet}</h4>
                    {
                        auth.currentUser.uid === nweet.creatorId &&
                        <>
                            <div>{nweet.id}</div>
                            <button onClick={() => oneDeleteClick(nweet.id)}>Delete Nweet</button>
                            <button>Edit Nweet</button>
                        </>
                    }
                </div>
            ))}
        </>
    )
}

export default Nweet
