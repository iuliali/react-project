import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
  } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../lib/firebase";
  
  const RegisterPage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };
    const validatePassword = (password) => {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return re.test(password);
    };

    const validateUsername = (username) => {
        const re = /^[a-zA-Z0-9]+$/;
        return re.test(username);
    };

    if (isAuthenticated) {
      return <Navigate to="/" />;
    }

    const handleUsernameChange = (event) => {
        setUserName(event.target.value);
        if (!validateUsername(userName)) {
          setError("Username must contain only letters and numbers");
        } else {
          setError("");
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (!validateEmail(email)) {
          setError("Please enter a valid email address");
        } else {
          setError("");
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (!validatePassword(password)) {
          setError(
            "Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters"
          );
        } else {
          setError("");
        }
    }

    const onRegister = async () => {
      if (!userName || !email || !password) {
        setError("Please fill in all fields");
        return;
      }
      if (!validateUsername(userName)) {
        setError("Username must contain only letters and numbers");
        return;
      }

      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
      if (!validatePassword(password)) {
        setError(
          "Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters"
        );
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        navigate("/login");
      } catch (error) {
        console.error(error.message);
        setError("An error ocurred");
      }
    };
  
    return (
      <Center flexDirection="column" height="100vh" >
        <Heading p={5}> welcome to your new mental health journey </Heading>
        <Center
          flexDirection="column"
          width={{ base: "100%", md: "500px" }}
          p="20"
          bg="blue.100"
          boxShadow="2"
          borderRadius="lg"
        >
          <Heading>Create an account to acces all the tools</Heading>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={userName}
              onChange={handleUsernameChange}
              bg="white"
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={handleEmailChange}
              bg="white"
              type="email"
            />
          </FormControl>
  
          <FormControl mt="5">
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={handlePasswordChange}
              bg="white"
              type="password"
            />
          </FormControl>
  
          {error && <Text maxW="500" color="red">{error}</Text>}
  
          <Text
            color="blue"
            onClick={() => {
              navigate("/login");
            }}
          >
            Do you have an account?
          </Text>
  
          <Button mt="5" onClick={onRegister}>
            Register
          </Button>
        </Center>
      </Center>
    );
  };
  
  export default RegisterPage;