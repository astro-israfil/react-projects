import { useState, useEffect } from "react";
import databaseService from "../../database/database";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader, PostCard, EditAndDelete } from "../";

const PostDetails = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const allPosts = useSelector((state) => state.posts.posts);
    const userId = useSelector((state) => state.auth.userData?.$id);
    const [post, setPost] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        setLoading(true);
        setError("");
        databaseService.getPost(postId)
            .then((post) => {
                if (post && allPosts) {
                    setPost(allPosts.find((pst) => {
                        return pst.$id === post.$id;
                    }))
                } else {
                    throw Error("No post was found!");
                }
            })
            .catch((error) => {
                setError(error.message);
                console.log(error);
            }).finally(() => {
                setLoading(false);
            });
    }, [postId, allPosts, setPost]);

    return loading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <Loader />
        </div>
    ) : error ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <p>{error}</p>
        </div>
    ) : (
        <div className="px-8">
            {
                post && (
                    <div className="w-full max-w-4xl flex justify-center gap-12 flex-wrap sm:pb-28 pt-6">
                        <div className="min-w-44">
                            <PostCard post={post} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">{post.title}</h1>
                            <p className="mt-5 max-w-md">{post.content}</p>
                            <div className="justify-self-end ">
                            {userId && userId === post.userId && (
                                <EditAndDelete className="flex gap-4" postId={postId} fileId={post.image} post={post} />
                            )}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default PostDetails;