import { useId, forwardRef } from "react";

const Textarea = ({
    label,
    placheholder="",
    ...rest
}, ref) => {
    const id = useId();
    return (
        <div className="w-full max-w-60 h-full">
            {label && <label htmlFor={id} >{label}</label>}
            <textarea className="w-full h-full" id={id} ref={ref} placeholder={placheholder} {...rest}></textarea>
        </div>
    )
}

export default forwardRef(Textarea);

//TODO: text area like image preview