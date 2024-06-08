import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import databaseService from "../../database/database";
import { useDispatch } from "react-redux";
import { deletePost, setEditPost } from "../../features/postsSlice";
import {Button} from "../";

const EditAndDelete = ({ className = "", postId="", fileId, post }) => {
    const dispatch = useDispatch();

    const handleDeletePost = () => {
        databaseService.deleteFile(fileId)
            .then((res) => {
                if (res) {
                    databaseService.deletePost(postId).then(() => {
                        dispatch(deletePost({postId}));
                    }).catch((error) => {
                        throw error
                    })
                }
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div className={`${className}`}>
            <Button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(setEditPost({post}))
                }} className="text-white text-xs rounded-full transition-all bg-black/[0.5] hover:bg-black  flex justify-center items-center">
                <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeletePost();
                }}
                className="text-white text-xs rounded-full transition-all bg-black/[0.5] hover:bg-black flex justify-center items-center">
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        </div>
    )
}

export default EditAndDelete;