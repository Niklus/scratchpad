import "./style.css";

const text_area = document.getElementById("editor");
const output_area = document.getElementById("output");
const button = document.getElementById("runButton");

button.addEventListener("click", () => {
  output_area.innerHTML = "";
  eval(text_area.value);
});

window.console.log = function (val) {
  const type = typeof val;
  type === "object" ? (val = JSON.stringify(val)) : val;
  output_area.innerHTML += `<small>${type}</small> <span>${val}</span><br/><br/> `;
};

// TODO: Add a button to clear the output area
// TODO: Add error handling for invalid code

text_area.addEventListener("keyup", () => {
  localStorage.setItem("js_code", text_area.value);
});

text_area.value = localStorage.js_code || "";
