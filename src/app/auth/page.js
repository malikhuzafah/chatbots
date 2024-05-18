"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "@/constants/constants";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const verifyLogin = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await axios.post(
          `${BASE_URL}api/users/verify-login`,
          null,
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        );
        console.log(response);
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  const colorMode = useColorMode();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}api/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response?.data?.token);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setErrorMessage("Please enter name, email and password");
      return;
    }
    try {
      localStorage.setItem("token", response?.data?.token);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={colorMode === "dark" ? "gray.800" : "gray.50"}
    >
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={8}
        width={{ base: "90%", sm: "80%", md: "50%" }}
        bg={colorMode === "dark" ? "gray.700" : "white"}
        boxShadow="md"
      >
        <Heading mb={4} color={colorMode === "dark" ? "white" : "gray.800"}>
          {isSignUp ? "Sign Up" : "Login"}
        </Heading>
        <form onSubmit={isSignUp ? handleSignup : handleLogin}>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
          {isSignUp && (
            <FormControl id="name" mt={4} isRequired>
              <FormLabel color={colorMode === "dark" ? "white" : "gray.800"}>
                Name
              </FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg={colorMode === "dark" ? "gray.800" : "white"}
                color={colorMode === "dark" ? "white" : "gray.800"}
              />
            </FormControl>
          )}
          <FormControl id="email" isRequired>
            <FormLabel color={colorMode === "dark" ? "white" : "gray.800"}>
              Email
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg={colorMode === "dark" ? "gray.800" : "white"}
              color={colorMode === "dark" ? "white" : "gray.800"}
            />
          </FormControl>
          <FormControl id="password" mt={4} isRequired>
            <FormLabel color={colorMode === "dark" ? "white" : "gray.800"}>
              Password
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg={colorMode === "dark" ? "gray.800" : "white"}
              color={colorMode === "dark" ? "white" : "gray.800"}
            />
          </FormControl>

          <Button mt={4} colorScheme="blue" type="submit">
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          <Button
            mt={4}
            ml={2}
            colorScheme="gray"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
