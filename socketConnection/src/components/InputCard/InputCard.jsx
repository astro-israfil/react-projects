const InputCard = ({children}) => {
    return (
        <>
            <div className="bg-gray-400 h-80 w-60 absolute transition-all duration-200 -top-80  left-1/2 -translate-x-1/2 rounded-sm">
                {children}
            </div>
        </>
    )
}

export default InputCard;