import React, { useState } from 'react';

const Home = () => {
    const [nweet, setNweet] = useState('');
    const onSubmit = e => e.preventDefault();
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