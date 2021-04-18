import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function LoginPage({ match, history }) {
  const { register, handleSubmit } = useForm();

  function onSubmit(FormData) {
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
