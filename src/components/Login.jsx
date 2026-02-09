import React, {useState} from 'react';
import {Box, Button, Divider, TextField, Typography} from "@mui/material";
import loginImage from "../assets/login-women.png";
import user from "../assets/user.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {useNavigate} from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();


    const handleLogin = async () => {
        if (!email) {
            setEmailError("Email is required");
            return;
        }

        if (!password) {
            alert("Password is required");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log("Login success:", userCredential.user);
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            const user = result.user;
            const token = await user.getIdToken();

            console.log("Google User:", user);
            console.log("Access Token:", token);

            // save token (optional but useful)
            localStorage.setItem("accessToken", token);

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };




    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F3F8F3",
                borderRadius: 12,
            }}>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 0,
                    alignItems: "center",
                    padding: 4
                }}
            >

                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                    backgroundColor: "#1e1e1e",
                    padding: 5,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                    width: 380,
                    boxShadow: "0px 15px 40px rgba(0,0,0,0.5)"
                }}>


                <Typography variant="h4">Welcome back!</Typography>
                    <Typography variant="body1" sx={{  }}>
                        Simplify your workflow and boost your productivity.
                    </Typography>
                    <Typography variant="body1">
                        with Tuga's App. Get started for free.
                    </Typography>

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={
                        (e) =>{
                            setEmail(e.target.value);
                            setEmailError("");
                        }}
                        error={Boolean(emailError)}
                        helperText={emailError}
                    />


                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Typography
                        variant="body2"
                        sx={{ textAlign: "right", cursor: "pointer" }}>
                        Forgot Password?
                    </Typography>

                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Divider sx={{ flex: 1 }} />
                        <Typography variant="body2">or continue with</Typography>
                        <Divider sx={{ flex: 1 }} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <Button variant="outlined" onClick={handleGoogleLogin}>
                            G
                        </Button>
                        <Button variant="outlined"></Button>
                        <Button variant="outlined">f</Button>
                    </Box>

                    <Typography variant="body2" textAlign="center">
                        Not a member? <span style={{ color: "#4caf50" }}>Register now</span>
                    </Typography>

                </Box>



                <Box
                    sx={{
                        backgroundColor: "#F6FBEF",
                        padding: 6,
                        borderRadius: 3,
                        width: 380,
                        minHeight: 520,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",

                    }}
                >

                    <img
                        src={user}
                        width="90"
                        style={{ marginBottom: "10px" }}
                    />
                    {/*<img src={someIcon} width="60" style={{ marginBottom: 10 }} />*/}

                    <img

                        src={loginImage}
                        width="340"
                        style={{
                            marginBottom: "20px",
                            animation: "float 3s ease-in-out infinite"
                        }}
                    />

                    <Typography
                        sx={{
                            mt: 2,
                            fontSize: "18px",
                            color: "#555"
                        }}
                    >
                        Make your work easier and organized
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "#1e1e1e"
                        }}
                    >

                    with Tuga's App
                    </Typography>
                </Box>

            </Box>
        </Box>
    );
};

export default Login;