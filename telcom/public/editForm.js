const User = require("../db/conn");

// scripts.js
let selectedUser; // Store the selected user for editing

function openEditForm() {
    // Set the selected user (you can dynamically set this based on the selected row)
    selectedUser = { _id: User.id, companyName: 'Example Company', comission: '10%' };

    // Display the edit form
    document.getElementById('editFormContainer').style.display = 'flex';
}

function closeEditForm() {
    // Close the edit form
    document.getElementById('editFormContainer').style.display = 'none';
}
