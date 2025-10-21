import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaGooglePay, FaApplePay } from 'react-icons/fa';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add payment processing logic here
  };

  return (
    <div className="payment-container">
      <div className="payment-methods">
        <button
          className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('card')}
        >
          <FaCreditCard /> Credit Card
        </button>
        <button
          className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('paypal')}
        >
          <FaPaypal /> PayPal
        </button>
        <button
          className={`payment-method ${paymentMethod === 'gpay' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('gpay')}
        >
          <FaGooglePay /> Google Pay
        </button>
        <button
          className={`payment-method ${paymentMethod === 'applepay' ? 'active' : ''}`}
          onClick={() => setPaymentMethod('applepay')}
        >
          <FaApplePay /> Apple Pay
        </button>
      </div>

      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit} className="card-form">
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="pay-button">
            Pay Now
          </button>
        </form>
      )}

      {paymentMethod !== 'card' && (
        <div className="alternate-payment">
          <p>You will be redirected to {paymentMethod} to complete your payment.</p>
          <button className="pay-button">Continue to Payment</button>
        </div>
      )}
    </div>
  );
};

export default Payment;