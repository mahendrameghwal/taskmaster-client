
import { Dropdown, Navbar , Avatar } from 'flowbite-react';
import { Fragment, useEffect , useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink , Link } from 'react-router-dom';
import axios from "axios";


export default function NavbarWithDropdown() {

  
 
  
  const [showTime, SetshowTime] = useState();
  const [ user, setuser] = useState(null);
  const [ show, setshow]= useState(false)
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: "Bearer " + token } };

  useEffect(() => {
    setInterval(gettime, 1000);
    if (token) {
      Getuser() 
      navigate("/")
    }else {
      navigate("/signin")
    }
   
  }, [token,showTime]);
  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

const Getuser = async () => {
  try {
    const Userdata = await axios.get("http://localhost:8800/getuser", config);
    
    if (Userdata.data) {
      setuser(Userdata.data);
      
    } else {
      alert(Userdata.message);
    }
  } catch (error) {
    alert(error.message);
  }
};
console.log(user);

  
  const gettime = () => {
    const date = new Date();
    const time =
      (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) +
      ":" +
      `${
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      }`.concat(date.getHours() >= 12 ? " PM" : " AM");
    SetshowTime(time);
  };


  return (
    <Navbar className='bg-slate-300 px-3' fluid  >
      <Navbar.Brand ><span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Task Master </span></Navbar.Brand>



      
      {
        token && 
        <Fragment>

         


        {
          show &&
          <div className=" z-40 right-6 ">
       
          
        
          <div class="md:right-0.5 md:top-0 absolute right-10 top-6 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
          <div className='flex justify-center'>
          {user.gender === 'male' && (
            <img width={50} src="https://cdn-icons-png.flaticon.com/512/145/145843.png?w=740&t=st=1691152803~exp=1691153403~hmac=27cf7ac3e13a68222acd042af37cc690c2e43e84812dc1ec1fab900992fefbd6" alt="Man Avatar" />
          )}
          {user.gender === 'female' && (
            <img width={50} src="https://img.freepik.com/premium-vector/3d-smiling-woman-avatar-character-with-turquoise-hair_541075-1060.jpg?w=740" alt="Woman Avatar" />
          )}
          {user.gender === 'transgender' && (
            <img width={50} src="https://img.freepik.com/free-vector/watercolor-pride-day-flag_1199-217.jpg?w=740&t=st=1691154223~exp=1691154823~hmac=4f9a953190c394dd1efd545dc12ad17a19210fb2295c915fa2ce6574b4997ca0" alt="Transgender Avatar" />
          )}
           </div>
        
          <div class="py-3 px-4">

          <span class="block text-sm font-light text-gray-500 truncate dark:text-gray-400">gender : <strong>{user.name?user.name:"no choosen name"}</strong></span>
            <span class="block text-sm font-light text-gray-500 truncate dark:text-gray-400">{user.email}</span>
            <span class="block text-sm font-light text-gray-500 truncate dark:text-gray-400">gender : <strong>{user.gender?user.gender:"no choosen gender"}</strong></span>

        </div>
        <ul class="py-1 font-light text-gray-500 dark:text-gray-400" >
            <li>
                <p  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">{user.address?user.address:"no address"}</p>
            </li>
            <li>
                <p  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account settings</p>
            </li>
        </ul>
        <ul class="py-1 font-light text-gray-500 dark:text-gray-400" >
            <li>
                <p  class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="mr-2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path></svg> My likes</p>
            </li>
            <li>
                <p  class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><svg class="mr-2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>{user.phone}</p>
            </li>
            <li>
                <p class="flex cursor-pointer justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <span class="flex items-center">
                        <svg aria-hidden="true" class="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg> Pro version
                    </span>
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </p>
            </li>
            
        </ul>
        <ul class="py-1 font-light text-gray-500 dark:text-gray-400" >
            <li>
                <button onClick={onLogout} class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</button>
            </li>
        </ul>
    </div>
    
    
    </div>
  }
  <Navbar.Toggle />
      <Navbar.Collapse>
      <NavLink  style={({ isActive }) => ({ 
        color: isActive ? '#008B8B' : 'white' })} to={"/"} active >Home</NavLink>
        <Link onClick={()=>{setshow(!show)}} > show profile</Link>
        <NavLink   style={({ isActive }) => ({ 
          color: isActive ? '#008B8B' : 'white' })} to={"/about"}> About</NavLink>
        <NavLink   style={({ isActive }) => ({ 
          color: isActive ? '#008B8B' : 'white' })} to={"/contact"}> Contact</NavLink>
          <NavLink to={"/signin"} onClick={onLogout}   style={({ isActive }) => ({ 
            color: isActive ? '#008B8B' : 'white' })} > Logout</NavLink>
      </Navbar.Collapse>
        
        
        </Fragment>
      }

      
    </Navbar>
  )
}


