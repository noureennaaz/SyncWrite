import './App.css';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import Login  from './components/login';
import FilePage from './components/FilePage';
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
function App() {
  return (
    <Routes>
       <Route default path='*' element={<FilePage/>}/>
        {/* <Route default path="/login" element={<Login/>} />
        <Route default path="/signup" element={<SignUp/>} /> */}
        {/* <Route path="/blog/:blogID" element={<BlogPage />} />
        <Route path="/tags/:tag" element={<TagPage />} />
        <Route path="/categories/:category" element={<Category/>} /> */}

      </Routes>
  );
}

export default App;
