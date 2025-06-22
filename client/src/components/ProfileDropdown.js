import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../middlewares/Auth";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { fetchUserInfo ,isLoggedIn} = useAuth()
  const[ profileImage , setprofileImage]=useState(null)
  const[user ,setUser] = useState("")

  // Toggle Dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    fetchInfo()
  };

  const fetchInfo = async (id) => {
    try {
      const data = await fetchUserInfo(isLoggedIn); 
      if (!data) {
        throw new Error("No data received");
      }
      setprofileImage(data.image)
      setUser(data.fname)
  
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // setDashboardData(null); // Reset data in case of failure
      // setLoader(false);
      return null;
    }
  };
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    setprofileImage(fetchInfo())
    console.log(profileImage)
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Clickable Profile Avatar */}
      <div
        className="w-8 h-8 flex justify-center items-center cursor-pointer bg-orange-500 rounded-full hover:scale-[1.03] hover:bg-orange-600 transition-transform"
        onClick={toggleDropdown}
      >
        {
          (user && user.profilePic)? (
            <img
          src={ "https://via.placeholder.com/40"}
          alt="Profile"
          className="w-full h-full rounded-full"
        />
          ) :(<FaUserCircle size={30}/>)
        }
        
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-3 z-50"
        >
          {/* Profile Info */}
          <div className="flex items-center space-x-3 p-3 border-b">
          
          
            <div className="h-10 w-10">
            <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full rounded-full"
        />
            </div>
          
            <div>
              <p className="text-gray-800 font-semibold">{user}</p>
              <p className="text-sm text-gray-500">Manage Account</p>
            </div>
          </div>

          {/* Menu Options */}
          <ul className="mt-2 text-slate-700 text-sm font-normal">
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Manage Account</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Notifications</li>
            <li className="p-2 text-red-500 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
