import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from 'fbase';

const Nweet = () => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState("");nweets
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
        if (ok) await deleteDoc(doc(db, 'nweets', id))
    }

    const toggleEditing = () => setEditing(!editing);

    return (
        <>
            {nweets.map((nweet, i) => (
                <div key={i}>
                    {editing ? <form><input value={newNweet}></input></form> :
                        
                        <>
                            <h4>{nweet.nweet}</h4>
                            {
                                auth.currentUser.uid === nweet.creatorId &&
                                <>
                                    <div>{nweet.id}</div>
                                    <button onClick={() => oneDeleteClick(nweet.id)}>Delete Nweet</button>
                                    <button onClick={toggleEditing}>Edit Nweet</button>
                                </>
                                
                            }
                        </>
                    }
                </div>
            ))}
        </>
    )
}

export default Nweet
