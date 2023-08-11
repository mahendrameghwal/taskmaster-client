import React, {useState, useEffect, Fragment, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { TextInput , Label, Button , Alert } from "flowbite-react";
import { BiShow } from "react-icons/bi";
import Popup from "./Popup";
import { motion ,  Reorder  } from "framer-motion";




const Todo = ()=>{
    const navigate = useNavigate();
    const [taskname, settaskname] = useState("");
    const [time, settime] = useState("");
    const [IsCompleted, setIsCompleted] = useState(false);
    const [Alltask, setAlltask] = useState([]);
    const [isaddtask, setisaddtask] = useState(true);
    const [showEditPopup, setShowEditPopup] = useState(false);
   const [ SelectedTask ,setSelectedTask] = useState(null)

    
 
    //config for sending token and
    const tokens = localStorage.getItem("token");
    const config = { headers: { Authorization: "Bearer " + tokens } };

     //get data database
 
     const FetchData = async () => {
      try {
        const GetURL = "https://taskmaster-h50j.onrender.com";
        const Tododata = await axios.get(GetURL, config);
        setAlltask(Tododata.data);
        
      } catch (error) {
        alert(error.message);
      }
    };

    //edit and update Task from database 

  
 
    useEffect(() => {
      if (tokens) {
        FetchData();
      } else {
        navigate("/signin");
      }
    },[showEditPopup]);


  
    const EditAndUpdateTask = (task)=>{
      setShowEditPopup(!showEditPopup) 
      setSelectedTask(task);
   
     }
    const handleCloseEditPopup = () => {
      setShowEditPopup(false);
     };
  
   





const handleUpdateTask =async (taskId, updatedTaskText) => {
  try {
   if(taskId){
    await axios.post('https://taskmaster-h50j.onrender.com/edittodo',{taskId,updatedTaskText},config);
    FetchData();
   }
 } catch (error) {
   alert(error.message)
 }
 };


   
      // Add task
 const HandleSubmit = async e => {
   e.preventDefault();
   const AddURL = "https://taskmaster-h50j.onrender.com/addtask";
    
    const Tasks = {
      taskname: taskname,
      time: time,
      IsCompleted: IsCompleted,
      };
    
   const result = await axios.post(AddURL, Tasks, config);
        
   if (result.data.success) {
          setisaddtask(false);
          settaskname("");
          settime("");
          FetchData();
    } 
    else
    {
     alert(result.data.message);
    }
  };
      
  
  // remove task
   const removetask = async id => {
    try 
    {
     await axios.delete(`https://taskmaster-h50j.onrender.com/remove/${id}`, config);
     FetchData();
   } 
   catch (error) {
   Alert(error.message);
   }
   };

      
   //update task
  const updatedtask = async id => {
   try 
    {
   await axios.patch(`https://taskmaster-h50j.onrender.com/update/${id}`, "", config);
   FetchData();
    } catch (error) 
   {
   Alert(error.message);
   }
  };
    
    
  const Searchdata =async(searchtext)=>{
  try 
   {
   if(searchtext){
      const SearcheData =   await axios.get(`https://taskmaster-h50j.onrender.com/search/${searchtext}`,config);
      SearcheData.data.success && setAlltask(SearcheData.data.FilterData)
      
   }else{
      FetchData();
    }
  
  } catch (error) 
  {
    Alert(error.message);
  }
  }


    //filter By status 
 
  const FilterByStatus = async (Statustext)=>{
      try {
      if(Statustext){
        const FilterByStatusData =  await axios.get(`https://taskmaster-h50j.onrender.com/status/${Statustext}`,config);
        FilterByStatusData.data.success ? setAlltask(FilterByStatusData.data.data):alert(FilterByStatusData.data.message)
         
      }else {
          FetchData();
       }
      } catch (error) {
        alert(error.message);
      }
   }
   const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
    y: 0,
    opacity: 1
    }
  };

