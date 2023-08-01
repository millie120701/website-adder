var toggle = document.querySelector(".hamburger-menu");

toggle.addEventListener("click", toggleMenu);

function toggleMenu() {
  var nav = document.querySelector(".primary-navigation");
  nav.classList.toggle("active");
  toggle.classList.toggle("active");

  // Use of the ternary operator to set the hamburger icon class
}

var result = "0";
var addActive = false; //tracks operator last selected
var equalsActive = false;
var prevNum = "";

var output = document.querySelector(".output");
var numberButtons = document.querySelectorAll(".key--num");

function inputNum(num) {
  var noDecimal = output.innerHTML.replace(".", "");
  //num cannot be > 9 digits
  if (addActive === true) {
    output.innerHTML = num;
    addActive = false;
  } else {
    if (noDecimal.length < 9) {
      //handles 0 at the beginning
      if (output.innerHTML === "0" && result == 0) {
        output.innerHTML = num; // Concatenate "0" with the input number
      } else {
        output.innerHTML += num;
      }
    }
  }
}

//handles backspace and ensures there is always a placehold value

function handleBackspace() {
  // If the output is not empty, remove the last character
  if (output.innerHTML.length > 0) {
    output.innerHTML = output.innerHTML.slice(0, -1);
  }
  // If the output becomes empty, reset it to "0"
  if (output.innerHTML === "") {
    output.innerHTML = "0";
  }
}

//ensures 1 decimal per number

function inputDecimal() {
  // Check if there's already a decimal point
  if (!output.innerHTML.includes(".")) {
    //if not, add decimal point
    output.innerHTML += ".";
  } else {
    return;
  }
}

//handles numbers pressed
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (!isNaN(parseInt(key, 10))) {
    inputNum(key);
  } else if (key === "Backspace") {
    handleBackspace();
  } else if (key === ".") {
    inputDecimal();
  } else if (key === "+") {
    addFunc();
  } else if (key === "=") {
    equalsFunc();
  }
});

//handles buttons pressed
numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    inputNum(button.innerHTML);
  });
});

var addButton = document.querySelector(".key--operator");
addButton.addEventListener("click", addFunc);

var enterButton = document.querySelector(".key--enter");
enterButton.addEventListener("click", equalsFunc);

var enterButton = document.querySelector(".key--decimal");
enterButton.addEventListener("click", inputDecimal);

var resetButton = document.querySelector(".key--reset");
resetButton.addEventListener("click", function () {
  result = "0";
  addActive = false;
  equalsActive = false;
  prevNum = "";
  output.innerHTML = result;
});

// add function

function add(fn) {
  return new Function("return " + fn)();
}

function addFunc() {
  //if you click +, the contents of the output are stored
  //if equals is false, add like normal
  //if equals is true, make it false
  if (equalsActive === true) {
    equalsActive = false;
  } else if (equalsActive === false) {
    prevNum = output.innerHTML;
  }
  if (addActive === false) {
    result = add(`${result}+${output.innerHTML}`);
    handleAddClick(result);
  }
}

function equalsFunc() {
  if (addActive === true && equalsActive === false) {
    equalsActive = true;
    prevNum = output.innerHTML;
    result = add(`${output.innerHTML}+${prevNum}`);
    handleAddClick(result);
    return;
  }
  if (addActive === true && equalsActive === true) {
    result = add(`${output.innerHTML}+${prevNum}`);
    handleAddClick(result);
    return;
  }
  if (equalsActive === false) {
    addFunc();
    equalsActive = true;
  } else {
    result = add(`${output.innerHTML}+${prevNum}`);
    handleAddClick(result);
  }
}

function exponentialRound(num) {
  num = num.toExponential();
  let indexDecimal = String(num).indexOf(".");
  if (indexDecimal != -1) {
    let indexE = String(num).indexOf("e");
    let numsAfterDecimal = num.slice(indexDecimal + 1, indexE);

    //round so total digits is 9, ignoring .
    let finalNums = numsAfterDecimal.slice(0, 6 - indexDecimal);

    return num.substring(0, indexDecimal + 1) + finalNums + num.slice(-3);
  } else {
    return num;
  }
}

function handleAddClick(result) {
  //check if large enough to be exponential
  stringNum = String(result);
  noDecimal = stringNum.replace(".", "");
  if (result > 999999999) {
    result = exponentialRound(result);
    output.innerHTML = result;
    addActive = true;
  }
  //check if decimal, if so, deal with floating point errors

  //2 decimal cases
  //1: 9 digits or less - fixed nums is num of digits
  else if (stringNum.includes(".") && stringNum.length <= 9) {
    //must be no more than 9 digits, find index of decimal point
    //find digits before the "."
    //digits after "." is 9- digits before
    //num of digits before:
    indexDecimal = stringNum.indexOf(".");

    result = parseFloat(result).toFixed(stringNum.length - 1 - indexDecimal);
    output.innerHTML = result * 1;
    addActive = true;
    //2: more than 9 digits
  } else if (stringNum.includes(".") && stringNum.length > 9) {
    indexDecimal = stringNum.indexOf(".");
    result = parseFloat(result).toFixed(9 - indexDecimal);
    output.innerHTML = result * 1;
    addActive = true;
  } else {
    //base case, not decimal, not exponential
    output.innerHTML = result;
    addActive = true;
  }
}

//clicking + will disable equals but make addActive true
//clicking = when addActive is true will cause the num on the screen to be
//added and that becomes the prev num

//num, add, equals
//add active

/*
var result = "0";
var addActive = false;

var output = document.querySelector(".output");
// contents of output: output.innerHTML)

var resetButton = document.querySelector(".key--reset");
resetButton.addEventListener("click", function () {
  result = 0;
  output.innerHTML = result;
});

function handleNumberButtonClick(buttonText) {
  if (addActive === true) {
    output.innerHTML = buttonText;
    addActive = false;
  } else {
    if (output.innerHTML === "0" && result == 0) {
      output.innerHTML = buttonText;
    } else {
      if (buttonText === ".") {
        // Check if there's already a decimal point
        if (!output.innerHTML.includes(".")) {
          output.innerHTML += buttonText;
        }
      } else {
        noDecimal = output.innerHTML.replace(".", "");
        // Prevent inputting more than 9 digits
        if (noDecimal.length >= 9) {
          return;
        }
        output.innerHTML += buttonText;
      }
    }
  }
}

var numberButtons = document.querySelectorAll(".key--num");
numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    handleNumberButtonClick(button.innerHTML);
  });
});

function add(fn) {
  return new Function("return " + fn)();
}

function exponentialRound(num) {
  num = num.toExponential();
  let indexDecimal = String(num).indexOf(".");
  if (indexDecimal != -1) {
    let indexE = String(num).indexOf("e");
    let numsAfterDecimal = num.slice(indexDecimal + 1, indexE);

    //round so total digits is 9, ignoring .
    let finalNums = numsAfterDecimal.slice(0, 6 - indexDecimal);

    return num.substring(0, indexDecimal + 1) + finalNums + num.slice(-3);
  } else {
    return num;
  }
}

var addButton = document.querySelector(".key--operator");
addButton.addEventListener("click", function () {
  handleAddClick();
});

function handleAddClick() {
  if (addActive === false) {
    result = add(`${result}+${output.innerHTML}`);
    //check if large enough to be exponential
    stringNum = String(result);
    noDecimal = stringNum.replace(".", "");
    if (result > 999999999) {
      result = exponentialRound(result);
      output.innerHTML = result;
      addActive = true;
    }
    //check if decimal, if so, deal with floating point errors

    //2 decimal cases
    //1: 9 digits or less - fixed nums is num of digits
    else if (stringNum.includes(".") && stringNum.length <= 9) {
      //must be no more than 9 digits, find index of decimal point
      //find digits before the "."
      //digits after "." is 9- digits before
      //num of digits before:
      indexDecimal = stringNum.indexOf(".");
      //22.2, index decimal shows 2 nums before decimal point
      //length of string is 4, 1 is the point so 3-2 = 1 num after decimal point
      result = parseFloat(result).toFixed(stringNum.length - 1 - indexDecimal);
      output.innerHTML = result;
      addActive = true;
      //2: more than 9 digits
    } else if (stringNum.includes(".") && stringNum.length > 9) {
      indexDecimal = stringNum.indexOf(".");
      result = parseFloat(result).toFixed(9 - indexDecimal);
      output.innerHTML = result;
      addActive = true;
    } else {
      //base case, not decimal, not exponential
      output.innerHTML = result;
      addActive = true;
    }
  }
}

function handleBackspace() {
  const currentOutput = output.innerHTML;

  // If the output is not empty, remove the last character
  if (currentOutput.length > 0) {
    output.innerHTML = currentOutput.slice(0, -1);

    // If the output becomes empty, reset it to "0"
    if (output.innerHTML === "") {
      output.innerHTML = "0";
    }

    // If addActive is true, reset it to false
    addActive = false;
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Check if the pressed key is a number (0-9) or the decimal point
  if (!isNaN(key) || key === ".") {
    handleNumberButtonClick(key);
  } else if (key == "+") {
    handleAddClick();
  } else if (key == "Enter" || key == "=") {
    handleAddClick();
  } else if (key == "Backspace") {
    handleBackspace();
  }
});
*/
