import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  useGetProductByIdQuery,
  useCreateReviewMutation,
} from '../../slices/productApiSlice';
import NavBar from '../common/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import AddressInput from '../ownerDashboard/AddressInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RenterItemPage = () => {
  const [qty, setQty] = useState(1);

  const { id } = useParams();

  const { data: robot } = useGetProductByIdQuery({ id });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [url,setUrl] = useState('')
  var imageUrl= ''

  useEffect(() => {
    setUrl(window.location.href)
  }, []);

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    if (!userInfo) {
      return navigate('/login');
    }
    dispatch(addToCart({ qty, ...robot }));
  };

  const userHasReviewed =
    robot &&
    robot.reviews &&
    robot.reviews.some((review) => review.id === userInfo?.id);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createReview({ id, rating, comment });
      if (res.error) {
        toast.error('Your request could not be processed');
      } else {
        toast.success('Review created successfully');
        setRating(0);
        setComment('');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  function renderStars(rating) {
    const fullStars = '★'.repeat(Math.floor(rating));
    const halfStar = rating % 1 !== 0 ? '½' : '';
    const emptyStars = '☆'.repeat(Math.floor(5 - rating));
    return `${fullStars}${halfStar}${emptyStars}`;
  }

  return (
    <>
      <NavBar />
      {robot && (
        <div className='container mx-auto mt-8 flex flex-col items-center'>
          <h2 className='text-2xl font-bold mb-4'>{robot.name}</h2>
          <img
            src={`${url}/../../../${robot.image}`}
            alt={robot.name}
            className="mb-4 rounded-lg"
            style={{ width: '400px', height: '400px' }}
          />
          <p className='text-gray-700 mb-4'>{robot.description}</p>
          <p className='text-2xl font-bold text-green-600'>${robot.price}</p>
          <div className='w-3/6'>
            <AddressInput
              lat={robot.latitude}
              lng={robot.longitude}
            ></AddressInput>
          </div>

          <div className='w-3/6'></div>

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

          <h2 className='text-2xl font-bold mb-4'>Previous Reviews</h2>
          <ul>
            {robot.reviews.map((review) => (
              <li key={review._id}>
                <div
                  style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    margin: '10px',
                    borderRadius: '5px',
                  }}
                >
                  <strong>Username:</strong> {review.name} <br />
                  <strong>Rating:</strong> {renderStars(review.rating)} <br />
                  <strong>Review:</strong> {review.comment}
                </div>
              </li>
            ))}
          </ul>
          {userHasReviewed ? (
            <p>You have already reviewed this product.</p>
          ) : (
            <>
              <h2 className='text-2xl font-bold mb-4'>Create Review</h2>
              <form onSubmit={submitHandler}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>
                  Rating:
                  <input
                    type='number'
                    min='0'
                    max='5'
                    step='0.5'
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                  />
                </label>
                <br />
                <label style={{ display: 'block', fontWeight: 'bold' }}>
                  Comment:
                  <textarea
                    row='3'
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </label>
                <br />
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4'
                >
                  Submit Review
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default RenterItemPage;
