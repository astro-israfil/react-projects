import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import databaseService from "../../database/database";
import { EditAndDelete } from "../";

const Post = ({post}) => {
    const userId = useSelector((state) => state.auth.userData?.$id);

    return (
        <div className="w-fit max-w-xs float-left py-2 clear-none relative cursor-pointer rounded-md hover:z-10 hover:scale-125 transition-transform duration-200">
            <Link to={`post/${post.$id}`}>
            <img className="relative h-full max-h-96 rounded-md" src={databaseService.getFilePreview(post.image)} alt={post.title} />
            {
                userId && userId === post.userId && (
                    <EditAndDelete className="w-8 absolute bottom-6 right-2 flex justify-end gap-1" fileId={post.image} postId={post.$id} />
                )
            }
            </Link>
        </div>
    )
}

export default Post;