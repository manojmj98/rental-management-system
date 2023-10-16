import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useGetproductbyidMutation } from "../../slices/userApiSlice";

const Productpage = () => {
const [getproductbyId , {data}] = useGetproductbyidMutation() 
let { id } = useParams();
const [robot,setrobot] = useState(null)
  React.useEffect(() => {
    let body = {"id":id}
    getproductbyId(body);
  }, [id, getproductbyId]);
  React.useEffect(() => {
    if (data) {
      setrobot(data)
    }
  }, [data]);

  return (
    robot &&
    (<div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">{robot.name}</h2>
      <img
        src="https://picsum.photos/200/300"
        alt={robot.name}
        className="mb-4 rounded-lg"
      />
      <p className="text-gray-700 mb-4">{robot.description}</p>
      <p className="text-2xl font-bold text-green-600">${robot.price}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
        update
      </button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4">
        delete
      </button>
    </div>)
  );
};

export default Productpage;
