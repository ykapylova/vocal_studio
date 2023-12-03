export const showError = (error, message) => {
  try {
    let errorBox = document.createElement("div");

    errorBox.classList.add("error-box");
    errorBox.innerHTML = `<div id="error">
      <p><b>${message}</b></p>
      <p>${error}</p>
    </div>`;
    console.log("hi");

    document.body.querySelector(".App").appendChild(errorBox);

    setTimeout(() => {
      document.body.querySelector(".App").removeChild(errorBox);
    }, 4000);
  } catch (err) {
    console.log(err);
  }
};
