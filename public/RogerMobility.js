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
}  
function licenseAddress(){
    let licesnseNo = document.getElementById('licesnseNo');
    if(licesnseNo.checked){
        document.getElementById('driverLicenseAddress').style.display = "block";
    }
    else{
        document.getElementById('driverLicenseAddress').style.display = "none";
    }
}

function shipAdress() {
    let addressNo = document.getElementById('shippingAddressNo');
    let shipAddressNoLabel = document.getElementById('shippingAddressNoLabel');
    if (addressNo.checked) {
        shipAddressNoLabel.style.display = "block";
    } else {
        shipAddressNoLabel.style.display = "none";
    }
}
function internetAdress(){
    let addressNo = document.getElementById('InternetAddressNo');
    if(addressNo.checked){
        document.getElementById('InternetAddresslabel').style.display = "block";
    } 
    else{
        document.getElementById('InternetAddresslabel').style.display = "none";
    }
}
function addLine() {
    // Clone the existing line and append it to the container
    const linesContainer = document.getElementById('linesContainer');
    const existingLine = document.querySelector('.line');
    const newLine = existingLine.cloneNode(true);
    
    // Clear values in the cloned line
    const inputs = newLine.querySelectorAll('input[type="text"], input[type="tel"]');
    inputs.forEach(input => input.value = '');

    // Append the cloned line to the container
    linesContainer.appendChild(newLine);
}
function deleteLine(button) {
    // Get all lines in the container
    const linesContainer = document.getElementById('linesContainer');
    const lines = linesContainer.querySelectorAll('.line');

    // Check if there is more than one line before deleting
    if (lines.length > 1) {
        // Get the parent div of the button (which is the line) and remove it
        const line = button.parentNode;
        line.parentNode.removeChild(line);
    }
}
function sin() {
    // Get the selected radio button
    let identitySIN = document.getElementById('identitySIN');
    let identityBankInfo = document.getElementById('identityBankInfo');
    let identity = document.getElementById('identity');
    if (identitySIN.checked) {
     document.getElementById('SINSection').style.display = "block";
     document.getElementById('sectionSin').style.display = "block";
     document.getElementById('Bankinfo').style.display = "none";
     document.getElementById('PhotoIdSection').style.display = "none";
    } else if(identityBankInfo.checked){
            document.getElementById('SINSection').style.display = "block";
            document.getElementById('Bankinfo').style.display = "block";
            document.getElementById('sectionSin').style.display = "none"; 
            document.getElementById('PhotoIdSection').style.display = "none";
    }
    else if( identity.checked){
        document.getElementById('PhotoIdSection').style.display = "block";
        document.getElementById('sectionSin').style.display = "block";
        document.getElementById('Bankinfo').style.display = "block";
        document.getElementById('SINSection').style.display = "none";
    }
}
document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    const RogersMobilityData = {
        ReprId: document.getElementById("reId").value,
        name: document.getElementById("name").value,
        date: document.getElementById("date").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        driverLicenseAddress: document.getElementById("driverLicenseAddress").value,
        shipaddress: document.getElementById("shipaddress").value,
        InternetAddress: document.getElementById("InternetAddress").value,
        RogerAccountNumber: document.getElementById("RogerAccountNumber").value,
    };
    RogersMobilityData.choseOrder = "RM";
    // Display the chosen order in the console
    console.log('Chose Order:',RogersMobilityData.choseOrder);
    // Continue with the form submission logic...
const response = await fetch("/submit", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(RogersMobilityData),
});

      // Handle the server response
      const result = await response.json();
      alert(result.message);
      // Refresh the page
      window.location.reload();
});
