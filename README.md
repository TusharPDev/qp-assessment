# Grocery Booking API
🔍API Testing Guide (Plain Text)
To test the Grocery Booking API:

Start the server
>> npm start
>> URL: http://localhost:5050

* Admin APIs (prefix: /api/admin)
POST /addGroceries - Add a grocery item (requires: name, price, quantity, createdBy)
GET /getGroceries - View all grocery items
PUT /updateGroceries/:id - Update grocery item by ID
DELETE /deleteGroceries/:id - Delete grocery item by ID

* User APIs (prefix: /api/user)
GET /getAvailableGroceries - View available groceries (quantity > 0)
POST /placeOrder - Place an order with multiple items
