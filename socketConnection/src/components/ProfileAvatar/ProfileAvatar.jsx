const ProfileAvatar = ({
    src="",
    alt="",
    haveNewPost = false,
    size="50px"
}) => {
    return (
        <div style={{width: size, height: size}} className={`dark:bg-blue-700 bg-black text-blue-50 flex justify-center items-center rounded-full ${haveNewPost ? "outline outline-2  outline-blue-500 outline-offset-1" : "outline-none"}`}>
            {   src ? (
                    <img src={src} alt={alt} width="100%" height="100%" />
                ) : alt.charAt(0).toUpperCase()
            }
        </div>
    );
};

export default ProfileAvatar;