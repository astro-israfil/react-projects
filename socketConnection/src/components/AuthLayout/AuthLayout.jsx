import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../";

function Protected({children, authentication=true}) {
    const [loading, setLoading] = useState(true);
    const authState = useSelector((state) => state.auth.authState);
    const navigate = useNavigate();

    console.log(authState);
    useEffect(() => {
        if (authentication && authState !== authentication) {
            navigate("/login");
        } else if (authState) {
            navigate("/");
        }
        setLoading(false);
    }, [authState, authentication, navigate])
    return (
        <>
            {loading? (
                <div className="w-full h-screen flex items-center justify-center">
                    <Loader />
                </div>
            ): children}
        </>
    )
}

export default Protected;