import React, { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import loginImage from "../assets/login-women.png";
import user from "../assets/user.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";

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
        password,
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
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 0,
        alignItems: "center",
        justifyContent: "center",
        // minHeight: "100vh",
        padding: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          backgroundColor: "#ffffff",
          padding: 5,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          width: 400,
          minHeight: 540,
          boxShadow: "0px 15px 40px rgba(0,0,0,0.5)",
        }}
      >
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h4"
            sx={{ color: "#111", fontWeight: 700, mb: 0.5 }}
          >
            Welcome back!
          </Typography>

          <Typography sx={{ color: "#777", fontSize: 14 }}>
            Simplify your workflow and boost your productivity <br />
            with Tuga's App. Get started for free.
          </Typography>
        </Box>

        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          error={Boolean(emailError)}
          helperText={emailError}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "30px",
            },
          }}
        />

        <Typography
          variant="body2"
          sx={{ textAlign: "right", cursor: "pointer" }}
        >
          Forgot Password?
        </Typography>

        <Button
          onClick={handleLogin}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "30px",
            height: 45,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#222",
            },
          }}
        >
          Login
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1, height: "1px", backgroundColor: "#ddd" }} />

          <Typography sx={{ fontSize: 13, color: "#777" }}>
            or continue with
          </Typography>

          <Box sx={{ flex: 1, height: "1px", backgroundColor: "#ddd" }} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Button
            onClick={handleGoogleLogin}
            sx={{
              minWidth: 45,
              height: 45,
              borderRadius: "50%",
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#222" },
            }}
          >
            <GoogleIcon />
          </Button>

          <Button
            sx={{
              minWidth: 45,
              height: 45,
              borderRadius: "50%",
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#222" },
            }}
          >
            <AppleIcon />
          </Button>

          <Button
            sx={{
              minWidth: 45,
              height: 45,
              borderRadius: "50%",
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#222" },
            }}
          >
            <FacebookIcon />
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center">
          Not a member? <span style={{ color: "#4caf50" }}>Register now</span>
        </Typography>
      </Box>
      {/*///R///*/}
      <Box
        sx={{
          background: "linear-gradient(135deg, #F3F9EE, #EAF5E3)",
          padding: 5,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          width: 400,
          minHeight: 540,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <img src={user} width="90" style={{ marginBottom: "10px" }} />
        {/*<img src={Icon} width="60" style={{ marginBottom: 10 }} />*/}

        <img
          src={loginImage}
          width="300"
          style={{
            marginBottom: "25px",
            animation: "float 4s ease-in-out infinite",
            zIndex: 2,
          }}
        />

        <Typography
          sx={{
            mt: 2,
            fontSize: 18,
            color: "#444",
          }}
        >
          Make your work easier and organized
        </Typography>

        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: "#111",
          }}
        >
          with Tuga's App
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
