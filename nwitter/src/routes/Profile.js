import { auth } from 'fbase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        signOut(auth);
        history.push('/');
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;