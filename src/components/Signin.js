import { useState,useEffect } from 'react';
import { Button, Checkbox, Label, TextInput  } from 'flowbite-react';
import { useNavigate  } from 'react-router';
import axios from 'axios';
import {BiHide,BiShow} from "react-icons/bi"
import { Link } from 'react-router-dom';
export default function Signin() {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [HideShowpasswords, setHideShowpasswords] = useState(true);
  const navigate = useNavigate();
  

  const tokens = localStorage.getItem("token");
  useEffect(() => {
    if (!tokens) {
      navigate("/signin");
    } else {
      navigate("/");
    }
  }, []);

  const HandleLogin = async e => {
    e.preventDefault();

    const Users = {
      email: Email,
      password: Password,
    };

    const res = await axios.post("https://taskmaster-h50j.onrender.com/signin",Users);
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } else {
      alert(res.data.message);
      navigate("/signin");
    }
   
  };
  return (
    <div className=" w-11/12 drop-shadow-md px-4 rounded-xl bg-slate-300 mx-auto mt-16 py-20 flex max-w-md flex-col gap-4">
    <form onSubmit={HandleLogin} >
    <p className='text-center text-2xl capitalize font-semibold text-cyan-600 hover:underline dark:text-cyan-500'> login here </p>
      <div className='my-4'>
        <div className=" text-left mb-2 block">
          <Label  value="Your email" />
        </div>
        <TextInput value={Email} onChange={(e)=>{setEmail(e.target.value)}}  placeholder="abc@gmail.com" required  shadow type="email"/>
      </div>
      <div className='my-4 '>
        <div className=" text-left mb-2 block">
          <Label value="Your password"/>
        </div>
        <div className='relative'>
        <TextInput  value={Password} onChange={e=>setPassword(e.target.value)} required shadow placeholder='enter your password' type={HideShowpasswords ? "password" : "text"} />
        
      <span className='absolute right-4 top-1/4'>
      
      
      <span
      onClick={() => {
        setHideShowpasswords(!HideShowpasswords);
      }}
    >
  
      {HideShowpasswords ? (
        <BiShow color=" #cc0000" size={21} />
      ) : (
        <BiHide color="#0f9b0f" size={21} />
      )}
    </span>
      </span>
        </div>
      </div>
      <div className="flex items-center gap-2 my-4">
      <Checkbox  />
      <Label className="flex" >
          <p className="text-cyan-600 hover:underline dark:text-cyan-500" > remember me </p>
      </Label>
    </div>
      <Button className="w-full" type="submit">Log in</Button>
    </form>
    <p className="text-sm font-semibold text-cyan-600 dark:text-gray-400">
    Don't have an account? <Link className=' font-medium text-primary-600 hover:underline dark:text-primary-500 text-cyan-800' to={"/signup"} >Sign up</Link></p>
    </div>
  )
}


