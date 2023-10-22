import "../App.css";
import NavBar from "./common/NavBar";
import logo from "../logo.svg";
import React, { useState } from "react";
import { FaPlus } from 'react-icons/fa';
import { Link } from "react-router-dom";
import ProductListScreen from "../components/screens/ProductListScreen";
import UserListScreen from "./screens/UserListScreen";
import OrderListScreen from "./screens/OrderListScreen";
function AdminPage() {
    
const [selectedTab, setSelectedTab] = useState("Orders");
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-5 bg-white ">
        <div className="flex flex-col items-center h-screen pt-3/12 col-span-1 w-100">
          <img src={logo}></img>
          <button
            className="bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded"
            onClick={() => setSelectedTab("Orders")}
          >
            Orders
          </button>

          <button
            className="bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded"
            onClick={() => setSelectedTab("Users")}
          >
            Users
          </button>
          <button className="bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded" 
            onClick={() => setSelectedTab("Products")}>
            Products
          </button>
          <button
            className="bg-white text-gray-900 hover:bg-blue-700 w-full py-2 px-4 rounded"
            onClick={() => setSelectedTab("Settings")}
          >
            Settings
          </button>
        </div>
        {selectedTab === "Products" && (
          <section className="md:container md:mx-auto flex flex-col items-center mt-4 col-span-4 w-80">
            <div className="flex items-center space-x-2 pb-4">
            <ProductListScreen />
            </div>
            {/* <div className="grid grid-cols-3 gap-6 w-4/5">
              {filterdrobots &&
                filterdrobots.map((robot) => (
                  <Link to={`../productpage/${robot._id}`}>
                    <Card
                      key={robot._id}
                      title={robot.name}
                      description={robot.description}
                      price={robot.price}
                    />
                  </Link>
                ))}
            </div> */}
          </section>
        )}
        {selectedTab === "Users" && (
          <section className="md:container md:mx-auto flex flex-col items-center mt-4 col-span-4 w-80">
            <div className="flex items-center space-x-2 pb-4">
            <UserListScreen />
            </div>
          </section>
        )}
        {selectedTab === "Orders" && (
          <section className="md:container md:mx-auto flex flex-col items-center mt-4 col-span-4 w-80">
            <div className="flex items-center space-x-2 pb-4">
            <OrderListScreen />
            </div>
          </section>
        )}
        {selectedTab === "Settings" && (
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

export default AdminPage;
