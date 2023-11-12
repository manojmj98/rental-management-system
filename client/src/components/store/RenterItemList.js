import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProductByIdQuery, useCreateReviewMutation} from '../../slices/productApiSlice';
import NavBar from '../common/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../Rating';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import Message from '../Message';

const RenterItemPage = () => {
  const [qty, setQty] = useState(1);

  const { id } = useParams();

  const { data: robot } = useGetProductByIdQuery({ id });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    if (!userInfo) {
      return navigate('/login');
    }
    dispatch(addToCart({ qty, ...robot }));
  };

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id,
        rating,
        comment,
      }).unwrap();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  

  return (
    <>
      <NavBar />
      {robot ? (
        <div className='container mx-auto mt-8 flex flex-col items-center'>
          <h2 className='text-2xl font-bold mb-4'>{robot.name}</h2>
          <img
            src='https://picsum.photos/200/300'
            alt={robot.name}
            className='mb-4 rounded-lg'
          />
          <p className='text-gray-700 mb-4'>{robot.description}</p>
          <p className='text-2xl font-bold text-green-600'>${robot.price}</p>
          <input
            type='number'
            className='mt-1 px-4 py-2  border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white'
            placeholder='Answer'
            value={qty}
            onChange={(ev) => {
              const input = Number(ev.target.value);
              if (input > 0) setQty(input);
            }}
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4'
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      ) : (
       <Row className='review'>
        <Col md={6}>
          <h2>Reviews</h2>
          {robot.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
            {robot.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>

              {loadingProductReview && <Loader />}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group className='my-2' controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      required
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row> 
      )};
    </>
  );
};

export default RenterItemPage;
