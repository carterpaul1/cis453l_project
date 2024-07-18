import React, { useState } from 'react';
import TextField from './TextField';
import './App.css';

// Utility functions for validation and sanitization
const validateCustomerName = (name) => {
  const regex = /^[a-zA-Z\s]*$/; // Allow only letters and spaces
  return regex.test(name);
};

const validateOrderNotes = (notes) => {
  const regex = /^[a-zA-Z0-9\s.,!?]*$/; // Allow letters, numbers, spaces, and basic punctuation
  return regex.test(notes);
};

const sanitizeInput = (input) => {
  return input.replace(/[<>]/g, '');
};

function App() {
  const [total, setTotal] = useState(0);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({ customerName: '', orderNotes: '' });

  const handleCustomerNameChange = (e) => {
    const value = e.target.value;
    if (validateCustomerName(value)) {
      setCustomerName(value); // Set the raw value
      setErrors((prevErrors) => ({ ...prevErrors, customerName: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, customerName: 'Invalid name: Please correct and try again' }));
    }
  };

  const handleOrderNotesChange = (e) => {
    const value = e.target.value;
    if (validateOrderNotes(value)) {
      setOrderNotes(sanitizeInput(value)); // Sanitize and set the raw value
      setErrors((prevErrors) => ({ ...prevErrors, orderNotes: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, orderNotes: 'Invalid notes: please correct and try again' }));
    }
  };

  const prices = {
    Latte: { Small: 3, Medium: 4, Large: 5 },
    Espresso: { Small: 1.25, Medium: 2.50, Large: 3.25 },
    "Double Shot Espresso": { Small: 2.50 },
    "Banana Bread": { Small: 2 }
  };

  const handleAddItem = () => {
    if (selectedItem && selectedSize && quantity > 0) {
      if (!prices[selectedItem].hasOwnProperty(selectedSize)) {
        setErrorMessage(`The selected item '${selectedItem}' is only available in the following size(s): ${Object.keys(prices[selectedItem]).join(', ')}`);
        return;
      }
      const itemTotal = prices[selectedItem][selectedSize] * quantity;
      const newItem = {
        item: selectedItem,
        size: selectedSize,
        quantity: quantity,
        total: itemTotal
      };
      setOrderItems([...orderItems, newItem]);
      setSelectedItem('');
      setSelectedSize('');
      setQuantity(1);
      setErrorMessage(''); // Clear error message on successful addition
    }
  };

  const handleSubmit = () => {
    if (errors.customerName || errors.orderNotes) {
      alert('Please fix errors before submitting');
      return;
    }
    const sanitizedCustomerName = sanitizeInput(customerName);
    const sanitizedOrderNotes = sanitizeInput(orderNotes);
    const orderTotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    setTotal(orderTotal);
    setShowSummary(true);

    // Display the summary for 15 seconds before resetting
    setTimeout(() => {
      setOrderItems([]);
      setTotal(0);
      setCustomerName('');
      setOrderNotes('');
      setShowSummary(false);
    }, 15000); // 15000 milliseconds = 15 seconds
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {'Freedom\'s Best Coffee'.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
          <img src="flagImage.jpg" className="FlagImageLogo" alt="FlagImageLogo" />
        </h1>
      </header>
      <div className="App-body">
        <div className="order-section">
          <div className="order-form">
            <div className="form-row">
              <div className="dropdown">
                <label>
                  Item:
                  <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
                    <option value="">Select an item</option>
                    <option value="Latte">Latte</option>
                    <option value="Espresso">Espresso</option>
                    <option value="Double Shot Espresso">Double Shot Espresso</option>
                    <option value="Banana Bread">Banana Bread</option>
                  </select>
                </label>
              </div>
              <div className="dropdown">
                <label>
                  Size:
                  <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                    <option value="">Select a size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="quantity">
              <label>
                Quantity:
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </label>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
          <button onClick={handleAddItem}>Add Item</button>
          <div className="order-items">
            <h2>Order Items:</h2>
            <ul>
              {orderItems.map((item, index) => (
                <li key={index}>
                  {item.quantity} x {item.size} {item.item} - ${item.total.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <div className="TextField">
            <TextField
              customerName={customerName}
              onCustomerNameChange={handleCustomerNameChange}
              orderNotes={orderNotes}
              onOrderNotesChange={handleOrderNotesChange}
            />
            {errors.customerName && <p className="error">{errors.customerName}</p>}
            {errors.orderNotes && <p className="error">{errors.orderNotes}</p>}
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        {showSummary && (
          <div className="summary">
            <h1>Order Summary</h1>
            <p><strong>Customer Name:</strong> {customerName}</p>
            <p><strong>Order Notes:</strong> {orderNotes}</p>
            <h2>Order Items:</h2>
            <ul>
              {orderItems.map((item, index) => (
                <li key={index}>
                  {item.quantity} x {item.size} {item.item} - ${item.total.toFixed(2)}
                </li>
              ))}
            </ul>
            <p><strong>Order Total:</strong> ${total.toFixed(2)}</p>
          </div>
        )}
        <footer>
          <h3>(C) Paul Carter 2024</h3>
        </footer>
      </div>
    </div>
  );
}

export default App;





