import React from 'react';


const TextField = ({ customerName, onCustomerNameChange, orderNotes, onOrderNotesChange }) => {
  return (
    <div className="TextField">
      <div className="CustomerName">
        <input 
          type="text"
          value={customerName}
          onChange={onCustomerNameChange}
          placeholder="Enter Name of Customer"
        />
      </div>
      <div className="Notes">
        <input 
          type="text"
          value={orderNotes}
          onChange={onOrderNotesChange}
          placeholder="Enter any Notes about order:"
        />
      </div>
    </div>
  );
};

export default TextField;
