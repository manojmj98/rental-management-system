import React from 'react';
import AddressInput from './AddressInput';

function BookingsPage() {
  const data = {
    "user": "userId123",
    "orderItems": [
      {
        "name": "Robot 1",
        "qty": 2,
        "price": 15,
        "product": "654f76f03d28ed8443beec02"
      }
    ],
    "customerAddress": {
      "latitude":39.1778971,
      "longitude":-86.5288379,
    },
    "pickupAddress": {
      "address": "1320 E 10th St",
      "city": "Bloomington",
      "postalCode": "47405",
      "country": "United States"
    },
    "paymentMethod": "Credit Card",
    "paymentResult": {
      "id": "paymentId123",
      "status": "succeeded",
      "update_time": "2023-01-01T12:34:56Z",
      "email_address": "user@example.com"
    },
    "itemsPrice": 30,
    "taxPrice": 5,
    "totalPrice": 35,
    "isPaid": true,
    "paidAt": "2023-01-02T10:30:00Z",
    "status": "Processing",
    "paymentStatus": "Completed"
  }

  return (
    <>
    <div className="max-w-2xl mx-auto p-4 rounded-md">
      
      <h2 className="text-3xl font-bold mb-6">Order Details</h2>
    
      <div className="flex flex-col">
        <div className="mb-4">
          <p className="text-lg"><strong>Product Name:</strong> {data.orderItems[0].name}</p>
          <p className="text-lg"><strong>Order Status:</strong> {data.status}</p>
        </div>
    
        <div className="border-t pt-4">
          <p className="text-sm"><strong>Payment Method:</strong> {data.paymentMethod}</p>
          <p className="text-sm"><strong>Total Price:</strong> ${data.totalPrice.toFixed(2)}</p>
          <p className="text-sm"><strong>Payment Status:</strong> {data.paymentStatus}</p>
        </div>
      </div>
          <AddressInput lat = {data.customerAddress.latitude} lng = {data.customerAddress.longitude}/>
        </div>
    </>
    
  );
}

export default BookingsPage;