return(


 <div>
   {
isaddtask  ?

<Fragment>
<motion.div
className="box"
initial={{ opacity: 0 }}
animate={{ opacity:1 }}
transition={{ type: "spring" }}
variants={container}
>

    <form onSubmit={HandleSubmit}>
    
    <div className="drop-shadow-md px-3 rounded-xl bg-slate-300 mx-auto mt-12 py-20 flex max-w-xl flex-col gap-4 max-[768px]:w-11/12">
    <div className="my-4">
      <div className=" text-left mb-2 mx-1 block">
        <Label className="text-slate-500 font-bold text-xl" value="Your Task"/>
      </div>
      <motion.div variants={item}>
      <TextInput   onChange={e => { settaskname(e.target.value);  }}  value={taskname} required shadow placeholder='Example: go to school' type="text" />
      
      </motion.div>
    </div>
    <div className="my-4">
    <div className=" text-left mb-2 mx-1 block">
      <Label className="text-slate-500 font-bold text-xl" value="Select date"/>
    </div>
    <motion.div variants={item}>
    <TextInput  onChange={e => {   settime(e.target.value) }}   value={time}  shadow  type="date" placeholder="dd-mm-yyyy" 
    min="1997-01-01" max="2030-12-31" />
    </motion.div>
  </div>
 <div className="my-4 flex gap-2 max-[768px]:flex-col">
 <Button className="w-2/4 max-[768px]:w-full my-3" type="submit">Add task</Button>
 
 {
  isaddtask && <Button onClick={() => { setisaddtask(false) }} className="w-2/4 flex items-center gap-8 max-[768px]:w-full my-3" > Show Task <BiShow size={20}/> </Button>
 }
 </div>
 </div>
    
    </form>
    </motion.div>
       </Fragment>
    :

 <div className="w-11/12 mx-auto mt-5 relative overflow-x-auto shadow-none sm:rounded-lg">
 <button className="text-white my-4 bg-blue-600 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"  onClick={() => { setisaddtask(true) }}>go to back</button>

    {
      
           
            Alltask.length ===0  ? (<div className=" font-semibold  min-h-screen grid place-items-center">
       <p className="text-3xl">No task found</p>
       <div>
       <select onChange={(e)=>{FilterByStatus(e.target.value)}} name="status">
    <option value="all">All</option>
    <option value="pending">pending</option>
    <option value="completed">completed</option>
  </select>
      
        
    </div>
       </div>)
       
       :
      (

        <Fragment>
        
    {
      showEditPopup &&<Popup task ={SelectedTask} OnUpdate={handleUpdateTask}   onClose={handleCloseEditPopup}/>
    }   

            
    <div className="  flex items-center justify-between pb-4">
 
    <div>
  <select onChange={(e)=>{FilterByStatus(e.target.value)}} name="gender">
       <option value="all">All</option>
       <option value="pending">pending</option>
       <option value="completed">completed</option>
  </select>
    </div>
    <label  className="sr-only">Search</label>
    <div className="relative">
        
        <input type="text" onChange={(e)=>{Searchdata(e.target.value)}} className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for tasks"/>
    </div>
</div>
<motion.div
className="box"
initial={{ opacity: 0 }}
animate={{ opacity:1 }}
transition={{ type: "spring" }}
variants={container}
>
<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="mb-4">
            
            <th scope="col" className="px-6 py-3">
                Your Task
            </th>
            <th scope="col" className="px-6 py-3">
            Edit 
            </th>
            <th scope="col" className="px-6 py-3">
                Status
            </th>
            <th scope="col" className=" text-center px-6 py-3">
              Action
            </th>
            <th scope="col" className=" text-center px-6 py-3">
              Date
            </th>
        </tr>
    </thead>


{
  Alltask && Alltask.map((todo,i)=>(
 
    
    <tbody> 


    <motion.tr variants={item} className="bg-slate-100 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600">
       
        <td key={i} className="w-1/5 text-base break-all p-3 items-center font-medium text-gray-900  dark:text-white">
           {todo.taskname}
        </td>
        <td className="px-3  border-2 py-4">
   {
    !todo.IsCompleted ?     <button key={i} onClick={()=>{EditAndUpdateTask(todo)}} type="button" className=" text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none  font-medium rounded-md text-sm inline-flex items-center max-w-md:px-3 max-w-md:py-1.5   px-3 py-2 text-center mr-2">
    Edit Task
</button>: <p className="py-1 w-3/5 text-center font-semibold rounded-md bg-gray-800 text-gray-300 ">Can't can edit</p>
   }
        </td>
        <td className="px-3  border-2 py-4">
            <div className="flex items-center">
                {!todo.IsCompleted?<div  className="py-1 px-3  font-semibold rounded-md text-red-800 bg-red-300 mr-2"> pending</div>:<div className="py-1 px-3 font-semibold rounded-md text-green-800 bg-green-300 mr-2"> completed</div>}
            </div>
        </td>
        <td className="px-3  border-2 py-4 text-center">
        {
          !todo.IsCompleted ?<button onClick={()=>{updatedtask(todo._id)}}  type="button" className="text-white bg-green-600 hover:bg-green-800 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
          Complete
      </button>:<button  onClick={()=>{removetask(todo._id)}}  type="button" className="text-white bg-red-600 hover:bg-red-800 focus:outline-none  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
      Delete
      </button>
      
        }
        </td>
        <td className="px-3  border-2 py-4 text-center">
        <p className="text-base font-semibold" >{todo.time}</p>
      
        </td>
    </motion.tr>
    </tbody>
    
  ))  
}
</table>

</motion.div>
 </Fragment>
        
      )
    }
</div>
  }
</div>
)
}

export default Todo;  




