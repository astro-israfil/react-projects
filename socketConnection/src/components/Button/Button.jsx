const Button = ({
    children,
    type = "button",
    className = "",
    ...rest
}) => {
    return (
        <button type={type} className={`w-full py-3 px-6 outline-none border-0 capitalize ${className}`} {...rest}>
            {children}
        </button>
    )
}

export default Button;