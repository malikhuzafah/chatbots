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
  Flex,
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password || !name) {
      setErrorMessage("Please enter name, email and password");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}api/users/register`, {
        email,
        password,
        name,
      });
      localStorage.setItem("token", response?.data?.token);
      router.push("/");
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={"#101014"}
    >
      <Box
        borderRadius="lg"
        p={8}
        width={{ base: "90%", sm: "80%", md: "50%" }}
        bg={"linear-gradient(to right, #232526, #414345)"}
        boxShadow="md"
      >
        <Heading mb={4} fontWeight={450} color={"#ffffff"}>
          {isSignUp ? "Sign Up" : "Login"}
        </Heading>
        <form onSubmit={isSignUp ? handleSignup : handleLogin}>
          <Flex flexDir={"column"} gap={3}>
            {errorMessage && <Text color="red">{errorMessage}</Text>}
            {isSignUp && (
              <FormControl id="name" mt={4} isRequired>
                <FormLabel color={"#ffffff"}>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  bgColor={"#ffffff"}
                  placeholder="Enter Name"
                />
              </FormControl>
            )}
            <FormControl id="email" isRequired>
              <FormLabel color={"#ffffff"}>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bgColor={"#ffffff"}
                placeholder="Enter Email"
              />
            </FormControl>
            <FormControl id="password" mt={4} isRequired>
              <FormLabel color={"#ffffff"}>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bgColor={"#ffffff"}
                placeholder="Enter Password"
              />
            </FormControl>

            <Flex gap={2} mt={4} justify={"flex-end"}>
              <Button
                onClick={() => setIsSignUp(!isSignUp)}
                variant={"ghost"}
                color={"#ffffff"}
                fontWeight={"400"}
                _hover={{
                  bgColor: "#6a11cb",
                }}
                borderRadius={"full"}
                isDisabled={isLoading}
              >
                {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
              </Button>
              <Button
                type="submit"
                borderRadius={"full"}
                bg={"linear-gradient(to right, #4568dc, #b06ab3)"}
                color={"#ffffff"}
                fontWeight={"400"}
                _hover={{
                  bg: "linear-gradient(to right, #6a11cb, #2575fc)",
                }}
                transition={"background 0.3s ease"}
                isLoading={isLoading}
              >
                {isSignUp ? "Sign Up" : "Login"}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}
