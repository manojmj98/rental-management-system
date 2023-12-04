import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useNavigate } from 'react-router-dom';

function CreditCardUi() {
  const [payment, setPayment] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });
  const [goToSuccess, setGoToSuccess]=React.useState(false);
  const navigate = useNavigate();

  if(goToSuccess){
    const isValidNumber= /^\d{16}$/.test(payment.number);
    const isValidExpiry=/^\d{2}\/\d{2}$/.test(payment.expiry);
    const isValidCVC=/^\d{3,4}$/.test(payment.cvc);
    
    if(isValidCVC&&isValidExpiry&&isValidNumber){
        return navigate('/success');
    }
    else{
        console.log("Transaction Error");
    }
    
  }


  function handleCallback({ issuer }, isValid) {
    if (isValid) {
      setPayment({ issuer });
    }
  }
  function onInputFocus({ target }) {}
  function onInputUpdate({ target }) {
    console.log({ [target.name]: target.value });
  }
  function handleSubmit(e) {}
  const { name, number, expiry, cvc, focused, issuer } = payment;
  return (
    <div key="Payment">
      <div>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focused}
          callback={handleCallback}
        />
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 mt-4">
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="\d{16}"
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
            <button onClick={()=>{setGoToSuccess(true);
            }}
            className="btn btn-dark">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreditCardUi;