var inputTodo = document.getElementById("inputTodo");
var addTodo = document.getElementById("addTodo");
var ul = document.querySelector("ul");

var todoApp = window.todoApp || {};
var todoAppProxy = new Proxy(todoApp, {
  set: function(target, key, value) {
    target[key] = value;
    if (key === "hasListItem" && value <= 0) {
      toggleUl();
    }
    return true;
  }
});
todoAppProxy.hasListItem = ul.childElementCount;

function toggleUl() {
  if (ul.childElementCount <= 0) {
    ul.style.display = "none";
  } else {
    ul.style.display = "block";
  }
}

function todoClickHandler(event) {
  event.currentTarget.getElementsByTagName("span")[0].classList.toggle("done");
}

function todoDeleteHandler(event) {
  ul.removeChild(event.currentTarget.parentNode);
  todoAppProxy.hasListItem = ul.childElementCount;
}

function inputTodoLength() {
  return inputTodo.value.length;
}

function addTodoItem() {
  var li = document.createElement("li");
  var span = document.createElement("span");
  li.addEventListener("click", todoClickHandler);
  span.innerText = inputTodo.value;
  var deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.addEventListener("click", todoDeleteHandler);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
  inputTodo.value = "";
  if (!todoAppProxy.hasListItem) {
    toggleUl();
  }
}

function addTodoBtnHandler() {
  if (inputTodoLength() > 0) {
    addTodoItem();
  }
}
function addTodoEnterKeyHandler(event) {
  if (inputTodoLength() > 0 && event.keyCode === 13) {
    addTodoItem();
  }
}

function handleContentLoadComplete() {
  console.log("handleContentLoadComplete");
  addTodo.addEventListener("click", addTodoBtnHandler);

  inputTodo.addEventListener("keypress", addTodoEnterKeyHandler);

  toggleUl();
}

// ready state
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", handleContentLoadComplete);
} else {
  handleContentLoadComplete();
}
// this will fire after document's DOMContentLoaded.
window.onload = function() {
  console.log("DOM and media (images, embeds)");
};
