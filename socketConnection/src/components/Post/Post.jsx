import databaseService from "../../database/database";
const Post = ({post}) => {
    return (
        <div className="w-fit max-w-xs float-left py-2 clear-none">
            <img className="h-full max-h-96 rounded-md" src={databaseService.getFilePreview(post.image)} alt={post.title} />
        </div>
    )
}

export default Post;