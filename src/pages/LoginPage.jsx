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
  import { useDispatch, useSelector } from "react-redux";
  import { setIsAuthenticated } from "../store/auth.reducer";
  import { Navigate, useNavigate } from "react-router-dom";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../lib/firebase";
  
  const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
  
    const onLogin = async () => {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
        dispatch(setIsAuthenticated(true));
      } catch (error) {
        console.error(error.message);
        setError("Invalid email or password");
      }
    };
  
    return (
      <Center flexDirection="column" height="100vh">
        <Heading p={5}> welcome back to your journals </Heading>
        <Center
          flexDirection="column"
          width={{ base: "100%", md: "500px" }}
          p="20"
          bg="blue.100"
          boxShadow="2"
          borderRadius="lg"
        >
          <Heading alignContent="center">Login to access them</Heading>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              bg="white"
              type="email"
            />
          </FormControl>
  
          <FormControl mt="5">
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              bg="white"
              type="password"
            />
          </FormControl>
  
          {error && <Text color="red">{error}</Text>}
  
          <Text
            color="blue"
            onClick={() => {
              navigate("/register");
            }}
          >
            Do you need an account?
          </Text>
  
          <Button onClick={onLogin}>
            Log in
          </Button>
        </Center>
      </Center>
    );
  };
  
  export default LoginPage;