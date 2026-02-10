import React, { useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import loginImage from "../assets/login-women.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import left from "../assets/2nd.png";
import right from "../assets/3rd.png";

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
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <Box
          component="img"
          src={left}
          sx={{
            position: "absolute",
            top: 50,
            left: 10,
            width: 230,
            zIndex: 1,
          }}
        />

        <Box
          component="img"
          src={right}
          sx={{
            position: "absolute",
            top: 100,
            right: 20,
            width: 160,
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* MAIN IMAGE */}
          <Box
            component="img"
            src={loginImage}
            sx={{
              width: 280,
              zIndex: 2,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: -25,
              bottom: 40,
              width: 200,
              backgroundColor: "#F9FFFB",
              borderRadius: 3,
              padding: 2,
              boxShadow: "0px 12px 30px rgba(0,0,0,0.15)",
              zIndex: 3,
              animation: "float 5s ease-in-out infinite",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1, top: 40 } }
            >
              <Typography fontSize={11} color="#999" fontWeight={600}>
                CURRENT TASK
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#E8F8EE",
                  color: "#2ECC71",
                  fontSize: 11,
                  fontWeight: 700,
                  px: 1,
                  borderRadius: 10,
                }}
              >
                84%
              </Box>
            </Box>

            <Typography fontWeight={700} fontSize={15}>
              Canva Design
            </Typography>

            <Typography fontSize={13} color="#777" mb={1}>
              📋 10 Tasks
            </Typography>

            <Box sx={{ height: 6, background: "#EAEAEA", borderRadius: 10 }}>
              <Box
                sx={{
                  width: "84%",
                  height: "100%",
                  background: "#2ECC71",
                  borderRadius: 10,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ textAlign: "center", pb: 2 }}>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 3 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#cfd8dc",
              }}
            />
            <Box
              sx={{
                width: 22,
                height: 8,
                borderRadius: 10,
                background: "#111",
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#cfd8dc",
              }}
            />
          </Box>

          <Typography fontSize={18} color="#444">
            Make your work easier and more organized
          </Typography>

          <Typography fontSize={20} fontWeight={700}>
            with Tuga's App
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
