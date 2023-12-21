const express = require("express");
const session = require('express-session');
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const bycrypt = require('bcrypt');
const User = require('./db/conn');
const RMusers = require('./modal/rogerMobSec');
const app = express();
const userLogin = require('./modal/userLogin')
// import routes
require('dotenv').config(); // Load environment variables from .env file
const port = process.env.PORT || 3000;
if(process.env.NODE_ENV === "production"){
  app.use(express.static("public"));
}
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.admin) {
    // User is authenticated
    return next();
  } else {
    // User is not authenticated, redirect to login page
    res.redirect('/adminLogin');
  }
};
// Load credentials from a JSON file (make sure to replace 'credentials.json' with your file)
const credentials = require("./credentials.json");
const Admin = require("./modal/adminLogin");
const { client_email, private_key } = credentials;
// Configure the Google Sheets API
const sheets = google.sheets("v4");
const spreadsheetId = "10gu42dhHioTbM3ZxnJWZ4kacb3vH5eiAz9KW4dcir_M";
const client1 = "1sP1QqY9M_L_qW2h8RqRxEacxYk1EDrFj8bgdvcNv2Ck";
const userAuthenticated  = (req, res, next) => {
  console.log("User session:", req.session);
  if (req.session && req.session.UserLogin) {
    // User is authenticated
    return next();
  } else {
    // User is not authenticated, redirect to login page
    res.redirect('/userLogin');
  }
};

