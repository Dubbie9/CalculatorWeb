//call buttons and signs
const buttons = document.querySelectorAll(".number");
const signs = document.querySelectorAll(".sign");

//call equation
let screen = document.querySelector(".equation");

// call equal sign and clear sign
let clear = document.querySelector(".clear");
let del = document.querySelector(".delete");

//call solve
const solve = document.getElementById("solve");
let solution = document.querySelector(".solution");
let answer = document.querySelector(".result");

//quadratic equation
const inputcontroller = document.querySelector(".input-control");
const quadContainer = document.querySelector(".quad_inp");
const toggleQuad = document.querySelector(".quad");
const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");

window.addEventListener("load", (e) => {
  quadContainer.style.display = "none";
  a.classList.add("focused");
  inputcontroller.textContent = "b";
});

const overlay = document.querySelector(".lightening-overlay");
const toggle_theme = document.querySelector(".lightening");

//add event listener to the toggle theme button
toggle_theme.addEventListener("click", (e) => {
  if (e.target.tagName == "svg" || e.target.className == "lightening-overlay") {
    let current_theme = document
      .querySelector("html")
      .getAttribute("data-theme");

    if (current_theme == "dark") {
      document.querySelector("html").setAttribute("data-theme", "light");
      overlay.classList.remove("overlay-position-dark");
      overlay.classList.add("overlay-position-light");
    } else {
      document.querySelector("html").setAttribute("data-theme", "dark");
      overlay.classList.remove("overlay-position-light");
      overlay.classList.add("overlay-position-dark");
    }
  }
});

// toggle_theme.addEventListener('click',function(e){
//     let current_theme = document.querySelector("html").getAttribute("data-theme")

//     if(current_theme === "dark"){
//         document.querySelector("html").setAttribute("data-theme","light")
//         this.classList.remove("overlay-position-dark")
//         this.classList.add("overlay-position-light")
//     } else {
//         document.querySelector("html").setAttribute("data-theme","dark")
//         this.classList.remove("overlay-position-light")
//         this.classList.add("overlay-position-dark")
//     }
// });

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (quadContainer.style.display == "") {
      document.querySelector(".focused").value += btn.textContent;
    } else {
      screen.textContent += btn.textContent + " ";
    }
  });
});

signs.forEach((sign) => {
  sign.addEventListener("click", () => {
    if (quadContainer.style.display == "") {
      let inputValue = document.querySelector(".focused").value.trim();
      if (inputValue == "") {
        if (sign.textContent == "–" || sign.textContent == "+") {
          document.querySelector(".focused").value = sign.textContent;
        } else {
        }
      }
    }
    let signs = ["÷", "–", "×", "+"];
    let content = screen.textContent.trim();
    if (
      signs.includes(content.slice(content.length - 1)) &&
      content.slice(content.length - 1) == sign.textContent
    ) {
      //do nothing
    } else {
      screen.textContent += sign.textContent + " ";
    }
  });
});

clear.addEventListener("click", () => {
  if (quadContainer.style.display == "") {
    let inputs = document.querySelectorAll("input[type = 'text']");
    inputs.forEach((input) => (input.value = ""));
    a.classList.add("focused");
    b.classList.remove("focused");
    c.classList.remove("focused");
    inputcontroller.textContent = "b";
  } else {
    screen.textContent = "";
    answer.innerHTML = "";
    solution.classList.remove("add-solution");
    screen.classList.remove("remove-equation");
  }
});

del.addEventListener("click", () => {
  if (quadContainer.style.display == "") {
    document.querySelector(".focused").value = document
      .querySelector(".focused")
      .value.slice(0, -1);
  } else {
    let content = screen.textContent.trim();
    if (screen.innerHTML.trim().length == 1) {
      screen.textContent = content.slice(0, -1);
      answer.innerHTML = "";
      solution.classList.remove("add-solution");
      screen.classList.remove("remove-equation");
    } else {
      screen.textContent = content.slice(0, -1);
    }
    screen.textContent = content.slice(0, -1);
  }
});

solve.addEventListener("click", () => {
    if(quadContainer.style.display == ""){
    solveQuad()
    }else {
  let split_equation = screen.textContent.trim().split(" "); // 2 x 8
  let new_equation = split_equation
    .map((x) => (x == "÷" ? "/" : x))
    .map((x) => (x == "×" ? "*" : x))
    .map((x) => (x == "–" ? "-" : x))
    .join(""); // 2 * 8

    try {
      if(screen.textContent.trim() != ""){
        let ans = eval(new_equation); // 16
      answer.innerHTML = ans;
      solution.classList.add("add-solution");
      screen.classList.add("remove-equation");
      }
    }catch(err){
      answer.innerHTML = err.name;
      solution.classList.add("add-solution");
      screen.classList.add("remove-equation");
    }
}
});

inputcontroller.addEventListener("click", (e) => {
  if (quadContainer.style.display == "") {
    let controlValue = inputcontroller.textContent.trim();
    console.log(controlValue);
    if (controlValue == "a") {
      a.classList.add("focused");
      b.classList.remove("focused");
      c.classList.remove("focused");
      inputcontroller.textContent = "b";
    } else if (controlValue == "b") {
      b.classList.add("focused");
      a.classList.remove("focused");
      c.classList.remove("focused");
      inputcontroller.textContent = "c";
    } else if (controlValue == "c") {
      c.classList.add("focused");
      a.classList.remove("focused");
      b.classList.remove("focused");
      inputcontroller.textContent = "a";
    }
  }
});

toggleQuad.addEventListener("click", (e) => {
  if (quadContainer.style.display == "none") {
    quadContainer.style.display = "";
    screen.style.display = "none";
    screen.textContent = "";
    answer.innerHTML = "";
    solution.classList.remove("add-solution");
    screen.classList.remove("remove-equation");
  } else {
    quadContainer.style.display = "none";
    screen.style.display = "";
  }
});

// quadratic equation
function solveQuad() {
  let a_val = Number(a.value.split().map(x => x == "–" ? "-" :x).join(""));
  let b_val = Number(b.value.split().map(x => x == "–" ? "-" :x).join(""));
  let c_val = Number(c.value.split().map(x => x == "–" ? "-" :x).join(""));
  
  let discriminant = (b_val * b_val - 4 * a_val * c_val) ** 0.5;
  let x1, x2;

  x1 = (-b_val + discriminant) / (2 * a_val);
  x2 = (-b_val - discriminant) / (2 * a_val);

  solution.classList.add("add-solution");
  screen.classList.add("remove-equation");
  quadContainer.style.display = "none";

  if (x1.toString().includes(".") || x2.toString().includes(".")) {
    answer.innerHTML = `x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`;
  } else {
    answer.innerHTML = `x1 = ${x1}, x2 = ${x2}`;
  }
}
