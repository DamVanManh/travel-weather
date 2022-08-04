/**
 * @description Show loading
 * @param {boolean} isShow
 */
function showLoading(isShow) {
  if (isShow) {
    const container = document.createElement("div");
    container.className = "lds-hourglass";
    document.body.appendChild(container);
  } else {
    const container = document.getElementsByClassName("lds-hourglass")[0];
    if (container) {
      container.remove();
    }
  }
}

export { showLoading };
