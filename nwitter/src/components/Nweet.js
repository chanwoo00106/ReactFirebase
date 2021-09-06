import React, { useState } from 'react'
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from 'fbase';

const Nweet = ({nweet, id}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweet.nweet);
    

    const oneDeleteClick = async (id) => {
        const ok = window.confirm("Are you suer you want delete this nweet?")
        console.log(id)
        if (ok) await deleteDoc(doc(db, 'nweets', id))
    }

    const toggleEditing = () => setEditing(prev => !prev);
    const onChange = e => setNewNweet(e.target.value);
    const onSubmit = async e => {
        e.preventDefault();
        setEditing(prev => !prev);
        await updateDoc(doc(db, 'nweets', id), {
            nweet: newNweet
        });
    }

    return (
        <>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your nweet"
                            onChange={onChange}
                            value={newNweet}
                            required
                        />
                        <input type="submit" value="Update Nweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweet.nweet}</h4>
                    {
                        auth.currentUser.uid === nweet.creatorId &&
                        <>
                            <button onClick={() => oneDeleteClick(nweet.id)}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                        
                    }
                </>
            )}
        </>
    )
}

export default Nweet
