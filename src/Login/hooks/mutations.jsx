import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";

import { authLogin, authLogout, authRegister } from "../Services/apis";

import { queryClient } from "../../utils/queryClient";
import { useMutation } from "@tanstack/react-query";


export function useAuthRegister() {
  const navigate = useNavigate();
  const { setUser, setToken, setIsAuthenticated } = useAuth(); 

  return useMutation({
    mutationFn: authRegister,
    onSuccess: (data) => {
      setUser(data.data); 
      setToken(data.token);
      setIsAuthenticated(true);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      console.log('isAuthenticated:', true); 
      console.log('Registration Successful');
      navigate('/');
    },
    onError: (error) => {
      console.log('Registration failed. Error:', error);
      navigate('/login');
    },
  });
}

export function useAuthLogin() {
  const navigate = useNavigate();
  const { setUser, setToken, setIsAuthenticated } = useAuth(); 
  return useMutation({
    mutationFn: authLogin,
    onSuccess: (data) => {
      setUser(data.data);
      setToken(data.token);
      setIsAuthenticated(true); 
      queryClient.invalidateQueries({ queryKey: ["user"] });
      console.log("isAuthenticated:", true); 
      console.log("Login Successful");
      navigate("/");
    },
    onError: (error) => {
      console.log(error.response.data.message);
      navigate("/login");
    },
  });
}

export function useAuthLogout() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  return useMutation({
    mutationFn: authLogout,
    onMutate: () => {
      console.log("Logout Successful");
    },
    onSuccess: () => {
      
      setUser({});
      setToken(null);
      navigate("/");
    },
    onError: (err) => {
      console.log(err.response.data.message);
    },
  });
}
