import { useState, useEffect } from "react";
import "./Product.css";

function ProductCard({
    product,
    onAddToCart,
    onRemoveFromCart,
    onAddToWishlist,
    onRemoveFromWishlist,
    isInCart = false,
    isInWishlist = false,
    quantity = 0
}) {
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [itemQuantity, setItemQuantity] = useState(quantity);

    return (
        <>
            <div className="product-card">
                {/* Badge */}
                {product.badge && (
                    <span className={`product-badge ${product.badge.type}`}>
                        {product.badge.text}
                    </span>
                )}

                {/* Wishlist */}
                <button
                    className={`wishlist-btn ${isInWishlist ? "active" : ""}`}
                    onClick={() => {
                        if (isInWishlist) {
                            onRemoveFromWishlist(product);
                        } else {
                            onAddToWishlist(product);
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className={isInWishlist ? 'filled' : ''}
                    >
                        <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                    </svg>
                </button>

                {/* Product Image */}
                <div className="product-image-container">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />

                    {/* Hover Overlay */}
                    <div className="product-overlay">
                        <button
                            className="quick-view-btn"
                            onClick={() => setIsQuickViewOpen(true)}
                        >
                            👁 Quick View
                        </button>
                        <div className="cart-controls">
                            {isInCart ? (
                                <>
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => {
                                                if (itemQuantity > 1) {
                                                    setItemQuantity(prev => prev - 1);
                                                    onRemoveFromCart(product);
                                                } else {
                                                    setItemQuantity(0);
                                                    onRemoveFromCart(product, true);
                                                }
                                            }}
                                        >
                                            -
                                        </button>
                                        <span>{itemQuantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => {
                                                setItemQuantity(prev => prev + 1);
                                                onAddToCart(product);
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => {
                                        setItemQuantity(1);
                                        onAddToCart(product);
                                    }}
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>

                    <div className="product-rating">
                        {"★".repeat(Math.floor(product.rating))}
                        {"☆".repeat(5 - Math.floor(product.rating))}
                        <span>({product.reviews})</span>
                    </div>

                    <div className="product-price">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            {isQuickViewOpen && (
                <div className="quick-view-modal">
                    <div className="modal-content">
                        <button
                            className="close-modal"
                            onClick={() => setIsQuickViewOpen(false)}
                        >
                            ✕
                        </button>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <div className="modal-price">
                            <span className="current-price">${product.price}</span>
                            {product.originalPrice && (
                                <span className="original-price">${product.originalPrice}</span>
                            )}
                        </div>
                        {isInCart ? (
                            <div className="modal-cart-controls">
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => {
                                            if (itemQuantity > 1) {
                                                setItemQuantity(prev => prev - 1);
                                                onRemoveFromCart(product);
                                            } else {
                                                setItemQuantity(0);
                                                onRemoveFromCart(product, true);
                                            }
                                        }}
                                    >
                                        -
                                    </button>
                                    <span>{itemQuantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => {
                                            setItemQuantity(prev => prev + 1);
                                            onAddToCart(product);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="add-to-cart-btn modal-cart"
                                onClick={() => {
                                    setItemQuantity(1);
                                    onAddToCart(product);
                                }}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductCard;
