import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

   

    try {
      const response = await fetch("https://item-traker.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });
      // console.log(phone)
      // console.log(password)
      
      

      // console.log(response)
      if (response.ok) {
        console.log("Login successful!");
        const data = await response.json();
        console.log(data)
        localStorage.setItem("token", JSON.stringify(data));

        // if(data.role === 'admin'){
        //   window.location.href = "/Adminpage";
        //   return
        // }
        // Redirect to the "api/songs" page
        window.location.href = "/mainpage";
      } else {
        // Login failed, handle the error
        console.log("Login failed");
        alert("Wrong password");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };


  return (
    <Container>
    <FormContainer>
      <Title>Login</Title>
      <form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            type="tel"
            name="phone"
            value={phone}
            id="phone"
            placeholder="Enter your phone number"
            pattern="[0-9]{10}"
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <SignButton type="submit">Sign in</SignButton>
        
      </form>
      <SocialMessage></SocialMessage>
      <Signup>
        Don't have an account?
        <GotoRegister to={`/register`}>Sign up</GotoRegister>
 
      </Signup>
    </FormContainer>
  </Container>
  // <div><h1>laeiblablkanlaknla</h1></div>
  )
}

export default LoginPage

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GotoRegister = styled(Link)``;
const FormContainer = styled.div`
  width: 320px;
  border-radius: 0.75rem;
 // background-color: rgb( 255,215,0,95%);
 background-color: rgba(92,188,99, 95%);

  padding: 2rem;
  color:rgba(62, 58, 57);
`;

const Title = styled.p`
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
`;

const FormGroup = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const Label = styled.label`
  display: block;
  color: rgba(62, 58, 57);
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  //background-color: rgba(17, 24, 39, 1);
  padding: 0.75rem 1rem;
 // color: rgba(243, 244, 246, 1);

  &:focus {
    border-color: rgba(167, 139, 250);
  }
`;

const SignButton = styled.button`
  display: block;
  width: 100%;
  background-color: rgba( 229, 143, 101, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(62, 58, 57);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  &:hover {
    background-color: rgb(255,128,125);
  }
`;

const SocialMessage = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
`;

const Signup = styled.p`
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(62, 58, 57);
`;