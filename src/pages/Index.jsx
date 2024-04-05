import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading, useToast, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // API call to login endpoint
      const response = await fetch("https://backengine-e4p9.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: `Welcome, ${email}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // API call to signup endpoint
      const response = await fetch("https://backengine-e4p9.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast({
          title: "Signup Successful",
          description: "You can now log in using your credentials",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        toast({
          title: "Signup Failed",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box w="100%" p={4}>
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Welcome to Interactive App
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
          <Text textAlign="center">or</Text>
          <Button leftIcon={<FaUserPlus />} colorScheme="green" onClick={handleSignup}>
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
