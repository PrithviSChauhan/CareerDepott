import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/ui/shared/Navbar'

// const appRouter = createBrowserRouter([
//   {
//     path:"/",
//     element:<Home/>
//   },
//   {
//     path:"/Login",
//     element:<Login/>
//   },
//   {
//     path:"/signup",
//     element:<Signup/>
//   }
// ])

function App() {

  return (
    <>
    <Navbar/>
    </>
  )
}

export default App
