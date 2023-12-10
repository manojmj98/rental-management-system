import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function CreditCardForm() {
  const [payment, setPayment] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });


  function onInputFocus({ target }) {}

  function onInputUpdate({ target }) {
    console.log({ [target.name]: target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Perform form submission logic here
    
    // Redirect to the success page
    window.location.href = "/success";
  }

  const { name, number, expiry, cvc, issuer } = payment;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={onInputUpdate}
                onFocus={onInputFocus}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={onInputUpdate}
                onFocus={onInputFocus}
              />
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={onInputUpdate}
                  onFocus={onInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={onInputUpdate}
                  onFocus={onInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreditCardForm;
