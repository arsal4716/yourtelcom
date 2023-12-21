function showOrderField() {
  let selectedOrder = document.getElementById("choseOrder").value;
  let formContainer = document.getElementById('formContainer');
  // Clear existing content and hide elements
  formContainer.innerHTML = "";
  document.getElementById("orderType").style.display = "none";
  document.getElementById("customerType").style.display = "none";
  document.getElementById("creditInfo").style.display = "none";
  document.getElementById("ExistingCustomer").style.display = "none";
  document.getElementById('orderTypeSelect').value = ""; 
  document.getElementById('customerTypeSelect').value = "";
  if (selectedOrder === "Rogers" || selectedOrder === "Bell") {
      document.getElementById('form').style.display = "block";
  } else if (selectedOrder === "RM") {
    document.getElementById('form').style.display = "none";
    fetch('RogersMobility.html')
   .then(response => response.text())
   .then(data => {
      formContainer.innerHTML = data;
   })
   .catch(error => console.error('Error loading form:', error));

  }
  // Show elements based on selectedOrder
  if (selectedOrder === "Rogers") {
    document.getElementById("orderType").style.display = "block";
    document.getElementById("customerType").style.display = "block";
  }
}

function customerField() {
  let selectOrder = document.getElementById("orderTypeSelect").value;
  document.getElementById("creditInfo").style.display = "none";
  document.getElementById("passportSection").style.display = "none";
  document.getElementById("drivingSection").style.display = "none";
  document.getElementById("choseId").style.display = "block";
  document.getElementById("expiryDate").style.display = "block";
  document.getElementById("expiryDateLabel").style.display = "block";
  document.getElementById('customerTypeSelect').value = "";
  if (selectOrder === "RId" || selectOrder === "CId") {
    document.getElementById("creditInfo").style.display = "block";
  } else if (
    selectOrder === "RnoId" ||
    selectOrder === "CnoId"
  ) {
    document.getElementById("creditInfo").style.display = "block";
    document.getElementById("choseId").style.display = "none";
    document.getElementById("expiryDate").style.display = "none";
    document.getElementById("expiryDateLabel").style.display = "none";
  }
}
// Existing Customer
function ExistingCustomer() {
  let customerTypeSelect = document.getElementById("customerTypeSelect");
  let customerType = customerTypeSelect.value;
  let choseOrder = document.getElementById("choseOrder").value;
  let existingCustomerForm = document.getElementById("ExistingCustomer");

  // Get the selected option element
  let selectedOption = customerTypeSelect.options[customerTypeSelect.selectedIndex];

  if (customerType === "Existing" && choseOrder === "Rogers") {
    existingCustomerForm.style.display = "block";
    
    // Change the text content of the selected option
    selectedOption.textContent = "Existing";
  } else {
    existingCustomerForm.style.display = "none";
    
    // Change the text content of the selected option
    selectedOption.textContent = "New";
  }
}

// Function to handle the 'choseId' selection
function showSelectId() {
  let selectId = document.getElementById("choseId").value;
  document.getElementById("passportSection").style.display = "none";
  document.getElementById("drivingSection").style.display = "none";

  if (selectId === "Passport") {
    document.getElementById("passportSection").style.display = "block";
  } else if (selectId === "Driving License") {
    document.getElementById("drivingSection").style.display = "block";
  }
}
// Cell port section
function showYesField() {
  document.getElementById("PortYesSection").style.display = "flex";
  document.getElementById("mainNoSection").style.display = "none";
}
function showNoField() {
  document.getElementById("mainNoSection").style.display = "flex";
  document.getElementById("PortYesSection").style.display = "none";
}
// Home secton
function homeSection() {
  document.getElementById("homeSection").style.display = "flex";
  document.getElementById('homeSectionRoger').style.display = 'none';
  document.getElementById('homeSectionbell').style.display = 'none';
  let choseOrder = document.getElementById('choseOrder').value;
  if(choseOrder === 'Rogers'){
    document.getElementById('homeSectionRoger').style.display = 'block';
    document.getElementById('homeSectionbell').style.display = 'none';
  }
  else if(choseOrder === 'Bell'){
    document.getElementById('homeSectionbell').style.display = 'block';
    document.getElementById('homeSectionRoger').style.display = 'none';
  }
}
// Internet seciton
function intrnetSection() {
  document.getElementById("internetSection").style.display = "block";
  document.getElementById('internetRogers').style.display = "none";
  document.getElementById('internetBell').style.display = "none";

  let choseOrder = document.getElementById('choseOrder').value;
  if(choseOrder === 'Rogers'){
    document.getElementById('internetRogers').style.display = "block";
    document.getElementById('internetBell').style.display = "none";
  }
  else if(choseOrder === 'Bell'){
    document.getElementById('internetBell').style.display = 'block';
    document.getElementById('internetRogers').style.display = 'none';

  }
}
// tv Section
function tvSection() {
  document.getElementById("tvSection").style.display = "block";
  document.getElementById('TvRogers').style.display = "none";
  document.getElementById('Tvbell').style.display = "none";

  let choseOrder = document.getElementById('choseOrder').value;
  if(choseOrder === 'Rogers'){
    document.getElementById('TvRogers').style.display = "block";
    document.getElementById('Tvbell').style.display = "none";
  }
  else if(choseOrder === 'Bell'){
    document.getElementById('Tvbell').style.display = 'block';
    document.getElementById('TvRogers').style.display = 'none';
  }
}

