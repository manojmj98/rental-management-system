import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/common/Message";
import Loader from "../../components/common/Loader";
import {Link} from 'react-router-dom';
// import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import NavBar from "../common/NavBar";
import  { useGetproductsMutation } from '../../slices/userApiSlice';
import React,{useState} from 'react';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";

//TODO : This doesn't work yet - have to identify the reason for failure

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const [robots, setrobots] = useState(null);
  console.log("Before calling get products mutation");
  const [getProducts, { data }] = useGetproductsMutation(); 
  console.log("data:",JSON.stringify(data));
  React.useEffect(() => {
    getProducts();
    //console.log("Inside useeffect:",response.data);
  }, []);
  React.useEffect(() => {
    if (data) {
      setrobots(data.products);
    }
  }, [data]);
const userInfo = useSelector(state => state.auth.userInfo?.id)
const authenticated = useSelector(state => state.auth.userInfo)
const navigate = useNavigate();
if (!authenticated) {
  navigate("/");
  return null;
}
  console.log("data-part2:",JSON.stringify(data))
  const isLoading = true;
  if (robots){
    console.log("I don't know why I am here");
  }
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
      </Row>
      <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      // onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      <footer className="fixed bottom-0 py-4 text-center text-gray-300">
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </>
    </>
  );
};

export default ProductListScreen;
