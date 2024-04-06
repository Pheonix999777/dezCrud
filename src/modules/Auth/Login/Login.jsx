import { useState } from "react";
import "./style.css";

import { authStore } from "../../store/store";

function Login() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: number,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sign-in failed");
      } else {
        authStore.login();
      }

      const data = await response.json();
      localStorage.setItem("token", data.data.tokens.accessToken.token);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Phone number"
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
