import { useState } from "react";
import { Button, Logo } from "../";
import {useDispatch, useSelector} from "react-redux";
import authentication from "../../authentication/authentication";
import { localAuthLogout } from "../../features/authSlice";
import { darkTheme, lightTheme } from "../../features/themeSlice";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [themeSwitchChecked, setThemeSwitchChecked] = useState();
    const themeMode = useSelector((state) => state.appState.themeMode);
    const authState = useSelector((state) => state.auth.authState);
    const dispatch = useDispatch();

    const switchTheme = (e) => {
        if (e.target.checked) {
            dispatch(darkTheme())
            setThemeSwitchChecked(true);
        } else {
            dispatch(lightTheme())
            setThemeSwitchChecked(false);
        }
    }

    const handleLogout = () => {
        authentication.logout()
            .then(() => {
                dispatch(localAuthLogout());
            }).catch((error) => {
                console.log(error);
            })
    }

    const navLinks = [
        {
            name: "Home",
            url: "/",
            active: authState,
        },
        {
            name: "Login",
            url: "/login",
            active: !authState,
        },
        {
            name: "Signup",
            url: "/signup",
            active: !authState,
        },
    ];
    return (
        <div className="w-full py-3 px-8 flex flex-wrap items-center gap-4 bg-white/[0.5] dark:bg-black/[0.5] backdrop-blur-md">
            <div className="mr-8 flex items-center">
                <Logo />
            </div>
            <div className="ml-auto flex items-center">
                <ul className="flex list-none flex-wrap gap-10 items-center">
                    {
                        navLinks.map((link) => (
                            link.active ? (
                                <NavLink to={link.url} key={link.name} className="items-center">
                                {link.name}
                                </NavLink>
                            ) : null
                        ))
                    }
                    {
                        authState && (
                            <li className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" onChange={switchTheme} checked={themeSwitchChecked} />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="capitalize ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{themeMode}{" "}mode</span>
                            </label>
                            </li>
                        )
                    }
                </ul>
            </div>
            {
                authState && (
                    <div className="max-w-28 flex items-center">
                        <Button className="bg-black text-blue-100 rounded-full dark:bg-white dark:text-slate-900" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                )
            }
        </div>
    )
}

export default Header;