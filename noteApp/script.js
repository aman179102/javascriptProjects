var clear = document.querySelector('.clear');
var text = document.querySelector('#text');
var downloadButton = document.querySelector(".download");
var fontSizeDropdown = document.querySelector('#font-size-dropdown');
var dropdownContainer = document.querySelector('.dropdown-container');

downloadButton.addEventListener("click", () => {
    // Get the content from the textarea
    var textContent = text.value;

    // Create a Blob from the text content
    var blob = new Blob([textContent], { type: 'text/plain' });

    // Create a download link for the Blob
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'note.txt';  // The name of the file to be downloaded

    // Programmatically trigger a click on the link to start the download
    link.click();
});


clear.addEventListener("click",()=>{
    text.value = '';
})


var toggleSizeButton = document.querySelector('.toggle-size');

// // Toggle font size function
// toggleSizeButton.addEventListener("click", () => {
//     // Check current font size and toggle between two sizes
//     if (text.style.fontSize === '20px') {
//         text.style.fontSize = '14px'; // Normal size
//     } else {
//         text.style.fontSize = '20px'; // Larger size
//     }
// });



// Event to toggle the font size dropdown visibility
toggleSizeButton.addEventListener("click", () => {
    // Toggle the visibility of the dropdown
    if (fontSizeDropdown.style.display === "none" || fontSizeDropdown.style.display === "") {
        fontSizeDropdown.style.display = "block";
    } else {
        fontSizeDropdown.style.display = "none";
    }
});

// Populate the font size dropdown with options from 1px to 100px
function populateFontSizeDropdown() {
    for (let i = 1; i <= 100; i++) {
        var option = document.createElement('option');
        option.value = i + 'px'; // Set value as "1px", "2px", etc.
        option.textContent = i + 'px'; // Display "1px", "2px", etc. in the dropdown
        fontSizeDropdown.appendChild(option);
    }
}

// Set the selected font size in the textarea
fontSizeDropdown.addEventListener("change", (event) => {
    // Change the font size of the textarea to the selected option
    text.style.fontSize = event.target.value;
    // Hide the dropdown after selection
    fontSizeDropdown.style.display = 'none';
});

// Close the dropdown if the user clicks anywhere outside of it
document.addEventListener("click", (event) => {
    if (!dropdownContainer.contains(event.target) && event.target !== toggleSizeButton) {
        fontSizeDropdown.style.display = 'none';
    }
});

// Initialize the font size dropdown when the page loads
populateFontSizeDropdown();


// Keyboard shortcut for Ctrl + Enter to move the cursor to the next line
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior (adding a new line on Enter)
        
        var cursorPosition = text.selectionStart; // Get the current cursor position
        var currentValue = text.value; // Get the current text in the textarea
        
        // Check if the cursor is at the end of the text (so we can safely insert a new line)
        if (cursorPosition === currentValue.length) {
            text.value = currentValue + '\n'; // Simply add a newline at the end of the content
            text.selectionStart = text.selectionEnd = cursorPosition + 1; // Move the cursor to the new line
        } else {
            // Move the cursor to the next line without affecting the text
            text.setSelectionRange(cursorPosition + 1, cursorPosition + 1); // Move the cursor by one character
        }
    }
});
