import React from "react";
import {Typography, Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Dashboard = () => {
    const token = localStorage.getItem("accessToken");

    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <Box sx={{ minHeight: "100vh", p: 4 }}>
            <Typography variant="h4">Welcome to Dashboard 🎉</Typography>

            <Typography sx={{ mt: 2 }}>
                <strong>Access Token:</strong>
            </Typography>

            <Typography
                sx={{
                    mt: 1,
                    wordBreak: "break-all",
                    background: "#222",
                    color: "#0f0",
                    p: 2,
                    borderRadius: 2,
                    fontSize: "12px"
                }}
            >
                {token}
            </Typography>

            <Button variant="contained" onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
};

export default Dashboard;