// Extra Section
function extraSection() {
  document.getElementById("ExtraSection").style.display = "block";
}
// credit section
function creditSection() {
  document.getElementById("creditSection").style.display = "block";
}
// Extra Chennals
function extraChennals() {
  document.getElementById("extraChennalSection").style.display = "block";
}
// Form submit event handler
document
  .querySelector("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    document.getElementById("loader").style.display = "block";
    // Get license number based on the selected ID
    let licenseNumber;
    if (document.getElementById("choseId").value === "Passport") {
      licenseNumber = document.getElementById("passportNumber").value;
    } else if (document.getElementById("choseId").value === "Driving License") {
      licenseNumber = document.getElementById("drivingLicenseNumber").value;
    }
    const portPhoneYes = document.getElementById("phoneYes").checked;
    // const portPhoneNo = document.getElementById("phoneNo").checked;
    const portPhoneData = {
      portingNumber: portPhoneYes
        ? document.getElementById("portingNumber").value
        : "",
      ProviderName: portPhoneYes
        ? document.getElementById("ProviderName").value
        : "",
      AccountNumber: portPhoneYes
        ? document.getElementById("AccountNumber").value
        : "",
      portPhoneNumber: portPhoneYes
        ? document.getElementById("portPhoneNumber").value
        : "",
      mainNumber: !portPhoneYes
        ? document.getElementById("mainNumber").value
        : "",
      mainCell: !portPhoneYes ? document.getElementById("mainCell").value : "",
    };
    console.log(portPhoneData);

    // Prepare form data
    const formData = {
      // Add more fields as needed
      choseOrder: document.getElementById('choseOrder').value,
      orderTypeSelect: document.getElementById('orderTypeSelect').value,
      customerTypeSelect: document.getElementById('customerTypeSelect').value,
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      email: document.getElementById("email").value,
      birthDate: document.getElementById("birthDate").value,
      choseId: document.getElementById("choseId").value,
      licenseNumber: licenseNumber,
      // selectedPackage: selectedPackage,
      expiryDate: document.getElementById("expiryDate").value,
      phoneYes: document.getElementById("phoneYes").checked ? "Yes" : "",
      phoneNo: document.getElementById("phoneNo").checked ? "No" : "",
      portingNumber: document.getElementById("portingNumber").value,
      ProviderName: document.getElementById("ProviderName").value,
      AccountNumber: document.getElementById("AccountNumber").value,
      portPhoneNumber: document.getElementById("portPhoneNumber").value,
      mainNumber: document.getElementById("mainNumber").value,
      mainCell: document.getElementById("mainCell").value,
      // home section if checked
      Homepackage: document.getElementById("Homepackage").checked 
      ? "yes" : "",
      line: document.getElementById("Homepackage").checked
      ? document.getElementById("line").value
      : "",
        // internet section if checked
        InternetPackage: document.getElementById("InternetPackage").checked
        ? "yes"
        : "",
        speed: document.getElementById("InternetPackage").checked
        ? document.getElementById("speed").value
        : "",
          // tv section if yes
          TvPackage: document.getElementById("TvPackage").checked ? "yes" : "",
          TvPackageinfo: document.getElementById("TvPackage").checked
            ? document.getElementById("TvPackageinfo").value
            : "",
        // Extra box
        ExtraPackage: document.getElementById("ExtraPackage").checked
        ? "yes"
        : "",
      boxesQuality: document.getElementById("ExtraPackage").checked
        ? document.getElementById("boxesQuality").value
        : "",
          // creditOffer
      creditOffer: document.getElementById("creditOffer").checked ? "yes" : "",
      creditOfferInfo: document.getElementById("creditOfferInfo").value,
      // extra chennal details
      ExtraChennals: document.getElementById("ExtraChennals").checked
        ? "yes"
        : "",
      chenalsDetails: document.getElementById("chenalsDetails").value,
      // price details
      fullPrice: document.getElementById("fullPrice").value,
      preferedinsdate: document.getElementById('preferedinsdate').value,
      noteOrder: document.getElementById("noteOrder").value,
      
    };
    // updateSelectedPackage(line, InternetPackage, speed, TvPackage, TvPackageinfo, ExtraPackage)
    document.querySelector('.overlay').style.display = 'flex';

    // Simulate form submission (you can replace this with actual form submission logic)
    setTimeout(function () {
      // Hide the overlay after a delay (replace this with your actual form submission logic)
      document.querySelector('.overlay').style.display = 'none';
    }, 3000);
    // Send form data to the server
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Handle the server response
    const result = await response.json();
    alert(result.message);
    // Refresh the page
    window.location.reload();
  });

// Function to hide the text field if 'Yes' is selected
function showTextField() {
  document.getElementById("licenseAddressField").style.display = "none";
};


