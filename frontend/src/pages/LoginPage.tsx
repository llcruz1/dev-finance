import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  function onSubmit(FormData: User) {
    console.log(FormData);
    history.push("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email: </label>
          <input type="email" placeholder="Email" {...register("email")} />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account ? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
