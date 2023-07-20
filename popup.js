// Function to show the second popup after clicking "Yes" in the first popup
function showPopup2() {
  document.getElementById("popup1").style.display = "none";
  document.getElementById("popup2").style.display = "block";
}

// Function to show the third popup after setting master password in the second popup
function showPopup3() {
  document.getElementById("popup2").style.display = "none";
  document.getElementById("popup3").style.display = "block";
  document.getElementById("websiteTagInput").value = ""; // Clear inputs when entering popup3
  document.getElementById("usernameInput").value = "";
  document.getElementById("passwordInput").value = "";
  displaySavedPasswords(); // Display saved password data in popup3
}

// Function to show the third popup directly after clicking "No" in the first popup
function showPopup3No() {
  document.getElementById("popup1").style.display = "none";
  document.getElementById("popup2").style.display = "none";
  document.getElementById("popup3").style.display = "block";
  document.getElementById("websiteTagInput").value = ""; // Clear inputs when entering popup3
  document.getElementById("usernameInput").value = "";
  document.getElementById("passwordInput").value = "";
  displaySavedPasswords(); // Display saved password data in popup3
}

// Function to generate a random password
function generateRandomPassword() {
  const length = 12; // Length of the generated password
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?"; // Characters for the password
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  document.getElementById("generatedPassword").value = password;
}

// Function to save the password and display saved data (called after user clicks "Save Password" in popup3)
function savePassword() {
  const websiteTag = document.getElementById("websiteTagInput").value;
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;

  // Validate that required fields are not empty
  if (!websiteTag || !username || !password) {
    alert("Please fill in all fields before saving the password.");
    return;
  }

  // Save the password data
  const savedPasswords = JSON.parse(localStorage.getItem("savedPasswords") || "[]");
  savedPasswords.push({ websiteTag, username, password });
  localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords));

  // Clear inputs after saving
  document.getElementById("websiteTagInput").value = "";
  document.getElementById("usernameInput").value = "";
  document.getElementById("passwordInput").value = "";

  // Display saved password data in popup3
  displaySavedPasswords();
}

// Function to delete a password entry (called when the delete icon is clicked)
function deletePassword(index) {
  const savedPasswords = JSON.parse(localStorage.getItem("savedPasswords") || "[]");
  savedPasswords.splice(index, 1);
  localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords));
  displaySavedPasswords(); // Refresh the displayed password data after deletion
}

// Function to display saved password data in popup3
function displaySavedPasswords() {
  const savedPasswordsDiv = document.getElementById("savedPasswords");

  // Clear the existing content
  savedPasswordsDiv.innerHTML = "";

  // Retrieve saved password data from local storage
  const savedPasswords = JSON.parse(localStorage.getItem("savedPasswords") || "[]");

  // Create and append a new element for each saved password
  for (let i = 0; i < savedPasswords.length; i++) {
    const passwordData = savedPasswords[i];
    const passwordEntry = document.createElement("div");
    passwordEntry.innerHTML = `
      <p>Website Tag: ${passwordData.websiteTag}, Username: ${passwordData.username}, Password: ${passwordData.password}</p>
      <i class="fas fa-trash delete-icon" onclick="deletePassword(${i})"></i>
    `;
    savedPasswordsDiv.appendChild(passwordEntry);
  }
}

// Event listeners for buttons
document.getElementById("yesButton").addEventListener("click", showPopup2);
document.getElementById("noButton").addEventListener("click", showPopup3No);
document.getElementById("setMasterPasswordButton").addEventListener("click", showPopup3);
document.getElementById("generatePasswordButton").addEventListener("click", generateRandomPassword);
document.getElementById("saveButton").addEventListener("click", savePassword);

// Display saved password data in popup3 only
displaySavedPasswords();
