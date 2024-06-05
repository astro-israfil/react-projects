import { useId, forwardRef } from "react"

const Input = ({
    label,
    type = "text",
    className="",
    ...rest
}, ref) => {
    const id = useId();
    return (
        <div className="w-full py-1 mb-2">
            {label ? (
                <div className="w-full mb-3">
                    <label className="text-gray-700 dark:text-gray-100" htmlFor={id}>{label}</label>
                </div>
            ) : null}
            <input id={id} className={`w-full text-slate-800 dark:text-blue-100 bg-transparent border border-gray-400 border-solid outline-none focus:outline focus:outline-1 focus:outline-blue-600 p-3 rounded-full`} type={type} ref={ref} {...rest} />
        </div>
    )
}

export default forwardRef(Input);

