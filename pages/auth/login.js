import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../store/actions";
import jwt_decode from "jwt-decode";

const initialCredentials = {
  email: '',
  password: ''
}

const initialShowPassword = false;

export default function Login() {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [showPassword, setShowPassword] = useState(initialShowPassword);
  
  const auth = useSelector(s => s.auth);
  const dispatch = useDispatch();
  
  const router = useRouter();
  
  const handleChange = (e) => {
    const {name, value, checked} = e.target;

    if(name === 'showPassword'){
      setShowPassword(checked);
    } else {
      setCredentials({
        ...credentials,
        [name]: value
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    dispatch(
      AuthAction.login(credentials)
    );

  }

  useEffect(() => {
    if(auth.status.loggedIn){
      const decodedToken = jwt_decode(auth.token);

      if(decodedToken.role.name === 'admin'){
        router.push('/admin/dashboard');

      } else {
        router.push('/');
      
      }
    }
  }, [router, auth.token, auth.status.loggedIn]);

  return (
  <form
    style={{
      display: "flex",
      flexFlow: "column wrap",
      gap: "1rem"
    }}

    onSubmit={handleSubmit}

  >
    <h3>Login</h3>
    
    <label>Email:
      <input 
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
      />
    </label>
    
    <label>Password:
      <input 
        type={showPassword ? "text" : "password"}
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
    </label>
    
    <label>
      <input
        type="checkbox"
        name="showPassword"
        onChange={handleChange}
        checked={showPassword}
      />
      Show Password
    </label>

    <button
      type="submit"
    >Login</button>

    {auth.status.error.message && <p style={{color: "red"}}>{auth.status.error.message}</p>}
  </form>
  )
}