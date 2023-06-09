import checkAuth from "@app/auth";
import initializeApp from "@app/init";
import { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeChange } from "theme-change";

// Importing pages
const Layout = lazy(() => import("@containers/Layout"));
const Login = lazy(() => import("@pages/Login"));
const ForgotPassword = lazy(() => import("@pages/ForgotPassword"));
const Register = lazy(() => import("@pages/Register"));
const Documentation = lazy(() => import("@pages/Documentation"));

// Initializing different libraries
initializeApp();

// Check for login and initialize axios
const token = checkAuth();

function App() {
    useEffect(() => {
        // 👆 daisy UI themes initialization
        themeChange(false);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documentation" element={<Documentation />} />

                {/* Place new routes over this */}
                <Route path="/app/*" element={<Layout />} />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to={token ? "/app/welcome" : "/login"}
                            replace
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
