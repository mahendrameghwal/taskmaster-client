
import {  Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from "axios"
import { Link } from 'react-router-dom';

export default function Signup() {



  const [name, setname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setphone] = useState("");
  const [Address, setAddress] = useState("");
  const [gender, setGender] = useState("");


  const navigate = useNavigate();




  const HandleSubmit = async e => {
    e.preventDefault();
    
    const Users = {
      name: name,
      email: Email,
      password: Password,
      phone: Phone,
      address: Address,
      gender:gender
    };
    
    console.log(Users);
    try {
      const res = await axios.post("https://taskmaster-h50j.onrender.com/signup", Users);
      
      res.data.success ? navigate("/signin") : alert(res.data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className=" w-11/12 drop-shadow-md px-4 rounded-xl bg-slate-300 mx-auto mt-7 py-6 flex max-w-md flex-col gap-4">
    <form onSubmit={HandleSubmit} >
    <p className='text-center text-2xl capitalize font-semibold text-cyan-600 hover:underline dark:text-cyan-500'>Create your acount</p>
    <div>
    <div className=" text-left  mx-1 block">
      <Label className='my-4'  value="Your name" />
    </div>
    <TextInput  value={name ||"" }
    onChange={e => {
      setname(e.target.value);
    }}  placeholder="name" required  shadow type="text"/>
  </div>
      <div>
        <div className=" text-left  mx-1 block">
          <Label className='my-4'  value="Your email" />
        </div>
        <TextInput   value={Email ||""}
        onChange={e => {
          setEmail(e.target.value);
        }} placeholder="abc@gmail.com" required  shadow type="email"/>
      </div>
      <div>
        <div className=" text-left  mx-1 block">
          <Label className='my-4' value="Your password"/>
        </div>
        <TextInput  value={Password ||""}
        onChange={e => {
          setPassword(e.target.value);
        }}  required shadow placeholder='enter your password' type="password" />
      </div>
      <div>
        <div  className=" text-left  mx-1 block">
          <Label className='my-4' value="city"/>
        </div>
        <TextInput  value={Address ||""}
        onChange={e => {
          setAddress(e.target.value);
        }} required shadow placeholder='city' type="text" />
      </div>
      
      <div>
      <div className=" text-left  mx-1 block">
        <Label className='my-4' value="Phone"/>
      </div>
      <TextInput className='max-md:bg-red-500 '  value={Phone ||""}
      onChange={e => {
        setphone(e.target.value);
      }} required shadow placeholder='phone number' type="number" />
    </div>

      <div className='my-2'>
        <div className="  text-left  block">
          <Label  value="choose Gender"/>
        </div>
        <select onChange={(e) => setGender(e.target.value)} className='px-2' name="gender" id="gender">
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="transgender">Transgender</option>
      </select>
      </div>
     
      <Button className="w-full"  type="submit"> Register new account </Button>
    </form>
    <p className="text-sm font-semibold text-cyan-600 dark:text-gray-400">
   Already have an account? <Link to={"/signin"}  className=' text-cyan-800 font-medium text-primary-600 hover:underline dark:text-primary-500' >Login here</Link>
</p>
    </div>
  )
}


