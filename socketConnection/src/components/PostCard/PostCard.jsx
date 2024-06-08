import databaseService from "../../database/database";

const PostCard = ({post}) => {
    return (
        <div className="w-fit max-w-xs float-left py-2 clear-none relative cursor-pointer rounded-md hover:z-10 hover:scale-125 transition-transform duration-200">
            <img className="relative h-full max-h-96 rounded-md" src={databaseService.getFilePreview(post.image)} alt={post.title} />
        </div>
    )
}

export default PostCard;