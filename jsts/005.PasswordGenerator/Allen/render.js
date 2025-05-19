const tab1 = document.getElementById("tab1");
const tab2 = document.getElementById("tab2");
const tab3 = document.getElementById("tab3");

const checkboxName1 = document.getElementById("checkboxName1");
const checkboxName2 = document.getElementById("checkboxName2");
const btnArea = document.getElementById("btnArea");

const rangeInput = document.getElementById("charRange");
const charValue = document.getElementById("charValue");
const passwordLength = document.getElementById("passwordLength");

rangeInput.addEventListener("input", () => {
  passwordLength.value = rangeInput.value;
});

function updateLabels(tabId) {
  if (tabId === "tab1") {
    checkboxName1.textContent = "Numbers";
    checkboxName2.textContent = "Symbols";
    btnArea.classList.remove("visually-hidden");
  } else if (tabId === "tab2") {
    checkboxName1.textContent = "Capitalize the first letter";
    checkboxName2.textContent = "Use full words";
    btnArea.classList.remove("visually-hidden");
  } else if (tabId === "tab3") {
    btnArea.classList.add("visually-hidden");
  }
}

[tab1, tab2, tab3].forEach((tab) => {
  tab.addEventListener("change", () => {
    if (tab.checked) {
      updateLabels(tab.id);
    }
  });
});

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  const checkedTab = [tab1, tab2, tab3].find((t) => t.checked);
  if (checkedTab) {
    updateLabels(checkedTab.id);
  }
});

class PasswordGenerator {
  constructor() {
    this.lengthInput = document.getElementById("charRange");
    this.includeNumbers = false;
    this.includeSymbols = false;
  }

  getPasswordLength() {
    return parseInt(this.lengthInput.value, 10);
  }

  getPasswordMaxLength() {
    return parseInt(this.lengthInput.max, 10);
  }

  generate() {
    const length = this.getPasswordLength();
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;':\",.<>/?";

    let chars = letters;
    if (this.includeNumbers) chars += numbers;
    if (this.includeSymbols) chars += symbols;

    if (!this.includeNumbers && !this.includeSymbols) {
      chars = letters;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  }
}

function updateAndDisplayPassword() {
  generator.includeNumbers = numberCheckbox.checked;
  generator.includeSymbols = symbolCheckbox.checked;
  const pwd = generator.generate();
  resultDisplay.textContent = pwd;
}

const generator = new PasswordGenerator();
const resultDisplay = document.getElementById("resultDisplayArea");
const copyBtn = document.getElementById("copyBtn");
const refreshBtn = document.getElementById("refreshBtn");

// Get checkbox elements and add event listeners
const numberCheckbox = document.getElementById("numberCheckBtn");
const symbolCheckbox = document.getElementById("symbolCheckBtn");

numberCheckbox.addEventListener("change", updateAndDisplayPassword); // Update password when checkbox changes
symbolCheckbox.addEventListener("change", updateAndDisplayPassword); // Update password when checkbox changes

rangeInput.addEventListener("input", () => {
  passwordLength.value = rangeInput.value;
  updateAndDisplayPassword();
});

passwordLength.addEventListener("input", () => {
  if (passwordLength.value > generator.getPasswordMaxLength()) {
    passwordLength.value = generator.getPasswordMaxLength();
    rangeInput.value = generator.getPasswordMaxLength();
  }
  rangeInput.value = passwordLength.value;
  updateAndDisplayPassword();
});

refreshBtn.addEventListener("click", updateAndDisplayPassword);

copyBtn.addEventListener("click", () => {
  const pwd = resultDisplay.textContent;
  if (pwd) {
    navigator.clipboard.writeText(pwd).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy password";
      }, 1500);
    });
  }
});

// Trigger once on load
window.addEventListener("DOMContentLoaded", updateAndDisplayPassword);
