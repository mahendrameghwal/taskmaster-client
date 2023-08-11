import React from 'react'
import { Link } from 'react-router-dom'

const Aboutus = () => {
  return (
    <div className='w-4/5 mx-auto grid place-items-center min-h-screen'>
    
<div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <img className="rounded-t-lg" src="https://hbr.org/resources/images/article_assets/2020/08/Aug20_11_1207541182-2.gif" alt="task-gif" />

<div className="p-5">
    
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
         Organize and Boost Your Productivity!</h5>
    
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
    A Todo app is a task management tool that helps users create, track, and prioritize tasks. It enhances productivity through deadlines, reminders, and editing options. Accessible across devices, it offers flexibility with sorting and collaboration features. With its user-friendly interface and organizational capabilities, a Todo app is essential for efficiently managing responsibilities and boosting overall efficiency</p>
   <Link to={"https://www.linkedin.com/in/mahendrakumar99"}>
   <button   className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
   more about me 
</button>
   </Link>
</div>
</div>

    
    </div>
  )
}

export default Aboutus