app.get("/userLogin", async(req, res) =>{
  res.render('userLogin')
})
app.post('/userLogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userEmail = "arsalanali12500@gmail.com";
    const userPassword = "123";
    if (email === userEmail && password === userPassword) {
      req.session.UserLogin = true;
      console.log("User session set:", req.session);
      return res.redirect('/');
    } else {
      return res.redirect('/userLogin?message=invalidcredentials');
    }
  } catch (error) {
    console.log('Error occurring during user login', error);
    return res.status(500).send('internal server error');
  }
});
app.get("/", userAuthenticated , (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/submit", async (req, res) => {
  const formData = req.body;
  const RogersMobilityData = req.body;
  
  if (!formData.name || !formData.email || !formData.address) {
    return res.status(400).json({ message: "Name and email are required fields." });
  }

  if (formData.choseOrder === "Bell" || formData.choseOrder === "Rogers") {
    const newUser = new User({
      companyName: " ",
      choseOrder: formData.choseOrder,
      orderTypeSelect: formData.orderTypeSelect,
      customerTypeSelect: formData.customerTypeSelect,
      installationDateTime: " ",
      comission: " ",
      orderNo: " ",
      name: formData.name,
      address: formData.address,
      email: formData.email,
      birthDate: formData.birthDate,
      choseId: formData.choseId,
      passportNumber: formData.choseId === 'Passport' ? formData.licenseNumber: '',
      drivingLicenseNumber: formData.choseId === 'Driving License' ? formData.licenseNumber : "",
      expiryDate: formData.expiryDate,
      portingNumber: formData.portingNumber,
      ProviderName: formData.ProviderName,
      AccountNumber: formData.AccountNumber,
      portPhoneNumber: formData.portPhoneNumber,
      mainNumber: formData.mainNumber,
      mainCell: formData.mainCell,
      selectedPackage: formData.selectedPackage,
      line: formData.line,
      speed: formData.speed,
      TvPackageinfo: formData.TvPackageinfo,
      boxesQuality: formData.boxesQuality,
      creditOfferInfo: formData.creditOfferInfo,
      chenalsDetails: formData.chenalsDetails,
      fullPrice: formData.fullPrice,
      preferedinstallationdate: formData.preferedinsdate,
      cancelReason:" ",
      noteOrder:formData.noteOrder,
      status: " ",
      submissionDate: Date.now(),    
    });

    try {
      await newUser.save();
      console.log('User Saved', newUser);
    } catch (err) {
      console.log("Data not saved: " + err);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else if (RogersMobilityData.choseOrder === "RM") {
    const rmusers = new RMusers({
          reId: RogersMobilityData.reId,
          name: RogersMobilityData.name,
          dateofBirth: RogersMobilityData.dateofBirth,
          phone: RogersMobilityData.phone,
          email: RogersMobilityData.email,
          address: RogersMobilityData.address,
          addredriverLicenseAddressss: RogersMobilityData.driverLicenseAddress,
          InternetAddress: RogersMobilityData.InternetAddress,
          RogerAccountNumber: RogersMobilityData.RogerAccountNumber,
    });

    try {
      await rmusers.save();
      console.log("RM users saved", rmusers);
    } catch (error) {
      console.log('RM users not saved', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    console.log('Unknown form type:', formData.choseOrder);
    return res.status(400).json({ message: 'Unknown form type.' });
  }
    // Authorize with Google Sheets API
  const auth = new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  try {
    // Load spreadsheet
    const sheetsInfo = await sheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    const timestamp = new Date().toLocaleString();

    // Append data to the 'Form' sheet
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Form!A1",
      valueInputOption: "RAW",
      resource: {
        values: [
          [
            formData.choseOrder,
            formData.orderTypeSelect,
            formData.customerTypeSelect,
            formData.name,
            formData.address,
            formData.email, 
            formData.birthDate,
            formData.choseId,
            formData.licenseNumber,
            formData.expiryDate,
            formData.portingNumber,
            formData.ProviderName,
            formData.AccountNumber,
            formData.portPhoneNumber,
            formData.mainNumber,
            formData.mainCell,
            formData.selectedPackage ,
            formData.line,
            formData.speed,
            formData.TvPackageinfo,
            formData.boxesQuality,
            formData.creditOfferInfo,
            formData.chenalsDetails,
            formData.fullPrice,
            formData.preferedinsdate,
            formData.noteOrder,
            timestamp,
            formData.companyName,
            formData.comission,
            formData.orderNo,
          ],
        ],
      },
    });
// Append data to the 'admin 2' different sheet
await sheets.spreadsheets.values.append({
  auth,
  spreadsheetId: client1,
  range: "admin!B1",
  valueInputOption: "RAW",
  resource: {
    values: [
      [
        formData.choseOrder,
        formData.orderTypeSelect,
        formData.customerTypeSelect,
        formData.name,
        formData.address,
        formData.email, 
        formData.birthDate,
        formData.choseId,
        formData.licenseNumber,
        formData.expiryDate,
        formData.portingNumber,
        formData.ProviderName,
        formData.AccountNumber,
        formData.portPhoneNumber,
        formData.mainNumber,
        formData.mainCell,
        formData.selectedPackage,
        formData.line,
        formData.speed,
        formData.TvPackageinfo,
        formData.boxesQuality,
        formData.creditOfferInfo,
        formData.chenalsDetails,
        formData.fullPrice,
        formData.noteOrder,
        timestamp,

      ],
    ],
  },
});
        // Append data to the 'client' sheet
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "client!B1",
      valueInputOption: "RAW",
      resource: {
        values: [[formData.name, formData.email, timestamp]],
      },
    });
  
    // Append data to the 'admin' sheet
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "admin!B1",
      valueInputOption: "RAW",
      resource: {
        values: [[formData.name, formData.email, timestamp]],
      },
    });

    res.json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error(
      "Error submitting form:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// client portal
app.get('/clientPortal', userAuthenticated, async(req, res) =>{
  const users = await User.find();
  res.render('clientPortal.ejs', {users});
});
// Admin portal Data fetching from database
app.get('/adminPannel',isAuthenticated, async (req, res) =>{
  const users = await User.find();
 await res.render('adminForm', {users})
});
app.get('/adminLogin', async(req,res) =>{
  res.render('adminLogin');
});
app.post('/adminLogin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      req.session.admin = true;
      return res.redirect('/adminPannel');
    } else {
      return res.redirect('/adminLogin?message=InvalidCredentials');
    }
  } catch (error) {
    console.error('Error occurring during admin Login', error);
    return res.status(500).send('Internal Server Error');
  }
});

