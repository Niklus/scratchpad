import "./style.css";

const code_input = document.getElementById("code-input");
const output_area = document.getElementById("output");
const runButton = document.getElementById("runButton");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");
const popup = document.getElementById("myPopup");

code_input.value =
  localStorage.getItem("js_code") || "console.log('Hello World');";

code_input.addEventListener("input", async (e) => {
  localStorage.setItem("js_code", code_input.value);
});

runButton.addEventListener("click", () => {
  output_area.innerHTML = "";
  eval(code_input.value);
});

clearButton.addEventListener("click", () => {
  const confirm = window.confirm("Are you sure ?");
  if (!confirm) return;
  output_area.innerHTML = "";
  code_input.value = "";
  localStorage.removeItem("js_code");
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(code_input.value);
  popup.classList.toggle("show");
  setTimeout(() => {
    popup.classList.toggle("show");
  }, 1500);
});

window.console.log = (val, error = false) => {
  const type = typeof val;

  type === "object" ? (val = JSON.stringify(val, null, 2)) : val;

  if (type === "function") {
    val = val.toString();
  }

  if (error) {
    output_area.innerHTML += `<pre class="error"><small>error :</small> ${val}</pre>`;
    return;
  }

  if (type === "string") {
    val = val.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  if (type === "symbol") {
    val = val.toString();
  }

  output_area.innerHTML += `<pre class=${type}><small>${type} :</small> ${val}</pre>`;
};

window.onerror = (message, url, linenumber) => {
  console.log("Error: " + message + " on line " + linenumber, true);
};
