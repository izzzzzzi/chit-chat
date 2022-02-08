import Navbar from './components/Navbar';
// import Home from './pages/Home'
import Post from './pages/Post'
import Login from './pages/Login'
import "./App.css"

const App = () => {
  return (
   <div>
     <Navbar/>
    {/* <Post/> */}
    <Login/>
   </div>
  );
}

export default App;
