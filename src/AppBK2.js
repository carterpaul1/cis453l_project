import React, { useState } from 'react';
import TextField from './TextField';
import './App.css';


function App() {
  const [total, setTotal] = useState(0);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleOrderNotesChange = (e) => {
    setOrderNotes(e.target.value);
  };

  const prices = {
    Latte: { Small: 3, Medium: 4, Large: 5 },
    Espresso: { Small: 1.25, Medium: 2.50, Large: 3.25 },
    "Double Shot Espresso": { Small: 2.50 },
    "Banana Bread": { Small: 2 }
  };

  const handleSubmit = () => {
    if (selectedItem && selectedSize && quantity > 0) {
      const itemTotal = prices[selectedItem][selectedSize] * quantity;
      setTotal(total + itemTotal);
      setTimeout(() => {
        setTotal(0);
      }, 20000); // 20000 milliseconds = 20 seconds
    }
  };

  return (
    <div className="App">
      <div className="App-body">
        <h1>Freedom's Best Coffee</h1>
        <img src="flagImage.jpg" className="FlagImageLogo" alt="FlagImageLogo" />
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
          </div>
          <div className="TextField">
            <h1>Customer Name: {customerName}</h1>
            <h1>Order Notes: {orderNotes}</h1>
            <TextField
              customerName={customerName}
              onCustomerNameChange={handleCustomerNameChange}
              orderNotes={orderNotes}
              onOrderNotesChange={handleOrderNotesChange}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
          <div className="total">
            <p>Order Total: ${total.toFixed(2)}</p>
          </div>
        </div>
        <footer>
          <h3>(C) Paul Carter 2024</h3>
        </footer>
      </div>
    </div>
  );
}

export default App;


