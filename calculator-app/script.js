document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const darkModeToggle = document.getElementById("darkModeToggle");
    let shouldClearScreen = false; // Flag to track when to clear screen

    // Set initial display value to "0"
    function updateDisplay(value) {
        display.value = value || "0"; 
    }

    // Function to handle number inputs
    function appendNumber(number) {
        if (shouldClearScreen) {
            display.value = ""; // Clear screen if a new number is entered after calculation
            shouldClearScreen = false;
        }
        if (display.value === "0") {
            display.value = number; // Replace "0" when typing the first number
        } else {
            display.value += number;
        }
    }

    // Function to handle decimal points (prevent multiple)
    function appendDecimal() {
        if (shouldClearScreen) {
            display.value = "0."; // Start fresh if a decimal is entered after calculation
            shouldClearScreen = false;
        } else if (!display.value.includes(".")) {
            display.value += ".";
        }
    }

    // Function to handle operator inputs
    function appendOperator(operator) {
        const lastChar = display.value[display.value.length - 1];
        if (!isNaN(lastChar)) {
            display.value += operator;
            shouldClearScreen = false; // Ensure screen isn't cleared after an operator
        }
    }

    // Function to clear the display
    function clearDisplay() {
        display.value = "0"; // Reset to "0" instead of empty
        shouldClearScreen = false;
    }

    // Function to delete the last character
    function deleteLast() {
        if (display.value.length > 1) {
            display.value = display.value.slice(0, -1);
        } else {
            display.value = "0"; // Ensure display is never empty
        }
    }

    // Function to calculate result
    function calculate() {
        try {
            display.value = eval(display.value);
            shouldClearScreen = true; // Set flag to clear screen on next input
        } catch (error) {
            display.value = "Error";
            shouldClearScreen = true;
        }
    }

    // Function to handle percentage calculations
    function calculatePercentage() {
        try {
            display.value = eval(display.value) / 100;
            shouldClearScreen = true; // Set flag to clear screen on next input
        } catch (error) {
            display.value = "Error";
            shouldClearScreen = true;
        }
    }

    // Dark mode toggle
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Initialize display with "0"
    updateDisplay("0");

    // Expose functions globally
    window.appendNumber = appendNumber;
    window.appendDecimal = appendDecimal;
    window.appendOperator = appendOperator;
    window.calculate = calculate;
    window.clearDisplay = clearDisplay;
    window.deleteLast = deleteLast;
    window.calculatePercentage = calculatePercentage;
});
