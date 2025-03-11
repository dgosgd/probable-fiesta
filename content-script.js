/*
	NEXT STEPS
	- allow multiple student id inputs
	- record names of students who are confirmed
	- click Submit button after entry
	--> Consider if can apply to google classroom for bulk actions.

*/

//test
// define the function that will process a sign up using an ID
function processASignUp (studentID) {
	// Get the active tab
	const activeTab = document.querySelector('.tab-pane.active');
	
	// Let's declare signUpButton before we use it below so that it's in the right scope.
	let signUpButton;

	// Find the "Sign Up" button within the active tab
	if (activeTab) {
		signUpButton = activeTab.querySelector('.btn.btn-danger.btn-sign-up');
	} else {
		console.error('activeTab not defined to select .btn.btn-danger.btn-sign-up');
		}
	
	// Click the "Sign Up" button to open the signup dialog
	if (signUpButton) {
		signUpButton.click();
	} else {
		console.error('signUpButton not defined to be able to click');
		}

	// create a reference to the student id entry text field
	const studentIDInputField = document.querySelector('input[name="data[barcode]"]'); 

	if (studentIDInputField) {
		studentIDInputField.setAttribute('autocomplete', 'new-password');
		console.log('Autocomplete attribute set to "new-password"');
	} else {console.error('Could not find the password input field.');
		}
	
	// create a reference to the teachername text field
	const teacherNameInputField = document.querySelector('input[name="data[teacher1]"]'); 
	
	// Set the value of the teacher text field to Osgood if it has been located.
	if (teacherNameInputField) { 
		teacherNameInputField.focus();
		teacherNameInputField.value = 'Osgood'; 
	} else {
		console.error('Could not find the text field with name "data[teacher1]"');
	}
	
	// Set the value of the student id textbox field to the provided studentID if it has been located.
	if (studentIDInputField) { 
		studentIDInputField.focus();
		studentIDInputField.value = studentID; 
	} else {
		console.error('Could not find the text field with name "data[barcode]"');
	}
	
}

// listen for a message with studentIDValue and update studentID when received
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.studentIDValue) {
        studentID = message.studentIDValue; // Update the value here
        // ... rest of your code to use studentID and fill the form ... 
    } else {
		console.error("message key studentIDValue not defined");
	}
	// Now, run the function processASignUp with that studentID
	if (studentID) {
		processASignUp(studentID);
	} else {
		console.error("could not run processASignUp on studentID");
	}
	
});



//Stuff to Add
/*
//function to parse a list of student ID's
it would need to 
1. receive a string separated by spaces or something
2. find out how many student ids are in it by finding all the spaces
3. return an array consisting of each student id


--> so I guess we need a function to return the array. 

function convertToArray(inputString) {
	const str = "This is a sample string";
	const arrayOfStudentIDs = inputString.split(" ");
	console.log(strArray); // Output: ["This", "is", "a", "sample", "string"]

}

*/

//ISSUES: Fix another time....

/*
function pressTheEscapeKey() {
  const event = new KeyboardEvent('keydown', {
    key: 'Escape',
    code: 'Escape',
    keyCode: 27,
    bubbles: true,
    cancelable: true
  });

  document.dispatchEvent(event);
}

// listen for a message with "pressTheEscapeKeyPlease" and run the pressTheEscapeKey fxn when received
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "pressTheEscapeKeyPlease") {
        pressTheEscapeKey();
    } else {
		console.error("message neq 'pressTheEscapeKeyPlease' or there's another issue.");
	}

});
*/
