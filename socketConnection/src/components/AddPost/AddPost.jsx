import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, clearEditPost, updatePosts } from "../../features/postsSlice";
import databaseService from "../../database/database";
import { Input, Button, ProfileAvatar, InputCard, Loader } from "../";
import galleryIcon from "../../assets/galleryIcon.png";
import { useForm } from "react-hook-form";

const AddPost = () => {
    const editPost = useSelector(state => state.posts.editPost);
    const dispath = useDispatch();
    const {register, handleSubmit, setValue} = useForm();
    const [isImageUpload, setIsImageUpload] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImage, setupLoadedImage] = useState(null); 
    const [imageId, setImageId] = useState("");
    const userId = useSelector(state => state.auth.userData?.$id);
    const userName = useSelector(state => state.auth.userData?.name);

    const handleUploadImage = (e) => {
        async function imageUpload() {
            setIsUploading(true)
            try {
                const file = await databaseService.uploadFile(e.target.files[0]);
                if(file) {
                    setImageId(file.$id);
                    const filePreview = databaseService.getFilePreview(file.$id);
                    setupLoadedImage(filePreview);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsUploading(false);
            }
        }

        if (imageId && uploadedImage) {
            databaseService.deleteFile(imageId)
                .then(() => {
                    imageUpload();
                })
        } else {
            imageUpload();
        }
    }

    const handleCancleUploadImage = () => {
        if (imageId && uploadedImage && !editPost) {
            databaseService.deleteFile(imageId)
            .then(() => {
                setupLoadedImage(null);
                setImageId("");
                setIsImageUpload(false);
            }).catch((error) => {
                console.log(error);
            })
        } else {
            setIsImageUpload(false);
            dispath(clearEditPost());
            setImageId("");
            setupLoadedImage(null);
        }
    }

    const handleSubmitPost = (data) => {
        if (!editPost && imageId) {
            data = {...data, image: imageId, userId};
            if (userId && imageId) {
                databaseService.createPost(data)
                    .then((post) => {
                        dispath(addPost({post: {...data, ...post}}));
                        setupLoadedImage(null);
                        setImageId("");
                        setIsImageUpload(false);
                        setValue("title", "");
                        setValue("content", "");
                    }).catch((error) => {
                        console.log(error);
                    })
            }
        } else if (editPost && imageId) {
            data = {...data, image: imageId, userId };
            databaseService.updatePost(editPost.$id, data)
                .then((post) => {
                    dispath(updatePosts({editedPost: {...data, ...post}}));
                    dispath(clearEditPost());
                    setupLoadedImage(null);
                    setImageId("");
                    setIsImageUpload(false);
                    setValue("title", "");
                    setValue("content", "");
                }).catch((error) => {
                    console.log(error);
                })
        }
    }

    useEffect(() => {
        if (editPost) {
            setValue("title", editPost?.title || "");
            setValue("content", editPost?.content || "");
            setIsImageUpload(true);
            setupLoadedImage(databaseService.getFilePreview(editPost.image));
            setImageId(editPost.image);
        }
    }, [editPost]);

    return (
        <div className="w-full max-w-3xl px-10 relative dark:bg-black/[.05] bg-white backdrop-blur-md rounded-2xl">
            <form onSubmit={handleSubmit(handleSubmitPost)} className="flex w-full gap-4 relative">
            <div className="min-w-14 flex items-center">
                <ProfileAvatar alt={userName} />
            </div>
            <div className="pt-3 flex-1">
                <Input type="text"
                    con
                    placeholder="Share what's on you mind!" 
                    {...register("title", {
                    required: true,
                    minLength: 9,
                    })} 
                />
                {/* <Controller 
                    as={<inpu type="text" />}
                    control={control}
                    defaultValue={editPost? editPost.title : ""}
                    name="title"
                /> */}
            </div>
            {
                <div className="pt-3 flex-1">
                    <Input placeholder="Add a description" {...register("content")} />
                </div>
            }
            {
              !isImageUpload ? (
                    <div className="flex items-center">
                        <Button className="rounded-full" onClick={() => setIsImageUpload(true)}>
                            <img src={galleryIcon} alt="Upload Image" width={40} height={40} />
                        </Button>
                    </div>
                ) : (
                    <InputCard>
                        <div className="relative h-full flex items-center justify-center">
                            {uploadedImage && <img src={uploadedImage} className="w-full h-full object-cover" alt="" />}
                            {!uploadedImage && !isUploading && <p className="text-slate-900 font-semibold">No Image to Preview</p>}
                            {isUploading && (<Loader />)}
                            <div className="fixed bottom-1 left-0 right-0 p-2 flex justify-center">
                                <label htmlFor="uploadFile" className="inline-block bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-full">
                                    <input type="file" id="uploadFile" className="hidden w-full h-full" onChange={handleUploadImage} />
                                    Upload Image
                                </label>
                            </div>
                            <button onClick={handleCancleUploadImage} className="w-5 h-5 flex items-center justify-center absolute top-2 right-2 rounded-full bg-gray-950 dark:bg-blue-600 text-white">
                                X
                            </button>
                        </div>
                    </InputCard>
                )
            }
            
            <div className="flex items-center">
                <Button type="submit" className="bg-black text-blue-100 dark:bg-blue-600 dark:text-white rounded-full">{editPost ? "Update" : "Post"}</Button>
            </div>
            </form>
        </div>
    )
}

export default AddPost;