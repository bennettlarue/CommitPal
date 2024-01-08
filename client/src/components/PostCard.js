import React from "react";
import axios from "axios";

const PostCard = ({ post }) => {
    const ID = post._id;

    const handleClick = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/posts/${ID}`
            );
            window.location.reload(false);
        } catch (error) {
            console.error("Error while deleting post:", error);
        }
    };

    return (
        <div className="mb-5 border border-black border-5 p-5 shadow-md ">
            <div className="flex items-center">
                <button onClick={handleClick}>
                    <img
                        src="https://www.svgrepo.com/show/513869/x-square.svg"
                        alt="Small"
                        className="w-6 mr-2"
                    />
                </button>
                <h1 className="font-semibold text-2xl mb-5">{post.title}</h1>
            </div>
            <p className="whitespace-pre-wrap break-words">{post.message}</p>
        </div>
    );
};

export default PostCard;
