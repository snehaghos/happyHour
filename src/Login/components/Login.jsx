import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'; 
import { useAuthLogin } from '../hooks/mutations';

export default function Login (){
  const navigate = useNavigate(); 
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginMutation = useAuthLogin();

  const homeStyle = {
    backgroundImage: "url('images/homeBg.jpg')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const onSubmit = async (ev) => {
    ev.preventDefault();
    const payload = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
    };
    try {
        const data = await loginMutation.mutateAsync(payload);
        console.log("Login successful. Data:", data);
    } catch (error) {
        console.error("Login failed. Error:", error);
    }
    navigate('/');
};
  
  return (
    <>
    <div style={homeStyle} className='flex h-[100vh] items-center justify-center'>
    <form
      onSubmit={onSubmit} 
      className="w-[400px]  bg-gray-300/30 text-gray-950 rounded-md px-14 flex flex-col  gap-12 m-auto mt-8 py-10  "
    >
      <div className='w-full '>
        <label className='text-slate-50'>Email:</label>
        <input
          type="text"
          name="email"
          className="w-full px-2 py-2 rounded-sm bg-gray-200/70"
          ref={emailRef} placeholder='admin0000'
        />
      </div>
      <div className='w-full '>
        <label className='text-slate-50'>Password:</label>
        <input
          type="password"
          name="password"
          className="w-full px-2 py-2 rounded-sm bg-gray-200/70"
          ref={passwordRef} defaultValue={"password"}
        />
      </div>
      <button type="submit" className="px-4 py-3 mb-6 bg-gray-300">Submit</button>
    </form>
    </div>
 
    </>
  );
}
