import "./popup.css";
import React, { Fragment, useEffect, useState } from "react";


const Popup = ({onClose , task , OnUpdate}) => {
    const [editedTask, setEditedTask] = useState(task.taskname);
  useEffect(()=>{



  },[editedTask])

    const handleChange = (event) => {
        setEditedTask(event.target.value);
      };
    
   const handleSubmit =()=>{

    OnUpdate(task._id, editedTask)
    onClose()
}    

  return (
    <Fragment>
    <div   className="bg-gray-300  bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 right-0  z-50 w-full  md:h-full ">
    <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
        <div>
        <label for="email" className="my-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type your task</label>
        <input  onChange={handleChange} type="email" name="email" id="email" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="type your updated task 🧐" required/>
    </div>
            <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
                <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                    <button onClick={()=>{onClose()}} type="button"  className=" bg-red-600 py-2 px-4 w-full text-sm font-medium text-white rounded-lg border border-gray-200 sm:w-auto hover:bg-red-500 focus:ring-4 ">Cancel</button>
                    <button onClick={handleSubmit}  type="button" className=" bg-green-600 py-2 px-4 w-full text-sm font-medium text-white rounded-lg border border-green-200 sm:w-auto hover:bg-green-500 focus:ring-4 ">Update task</button>
                </div>
            </div>
        </div>
    </div>
  </div>
    </Fragment>
  );
};

export default Popup;
