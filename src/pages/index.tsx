import { useEffect } from "react"

export default function Home() {

  useEffect(()=>{
    fetch('http://localhost:3039/episodes')
      .then(response=> response.json() )
      .then(data=> console.log(data))
  },[])

  return (
    <h1>index page</h1>
  )
}



