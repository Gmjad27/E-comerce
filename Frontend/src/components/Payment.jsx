import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaGooglePay, FaApplePay } from 'react-icons/fa';
import './Payment.css';
// import '/.src/styles/payment.css';

const Payment = ({ total, onSuccess, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    name: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Contact information validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!/^\d{10}$/.test(contactInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (contactInfo.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name';
    }

    if (contactInfo.address.trim().length < 5) {
      newErrors.address = 'Please enter a valid address';
    }

    if (contactInfo.city.trim().length < 2) {
      newErrors.city = 'Please enter a valid city';
    }

    if (!/^\d{5}(-\d{4})?$/.test(contactInfo.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    // Card validation if paying by card
    if (paymentMethod === 'card') {
      // Card number validation (16 digits)
      if (!/^\d{16}$/.test(cardDetails.number.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      // Name validation
      if (cardDetails.name.trim().length < 3) {
        newErrors.cardName = 'Please enter the cardholder name';
      }

      // Expiry validation (MM/YY format)
      if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
      } else {
        const [month, year] = cardDetails.expiry.split('/');
        const now = new Date();
        const cardDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        if (cardDate < now) {
          newErrors.expiry = 'Card has expired';
        }
      }

      // CVV validation (3 or 4 digits)
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Simulate sending email
      const emailContent = `
        Order Confirmation #${orderId}
        Thank you for your purchase!
        
        Order Total: $${total.toFixed(2)}
        Payment Method: ${paymentMethod === 'card' ? 'Credit Card ending in ' + cardDetails.number.slice(-4) : paymentMethod}
        
        Shipping to:
        ${contactInfo.name}
        ${contactInfo.address}
        ${contactInfo.city}, ${contactInfo.zipCode}
        
        We'll send you another email when your order ships.
      `;

      // Simulate sending SMS
      const smsContent = `Your order #${orderId} for $${total.toFixed(2)} has been confirmed. Track your order at example.com/track/${orderId}`;

      // Simulate API calls for notifications
      await Promise.all([
        // In a real app, these would be actual API calls
        new Promise(resolve => setTimeout(resolve, 500)), // Simulated email API
        new Promise(resolve => setTimeout(resolve, 500))  // Simulated SMS API
      ]);

      // If everything is successful
      onSuccess({
        orderId,
        method: paymentMethod,
        last4: paymentMethod === 'card' ? cardDetails.number.slice(-4) : null,
        timestamp: new Date().toISOString(),
        contact: {
          email: contactInfo.email,
          phone: contactInfo.phone
        }
      });

      // Show success feedback
      console.log('Email sent:', emailContent);
      console.log('SMS sent:', smsContent);
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>

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

        <div className="payment-amount">
          <h3>Total Amount</h3>
          <div className="amount">${total.toFixed(2)}</div>
        </div>

        <form onSubmit={handleSubmit} className="card-form">
          <div className="contact-form">
            <h3>Contact Information</h3>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="(123) 456-7890"
                value={contactInfo.phone}
                onChange={(e) => {
                  const formatted = e.target.value
                    .replace(/\D/g, '')
                    .replace(/(\d{3})(\d)/, '($1) $2')
                    .replace(/(\d{3})(\d)/, '$1-$2')
                    .slice(0, 14);
                  setContactInfo({ ...contactInfo, phone: formatted });
                }}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Shipping Address</label>
              <input
                type="text"
                placeholder="123 Main St, Apt 4B"
                value={contactInfo.address}
                onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={contactInfo.city}
                  onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-message">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  placeholder="12345"
                  value={contactInfo.zipCode}
                  onChange={(e) => {
                    const formatted = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setContactInfo({ ...contactInfo, zipCode: formatted });
                  }}
                  maxLength="5"
                  className={errors.zipCode ? 'error' : ''}
                />
                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
              </div>
            </div>
          </div>

          {paymentMethod === 'card' ? (
            <div className="card-details">
              <h3>Card Details</h3>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => {
                    const formatted = e.target.value
                      .replace(/\s/g, '')
                      .replace(/(\d{4})/g, '$1 ')
                      .trim();
                    setCardDetails({ ...cardDetails, number: formatted });
                  }}
                  maxLength="19"
                  className={errors.cardNumber ? 'error' : ''}
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  className={errors.cardName ? 'error' : ''}
                />
                {errors.cardName && <span className="error-message">{errors.cardName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => {
                      const formatted = e.target.value
                        .replace(/\D/g, '')
                        .replace(/(\d{2})(\d)/, '$1/$2')
                        .slice(0, 5);
                      setCardDetails({ ...cardDetails, expiry: formatted });
                    }}
                    maxLength="5"
                    className={errors.expiry ? 'error' : ''}
                  />
                  {errors.expiry && <span className="error-message">{errors.expiry}</span>}
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => {
                      const formatted = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setCardDetails({ ...cardDetails, cvv: formatted });
                    }}
                    maxLength="4"
                    className={errors.cvv ? 'error' : ''}
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>
            </div>
          ) : (
            <p className="payment-redirect-message">
              You will be redirected to {
                paymentMethod === 'gpay' ? 'Google Pay' :
                  paymentMethod === 'applepay' ? 'Apple Pay' :
                    paymentMethod === 'paypal' ? 'PayPal' : ''
              } to complete your payment.
            </p>
          )}

          {errors.submit && (
            <div className="error-message submit-error">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            className={`pay-button ${isProcessing ? 'processing' : ''}`}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)} ${paymentMethod !== 'card' ? `with ${paymentMethod === 'gpay' ? 'Google Pay' :
              paymentMethod === 'applepay' ? 'Apple Pay' :
                paymentMethod === 'paypal' ? 'PayPal' : ''
              }` : ''
              }`}
          </button>
        </form>

      </div>


{/*     
      {errors.phone && <span className="error-message">{errors.phone}</span>}


      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={contactInfo.name}
          onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Shipping Address</label>
        <input
          type="text"
          placeholder="123 Main St, Apt 4B"
          value={contactInfo.address}
          onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
          className={errors.address ? 'error' : ''}
        />
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={contactInfo.city}
            onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label>ZIP Code</label>
          <input
            type="text"
            placeholder="12345"
            value={contactInfo.zipCode}
            onChange={(e) => {
              const formatted = e.target.value.replace(/\D/g, '').slice(0, 5);
              setContactInfo({ ...contactInfo, zipCode: formatted });
            }}
            maxLength="5"
            className={errors.zipCode ? 'error' : ''}
          />
          {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
        </div>
      </div> */}


      {/* {paymentMethod !== 'card' && (
        <div className="alternate-payment">
          <p>You will be redirected to {paymentMethod} to complete your payment.</p>
          <button
            className={`pay-button ${isProcessing ? 'processing' : ''}`}
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)} with ${paymentMethod === 'gpay' ? 'Google Pay' :
              paymentMethod === 'applepay' ? 'Apple Pay' :
                paymentMethod === 'paypal' ? 'PayPal' : ''
              }`}
          </button>
        </div>
      )}; */}

      {/* < input type = "text"
      placeholder = "John Doe"
      value = {contactInfo.name}
      onChange = {(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
      className = {errors.name ? 'error' : ''} ></input>
      {errors.name && <span className="error-message">{errors.name}</span>}

      <div className="form-group">
        <label>Shipping Address</label>
        <input
          type="text"
          placeholder="123 Main St, Apt 4B"
          value={contactInfo.address}
          onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
          className={errors.address ? 'error' : ''}
        />
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div> */}

      {/* <div className="form-row">
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={contactInfo.city}
            onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label>ZIP Code</label>
          <input
            type="text"
            placeholder="12345"
            value={contactInfo.zipCode}
            onChange={(e) => {
              const formatted = e.target.value.replace(/\D/g, '').slice(0, 5);
              setContactInfo({ ...contactInfo, zipCode: formatted });
            }}
            maxLength="5"
            className={errors.zipCode ? 'error' : ''}
          />
          {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
        </div>
      </div> */}


      {/* {paymentMethod !== 'card' && (
        <div className="alternate-payment">
          <p>You will be redirected to {paymentMethod} to complete your payment.</p>
          <button
            className={`pay-button ${isProcessing ? 'processing' : ''}`}
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)} with ${paymentMethod === 'gpay' ? 'Google Pay' :
              paymentMethod === 'applepay' ? 'Apple Pay' :
                paymentMethod === 'paypal' ? 'PayPal' : ''
              }`}
          </button>
        </div>
      )
      } */}
    </>
  );
};
export default Payment;