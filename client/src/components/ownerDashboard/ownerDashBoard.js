import React, { useState } from "react";
import logo from "../../logo.svg";
import Card from "../common/Card";
import NavBar from "../common/NavBar";
import { FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useGetproductsMutation } from "../../slices/userApiSlice";
import Productpage from "./Productpage";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
function OwnerDashBoard(props) {
const [robots, setrobots] = useState(null)

const [getProducts, { data }] = useGetproductsMutation(); 
const [selectedTab, setSelectedTab] = useState("myAds");

React.useEffect(() => {
  getProducts();
}, []);

React.useEffect(() => {
  if (data) {
    setrobots(data.products);
  }
}, [data]);
var filterdrobots = null;
const userInfo = useSelector(state => state.auth.userInfo?.id)
const authenticated = useSelector(state => state.auth.userInfo)
const navigate = useNavigate();
if (!authenticated) {
  navigate("/");
  return null;
}
if(robots){
  filterdrobots = robots.filter((robot) => robot.owner === userInfo);
}
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-5 bg-white ">
        <div className="flex flex-col items-center h-screen pt-3/12 col-span-1 w-100">
          <img src={logo}></img>
          <button className="bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded" onClick={() => setSelectedTab("myAds")}>
            My Ads
          </button>
          
          <button className="bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded" onClick={() => setSelectedTab("myBookings")}>
            My Bookings
          </button>
          <button className="bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded">
            Transactions
          </button>
          <button className="bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded">
            Reports
          </button>
          <button className="bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded" onClick={() => setSelectedTab("settings")}>
            Settings
          </button>
        </div>
        {selectedTab === "myAds" && (<section className="md:container md:mx-auto flex flex-col items-center mt-4 col-span-4 w-80">
        <div className="flex items-center space-x-2 pb-4">
  <FaPlus className="text-green-300 text-2xl" />
  <Link to={`/robotInput`} className="text-blue-500 font-semibold hover:underline">
    Add a Robot Listing
  </Link>
</div>
    <div className="grid grid-cols-3 gap-6 w-4/5">
          { 
          filterdrobots && filterdrobots.map((robot) => (
            <Link to={`../productpage/${robot._id}`} >
            <Card
            key={robot._id}
            title={robot.name}
            description={robot.description}
            price ={robot.price}
          />  
            </Link>
            ))}
          </div>
        </section>)}
        {selectedTab === "settings" && (
        <section className="md:container md:mx-auto flex flex-col items-center mt-4 col-span-4 w-80">
          {/* Content for the Settings tab */}
          <h1>Settings Page</h1>
          {/* Add any additional content specific to the Settings tab */}
        </section>
      )}
        
    </div>
    </>
  );
}

export default OwnerDashBoard;
