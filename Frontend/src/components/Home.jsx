import { useState } from 'react'
import Header from './Header.jsx'
import Banner from './Banner.jsx'
import Product from './Product.jsx'
import Footer from './Footer.jsx'
import Payment from './Payment.jsx'

const sampleProducts = [
  {
    id: 1,
    name: 'Asiana Sneakers',
    category: 'Shoes',
    price: 19.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviews: 128,
    image: 'src/assets/images/products/1.jpg',
    badge: { text: 'Sale', type: 'sale' },
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.'
  },
  {
    id: 2,
    name: 'Winter Jacket',
    category: 'clothing',
    price: 19.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviews: 256,
    image: 'src/assets/images/products/2.jpg',
    badge: { text: 'New', type: 'new' },
    description: 'Advanced smartwatch with health tracking, GPS, and customizable watch faces.'
  },
  {
    id: 3,
    name: 't-shirt',
    category: 'clothing',
    price: 10.99,
    originalPrice: 65.99,
    rating: 4.3,
    reviews: 89,
    image: 'src/assets/images/products/3.jpg',
    badge: { text: 'Hot', type: 'hot' },
    description: 'Durable laptop backpack with multiple compartments and water-resistant material.'
  },
  {
    id: 4,
    name: 'cap',
    category: 'clothing',
    price: 12.99,
    rating: 4.6,
    reviews: 432,
    image: 'src/assets/images/products/4.jpg',
    description: 'Fast charging USB-C cable with reinforced connectors and 6ft length.'
  },
  {
    id: 5,
    name: 'Asiana Sneakers',
    category: 'Shoes',
    price: 19.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviews: 128,
    image: 'src/assets/images/products/belt.jpg',
    badge: { text: 'Sale', type: 'sale' },
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.'
  },
  {
    id: 6,
    name: 'Winter Jacket',
    category: 'clothing',
    price: 19.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviews: 256,
    image: 'src/assets/images/products/clothes-1.jpg',
    badge: { text: 'New', type: 'new' },
    description: 'Advanced smartwatch with health tracking, GPS, and customizable watch faces.'
  },
  {
    id: 7,
    name: 't-shirt',
    category: 'clothing',
    price: 10.99,
    originalPrice: 65.99,
    rating: 4.3,
    reviews: 89,
    image: 'src/assets/images/products/clothes-2.jpg',
    badge: { text: 'Hot', type: 'hot' },
    description: 'Durable laptop backpack with multiple compartments and water-resistant material.'
  },
  {
    id: 8,
    name: 'cap',
    category: 'clothing',
    price: 12.99,
    rating: 4.6,
    reviews: 432,
    image: 'src/assets/images/products/clothes-3.jpg',
    description: 'Fast charging USB-C cable with reinforced connectors and 6ft length.'
  }
];



const images = [
  {
    src: "src/assets/images/banner-1.jpg",
    title: "Welcome to SwiftCart",
    subtitle: "Shop your favorite items anytime, anywhere",
    buttonText: "Shop Now",
  },
  {
    src: "src/assets/images/banner-4.png",
    title: "Matching",
    subtitle: "Save up to 50%",
    buttonText: "Explore",
  },
  {
    src: "src/assets/images/banner-3.jpg",
    title: "Exclusive Offers on\nWomen's Fashion",
    subtitle: "Save up to 50% on new arrivals",
    buttonText: "Explore",
  },
];

function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart handler
  const handleRemoveFromCart = (product, removeCompletely = false) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (!existingItem) return prevItems;

      if (removeCompletely || existingItem.quantity === 1) {
        return prevItems.filter(item => item.id !== product.id);
      }

      return prevItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // Add to wishlist handler
  const handleAddToWishlist = (product) => {
    setWishlistItems(prevItems => {
      if (!prevItems.find(item => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  // Remove from wishlist handler
  const handleRemoveFromWishlist = (product) => {
    setWishlistItems(prevItems =>
      prevItems.filter(item => item.id !== product.id)
    );
  };

  // Calculate total cart amount
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle successful payment
  const handlePaymentSuccess = (paymentDetails) => {
    setOrderStatus({
      status: 'success',
      message: 'Payment successful! Thank you for your purchase.',
      orderId: `ORD-${Date.now()}`,
      details: paymentDetails
    });
    setCartItems([]); // Clear cart after successful payment
    setShowPayment(false);
  };

  // Handle payment cancellation
  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  return (
    <>
      <div className='header-div'>

        <Header
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          onCheckout={() => setShowPayment(true)}
        />
      </div>
      <div className="banner-div">
        <Banner images={images} interval={2500} />
      </div>

      <div className="products-grid">
        {sampleProducts.map(product => {
          const cartItem = cartItems.find(item => item.id === product.id);
          return (
            <Product
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onAddToWishlist={handleAddToWishlist}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              isInCart={Boolean(cartItem)}
              isInWishlist={wishlistItems.some(item => item.id === product.id)}
              quantity={cartItem?.quantity || 0}
            />
          );
        })}
      </div>
      
      {showPayment && (
        <div className="payment-modal">
          {/* <div className="payment-overlay" onClick={handlePaymentCancel}></div> */}
          <div className="payment-content">
            <button className="close-payment" onClick={handlePaymentCancel}>×</button>
            <Payment
              total={cartTotal}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </div>
        </div>
      )}

      {/* Order Success Message */}
      {orderStatus && (
        <div className={`order-status ${orderStatus.status}`}>
          <div className="status-content">
            <button className="close-status" onClick={() => setOrderStatus(null)}>×</button>
            <h3>{orderStatus.message}</h3>
            <p>Order ID: {orderStatus.orderId}</p>
            {orderStatus.details.last4 && (
              <p>Paid with card ending in {orderStatus.details.last4}</p>
            )}
          </div>
        </div>
      )}

      <div>
        <Footer />
      </div>
    </>
  )
}

export default Home
