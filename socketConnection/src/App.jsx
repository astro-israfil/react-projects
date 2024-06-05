import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localAuthLogin, localAuthLogout } from "./features/authSlice";
import authentication from "./authentication/authentication";
import { Header, Container, Login, Signup, AddPost } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.appState.themeMode);
  const authState = useSelector(state => state.auth.authState);

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    setLoading(true);
    authentication.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(localAuthLogin({userData}));
        } else {
          dispatch(localAuthLogout());
        }
      }).catch((error) => {
        setError(error?.message);
      }).finally (() => setLoading(false));
  }, []);

  return (
    <>
      <Container>
        <div className="sticky top-0 left-0 right-0">
          <Header />
        </div>
        <div>
          <Outlet />
        </div>
        {
          authState && (
            <div className="fixed bottom-0 right-0 left-0 p-8 w-full flex justify-center z-10">
              <AddPost />
            </div>
          )
        }
      </Container>
    </>
  )
}

export default App
