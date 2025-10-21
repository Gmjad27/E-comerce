import { useState, useEffect } from 'react';

function Header({ cartItems = [], wishlistItems = [], onAddToCart, onRemoveFromCart }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('EN');
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [notificationCount, setNotificationCount] = useState(2);

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishlistCount = wishlistItems.length;

    // Add to cart function
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
        setCartCount(prevCount => prevCount + 1);
        onAddToCart && onAddToCart(product);
    };

    // Remove from cart function
    const removeFromCart = (productId) => {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            if (item.quantity > 1) {
                setCartItems(cartItems.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ));
            } else {
                setCartItems(cartItems.filter(item => item.id !== productId));
            }
            setCartCount(prevCount => prevCount - 1);
        }
    };

    // Add to wishlist function
    const addToWishlist = (product) => {
        setWishlistCount(prevCount => prevCount + 1);
        onAddToWishlist && onAddToWishlist(product);
    };

    const languages = ['EN', 'ES', 'FR', 'DE', 'IT', 'PT', 'हि'];

    const shopSubmenu = [
        { name: 'Electronics', link: '#electronics' },
        { name: 'Fashion', link: '#fashion' },
        { name: 'Home & Garden', link: '#home' },
        { name: 'Sports', link: '#sports' },
        { name: 'Sale Items', link: '#sale', badge: 'Hot' }
    ];

    const featuresSubmenu = [
        { name: 'Free Shipping', link: '#shipping' },
        { name: 'Easy Returns', link: '#returns' },
        { name: 'Gift Cards', link: '#giftcards' },
        { name: 'Track Order', link: '#track' }
    ];

    // Handle scroll for sticky header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Apply dark mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) setSearchQuery('');
    };
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
    const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const handleDropdown = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        setIsSearchOpen(false);
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <div className={`header-div ${isScrolled ? 'scrolled' : ''}`}>
                <header className="header">
                    {/* Logo */}
                    <div className="logo-container">
                        <a href="#home">
                            <img className="logo" src="src/assets/images/logo/swiftcart.svg" alt="SwiftCart Logo" />
                        </a>
                    </div>

                    {/* Navigation Menu */}
                    <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
                        <button className="menu-close" onClick={closeMenu} aria-label="Close menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>

                        <a href="#home" onClick={closeMenu}>Home</a>

                        {/* Shop with Dropdown */}
                        <div className="dropdown-container">
                            <a href="#shop" onClick={(e) => { e.preventDefault(); handleDropdown('shop'); }}>
                                Shop
                                <svg className="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                </svg>
                            </a>
                            <div className={`dropdown-menu ${activeDropdown === 'shop' ? 'show' : ''}`}>
                                {shopSubmenu.map(item => (
                                    <a key={item.name} href={item.link} onClick={closeMenu}>
                                        {item.name}
                                        {item.badge && <span className="submenu-badge">{item.badge}</span>}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Features with Dropdown */}
                        <div className="dropdown-container">
                            <a href="#features" onClick={(e) => { e.preventDefault(); handleDropdown('features'); }}>
                                Features
                                <svg className="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                </svg>
                            </a>
                            <div className={`dropdown-menu ${activeDropdown === 'features' ? 'show' : ''}`}>
                                {featuresSubmenu.map(item => (
                                    <a key={item.name} href={item.link} onClick={closeMenu}>{item.name}</a>
                                ))}
                            </div>
                        </div>

                        <a href="#blog" onClick={closeMenu}>Blog</a>
                        <a href="#about" onClick={closeMenu}>About</a>
                        <a href="#contact" onClick={closeMenu}>Contact</a>
                    </nav>

                    {/* Icons Section */}
                    <div className="icons">
                        {/* Dark Mode Toggle */}
                        <button className="ico theme-toggle" onClick={toggleDarkMode} aria-label="Toggle theme" title="Toggle Dark Mode">
                            {isDarkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                                </svg>
                            )}
                        </button>

                        {/* Language Selector */}
                        <div className="language-selector">
                            <button className="ico" onClick={toggleLanguage} aria-label="Select language" title="Language">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
                                    <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
                                </svg>
                                <span className="lang-text">{selectedLanguage}</span>
                            </button>
                            {isLanguageOpen && (
                                <div className="language-dropdown">
                                    {languages.map(lang => (
                                        <button
                                            key={lang}
                                            className={selectedLanguage === lang ? 'active' : ''}
                                            onClick={() => { setSelectedLanguage(lang); setIsLanguageOpen(false); }}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Icon */}
                        <button className="search ico" onClick={toggleSearch} aria-label="Search" title="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>

                        {/* Notifications */}
                        <button className="ico icon-with-badge" aria-label="Notifications" title="Notifications">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                            </svg>
                            {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
                        </button>

                        {/* Cart Icon */}
                        <button className="cart ico icon-with-badge" onClick={toggleCart} aria-label="Shopping Cart" title="Cart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                            </svg>
                            {cartCount > 0 && <span className="badge">{cartCount}</span>}
                        </button>

                        {/* Wishlist Icon */}
                        <button
                            className={`wishlist ico icon-with-badge ${wishlistCount > 0 ? 'active' : ''}`}
                            onClick={() => {
                                // Toggle wishlist panel here if needed
                            }}
                            aria-label="Wishlist"
                            title="Wishlist"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                            </svg>
                            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
                        </button>

                        {/* User Menu */}
                        <div className="user-menu-container">
                            <button className="login ico" onClick={toggleUserMenu} aria-label="User Account" title="Account">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </button>
                            {isUserMenuOpen && (
                                <div className="user-dropdown">
                                    <a href="#profile">My Profile</a>
                                    <a href="#orders">My Orders</a>
                                    <a href="#wishlist">Wishlist</a>
                                    <a href="#settings">Settings</a>
                                    <hr />
                                    <a href="#logout" className="logout-btn">Logout</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hamburger Menu */}
                    <button
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </header>
            </div>

            {/* Search Modal */}
            {isSearchOpen && (
                <div className="search-modal">
                    <div className="search-modal-content">
                        <button className="search-close" onClick={toggleSearch} aria-label="Close search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                        </button>
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                placeholder="Search products, categories, brands..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </button>
                        </form>
                        <div className="search-suggestions">
                            <h4>Popular Searches</h4>
                            <div className="suggestion-tags">
                                <button onClick={() => setSearchQuery('headphones')}>Headphones</button>
                                <button onClick={() => setSearchQuery('laptops')}>Laptops</button>
                                <button onClick={() => setSearchQuery('shoes')}>Shoes</button>
                                <button onClick={() => setSearchQuery('watches')}>Watches</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Sidebar */}
            {isCartOpen && (
                <>
                    <div className="overlay" onClick={toggleCart}></div>
                    <div className="cart-sidebar">
                        <div className="cart-header">
                            <h3>Shopping Cart ({cartCount})</h3>
                            <button onClick={toggleCart} aria-label="Close cart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                            </button>
                        </div>
                        <div className="cart-items">
                            {cartItems.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p>${item.price.toFixed(2)} × {item.quantity}</p>
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => onRemoveFromCart(item)}
                                                    className="quantity-btn"
                                                    aria-label="Decrease quantity"
                                                >-</button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => onAddToCart(item)}
                                                    className="quantity-btn"
                                                    aria-label="Increase quantity"
                                                >+</button>
                                            </div>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => onRemoveFromCart(item, true)}
                                            aria-label="Remove item"
                                        >×</button>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="cart-footer">
                            <div className="cart-total">
                                <span>Total:</span>
                                <strong>
                                    ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                                </strong>
                            </div>
                            <button className="checkout-btn" disabled={cartItems.length === 0}>
                                Proceed to Checkout
                            </button>
                            <button className="view-cart-btn" disabled={cartItems.length === 0}>
                                View Cart
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Menu Overlay */}
            {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

        </>
    );
}

export default Header;