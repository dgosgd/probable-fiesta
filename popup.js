// define a function which will inject a script
function injectTheScript() {
  if (typeof window.scriptInjected === 'undefined') {
	  // set this to true now so we know for later
	  window.scriptInjected = true;
	  // Get the current active tab to inject into.
	  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		// Inject the script into that active tab.
		chrome.scripting.executeScript({
		  target: { tabId: tabs[0].id },
		  files: ['content-script.js']
		 });
	  });
  } else {
	  console.error("There is already a script injected into this page.");
	}
}

//inject the script
injectTheScript();

// Get the live reference to the text box so we can call it later.
const studentIDPopupField = document.getElementById('studentIDPopupField');

// Put the cursor in the field. 
studentIDPopupField.focus();

//Lets create a fumction to also trigger on am emter press.
function submitID() {
  // Take the value from the studentIDPopupField
  let currentStudentID = studentIDPopupField.value;

  // Send currentStudentID in a message to the content_script
	// ! Sometime, I should just make this a variable that's available the whole time.
	// (This tabs thing.)
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { studentIDValue: currentStudentID });
  });
}

// Add event listener so that we can tell when the submitIDButton is clicked.
document.getElementById('submitIDButton').addEventListener('click', () => submitID());

// Also add a listener that will "push" the button if Enter is pressed whiel in the text field.
studentIDPopupField.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitIDButton").click();
    }
})

/*

NOT WORKING YET

// Add an event listener to tell when the Simulate Esc Key button is pressed.
document.getElementById('escPressButton').addEventListener('click',  () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(tabs[0].id, "pressTheEscapeKeyPlease" );
	});
});

*/