"use client"
import React, { useEffect, useState } from 'react'

const page = () => {

  const [sessionData, setSessionData] = useState(null);
  
console.log("Session Data:", sessionData); // Debugging line to check if session data is being set correctly
  useEffect(() => {
    // Retrieve data from sessionStorage when the page mounts
    const savedData = sessionStorage.getItem("interview_session");
    if (savedData) {
      setSessionData(JSON.parse(savedData));
      
    //   // Optional: Clean it up immediately so it behaves exactly like React Router's state 
    //   // (it won't persist if they refresh this page manually)
    //   sessionStorage.removeItem("interview_session");
    }
  }, []);

  if (!sessionData) return <p>Loading session...</p>;
  return (
    <div>page</div>
  )
}

export default page