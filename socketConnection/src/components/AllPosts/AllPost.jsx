import { useState, useEffect } from "react";
import { useDispatch,  useSelector} from "react-redux";
import databaseService from "../../database/database";
import {addPosts} from "../../features/postsSlice";
import { Loader, Post } from "../";
const AllPosts = () => {
    const allPosts = useSelector((state) => state.posts.posts);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchPosts() {
            try{
                const response = await databaseService.getPosts([]);
                if (response.documents) {
                    dispatch(addPosts({posts: response.documents}));
                }
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    return loading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <Loader />
        </div>
    ) : error ? (
        <div className="w-full h-screen flex items-center">
            <p className="text-red-600 font-semibold text-center">{error}</p>
        </div>
    ) : (
        <div className="columns-1 sm:columns-2 md:columns-4 lg:columns-6">
            {
                allPosts.map((post) => (
                    <Post key={post?.$id} post={post} />
                ))
            }
        </div>
    )
}

export default AllPosts;