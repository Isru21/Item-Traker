import React, { useState } from "react";
import styled from "styled-components";
const SignInPage = () => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setpasswordStrength] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !password) {
      alert("enter all the nessasary parts");
      return;
    }

    try {
      const response = await fetch("https://item-traker.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, password }),
      });

      if (response.ok) {
        // Login successful, handle further actions (e.g., redirect to another page)
        console.log("sinup successful!");
        const data = await response.json();
        localStorage.setItem("token", JSON.stringify(data));

        // Redirect to the "api/songs" page
        window.location.href = "/"; // You can also use React Router's history object to navigate programmatically if needed
      } else {
        // Login failed, handle the error
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  const calculatePasswordStrength = (password) => {
    // console.log(password.target.value);
    if (password.length < 6) {
      setpasswordStrength("Weak");
    } else if (password.length < 10) {
      setpasswordStrength("Moderate");
    } else {
      setpasswordStrength("Strong");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Employee Form</Title>
        <form className="form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Name</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={name}
              placeholder="Employee name"
              onChange={(e) => setname(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              placeholder="Employee number"
              pattern="[0-9]{10}"
              onChange={(e) => setphone(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Create a password"
              onChange={(e) => {
                setPassword(e.target.value);
                calculatePasswordStrength(e.target.value);
              }}
            />
          </FormGroup>
          <PasswordIndicatorContainer>
            <PasswordStrength>
              {passwordStrength === "Weak" && <Weak />}
              {passwordStrength === "Moderate" && <Moderate />}
              {passwordStrength === "Strong" && <Strong />}
            </PasswordStrength>
            <PasswordIndicatorText>
              Password Strength: {passwordStrength}
            </PasswordIndicatorText>
          </PasswordIndicatorContainer>
          <SignButton type="submit">Sign up</SignButton>
        </form>
        <SocialMessage></SocialMessage>
      </FormContainer>
    </Container>
  );
};

export default SignInPage;

const Container = styled.div`
`;

const FormContainer = styled.div`
  width: 279px;
  background-color: #474747;
  padding: 2rem;
  color: white;
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
  color: white;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(55, 65, 81, 1);
  outline: 0;
  padding: 0.75rem 1rem;
  &:focus {
    border-color: rgba(167, 139, 250);
  }
`;

const SignButton = styled.button`
  display: block;
  width: 100%;
  background-color: rgba(229, 143, 101, 1);
  padding: 0.75rem;
  text-align: center;
  color: rgba(62, 58, 57);
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  &:hover {
    background-color: rgb(26, 112, 154);
    color: white;
  }
  cursor: pointer;
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
const PasswordIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const PasswordStrength = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 4px;
`;

const StrengthSegment = styled.div`
  height: 100%;
  border-radius: inherit;
`;

const Weak = styled(StrengthSegment)`
  background-color: #ff6347; /* Red for weak */
`;

const Moderate = styled(StrengthSegment)`
  background-color: #ffa500; /* Orange for moderate */
`;

const Strong = styled(StrengthSegment)`
  background-color: rgb(203, 221, 86); /* Blue for strong */
`;

const PasswordIndicatorText = styled.p`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: rgba(62, 58, 57);
`;
