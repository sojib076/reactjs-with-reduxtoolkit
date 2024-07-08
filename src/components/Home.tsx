// src/components/Home.js
import React from 'react';
import { useGetPostsQuery } from '../redux/api/baseApi';
import { setUser } from '../redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';


const Home = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    console.log(user);
    const { data: posts, isLoading, error } = useGetPostsQuery(undefined);

    if (isLoading) return <p>Loading...</p>;
    if (error) {
        return <p>Error: {error?.message}</p>;
    }


const handleSetUser = () => {
    const number = Math.floor(Math.random() * 9);
    const onepost = posts?.[number];
    dispatch(setUser(
        onepost
    ));
};


return (
    <div>
        <h1>Home</h1>
        <button onClick={handleSetUser} className='bg-lime-400 px-5 py-2 rounded-sm '>Set User</button>
        <h2>User Information</h2>
        {user ? (
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Username: {user.username}</p>
                <p>Website: {user.website}</p>
            </div>
        ) : (
            <p>No user data</p>
        )}

        <h2>Posts</h2>
        {posts && posts.length > 0 ? (
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No posts available</p>
        )}
    </div>
);
};

export default Home;
