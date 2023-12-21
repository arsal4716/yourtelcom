//  to send data in db 
const {name, address, email, birthDate, choseId,passportNumber, drivingLicenseNumber,
    expiryDate,} = req.body;
  const newUser = new User ({
    name,
    address,
    email,
    birthDate,
    choseId,
    passportNumber: choseId === 'Passport' ? passportNumber : '',
    drivingLicenseNumber: choseId === 'Driving License' ? drivingLicenseNumber : '',
    expiryDate,
  });
  try{
    await newUser.save();
    console.log('User Saved' + newUser);
  }
  catch(err){
    console.log("data not save: " + err);
    res.send('Data Cannot be save due to this Error:');
  }
  