// Example server-side code
app.get('/editForm/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).send('User not found');
      }

      res.render('editForm', { user });
  } catch (error) {
      console.error("Error fetching user for edit form:", error);
      res.status(500).send("Internal Server Error");
  }
});
app.get('/showMore/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).send('User not found');
      }

      res.render('showMore', { user });
  } catch (error) {
      console.error("Error fetching user for showMore form:", error);
      res.status(500).send("Internal Server Error");
  }
});
app.post('/edit/:userId', async (req, res) => {
  const { 
    companyName, comission,orderTypeSelect,name, address, email,
    birthDate,choseId,licenseNumber,expiryDate, orderNo,cancelReason,
  } = req.body;
  const userId = req.params.userId;
  try {
    // Update the user record in the database
    await User.findByIdAndUpdate(userId, { companyName, comission, orderTypeSelect,name,
    address,email, birthDate, choseId,licenseNumber, expiryDate,orderNo, cancelReason,
    });

    // Update the corresponding data in the Google Sheet
    const auth = new google.auth.JWT({
      email: client_email,
      key: private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Fetch user data from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Define the calculateSheetRow function
    // ...

const calculateSheetRow = async (auth, spreadsheetId, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sheets = google.sheets("v4");

      if (!user || !user.email) {
        console.error('Invalid user object:', user);
        return reject(new Error('Invalid user object'));
      }

      const identifier = user.email;

      const response = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Form!A:Z",
      });

      const values = response.data.values;

      if (values) {
        for (let i = 0; i < values.length; i++) {
          const row = values[i];
          const rowDataIdentifier = row[5]; // Assuming email is in the third column
          if (rowDataIdentifier === identifier) {
            return resolve(i + 1);
          }
        }
      }

      console.error("No matching row found for identifier:", identifier);
      return resolve(null); // Resolve with null when no matching row is found
    } catch (error) {
      console.error("Error calculating sheet row:", error);
      reject(error);
    }
  });
};

// ...

// Calculate the sheetRow
user.sheetRow = await calculateSheetRow(auth, spreadsheetId, user);
    // Calculate the sheetRow
    // Calculate the sheetRow
user.sheetRow = await calculateSheetRow(auth, spreadsheetId, user);
console.log('Calculated sheetRow:', user.sheetRow);

    // Verify user object
    console.log('User Object:', user);
    if (user.sheetRow === null) {
      console.error('Invalid sheetRow:', user.sheetRow);
      return res.status(500).send('Failed to calculate sheetRow');
    }
    
    // Update the corresponding data in the Google Sheet 'Form' sheet
    const result = await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `Form!A${user.sheetRow}:AE${user.sheetRow}`,
      valueInputOption: "RAW",
      resource: {
        values: [
          [
            user.choseOrder,
            user.orderTypeSelect,
            user.customerTypeSelect,
            user.name,
            user.address,
            user.email, 
            user.birthDate,
            user.choseId,
            user.licenseNumber,
            user.expiryDate,
            user.portingNumber,
            user.ProviderName,
            user.AccountNumber,
            user.portPhoneNumber,
            user.mainNumber,
            user.mainCell,
            user.selectedPackage,
            user.line,
            user.speed,
            user.TvPackageinfo,
            user.boxesQuality,
            user.creditOfferInfo,
            user.chenalsDetails,
            user.fullPrice,
            user.preferedinstallationdate,
            user.noteOrder,
            user.timestamp,
            user.companyName,
            user.comission,
            user.status, 
           user.installationDateTime, 
          ],
        ],
      },
    });
    console.log('Google Sheet Range:', `Form!A${user.sheetRow}:Z${user.sheetRow}`);
    // Check if the update was successful
    console.log('Google Sheet update result:', result);
    if (result.data.updatedCells === 0) {
      console.error('Failed to update Google Sheet:', result);
      return res.status(500).send('Failed to update Google Sheet');
    }
    console.log('Google Sheet updated successfully:', result);

    // Redirect to the admin panel or another page
    res.redirect('/adminPannel');
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Add this route to handle logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/adminLogin');
    }
  });
});
app.get('/userlogout', (req,res) =>{
  req.session.destroy((err) =>{
    if(err){
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/userLogin');
    }
  });
})
// Example Express.js route
app.post('/updateStatus/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const newStatus = req.body.status;
    const installationDateTime = req.body.installationDateTime;
    // Update the status and installationDateTime in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { status: newStatus, installationDateTime: installationDateTime } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({ message: 'Status updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/delete/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).send(`User with ID ${userId} not found.`);
    }

    return res.send(`User with ID ${userId} deleted successfully.`);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
