const tab1 = document.getElementById("tab1");
const tab2 = document.getElementById("tab2");
const tab3 = document.getElementById("tab3");

const checkboxName1 = document.getElementById("checkboxName1");
const checkboxName2 = document.getElementById("checkboxName2");
const btnArea = document.getElementById("btnArea");

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

