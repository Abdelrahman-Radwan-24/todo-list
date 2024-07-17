let nameTodo = document.getElementById("nameTodo");
let todoBtn = document.getElementById("todoBtn");
let todoData = document.getElementById("todoData");
let mySelect = document.getElementById("mySelect");
let searchInput = document.getElementById("searchInput");
let updateBtn = document.getElementById("updateBtn");

let containerTodo = [];

let index;

if (localStorage.getItem("containerTodo") != null) {
  containerTodo = JSON.parse(localStorage.getItem("containerTodo"));
  displayData(containerTodo);
}

todoBtn.addEventListener("click", function () {
  let regex = /^[a-zA-Z]{3,25}(\d{1,5})?$/i;
  if (nameTodo.value != "" && regex.test(nameTodo.value)) {
    let todoList = {
      nameTodo: nameTodo.value,
      isCompleted: false,
      id: `${Math.random() * 10000} - ${Math.random() * 10000}`,
    };

    containerTodo.push(todoList);

    displayData(containerTodo);
    localStorage.setItem("containerTodo", JSON.stringify(containerTodo));
    clearInputs();
  } else {
    Swal.fire({
      title: "Invalid Data",
      text: "Please Enter Data",
      icon: "error",
    });
  }
});

function displayData(arra) {
  let box = "";

  for (const task of arra) {
    box += `
    <div class="col-11 mx-auto my-3  ${
      task.isCompleted == true ? "completed" : ""
    }  ">
    <div class="row bg-white ">
      <div class="col-md-6  py-3 fs-5">${task.nameTodo} </div>
      <div class="col-md-2  py-3 bg-success d-flex justify-content-center" onclick="completed('${
        task.id
      }')" ><i class="fa-solid fa-check fs-3  d-flex align-items-center"></i></div>
      <div class="col-md-2  py-3 bg-danger d-flex justify-content-center" onclick="deleteTodo( '${
        task.id
      }' )" ><i class="fa-solid fa-trash fs-3  d-flex align-items-center"></i></div>
      <div class="col-md-2  py-3 bg-info d-flex justify-content-center" onclick="setFormData( '${
        task.id
      }' )"> <i class="fa-solid fa-pen  fs-3  d-flex align-items-center "></i> </div>
    </div>
  </div> 

                `;
  }

  todoData.innerHTML = box;


}

function deleteTodo(id) {
  let index = containerTodo.findIndex(function (task) {
    return task.id == id;
  });

  containerTodo.splice(index, 1);
  displaySelectorData();
  localStorage.setItem("containerTodo", JSON.stringify(containerTodo));
}

function completed(id) {
  let foundedIndex = containerTodo.findIndex(function (task) {
    return task.id == id;
  });

  containerTodo[foundedIndex].isCompleted =
    containerTodo[foundedIndex].isCompleted == true ? false : true;
  displaySelectorData();
  localStorage.setItem("containerTodo", JSON.stringify(containerTodo));
}

mySelect.addEventListener("change", function () {
  displaySelectorData();
});

function displaySelectorData() {
  switch (mySelect.options[mySelect.options.selectedIndex].value) {
    case "All":
      displayData(containerTodo);
      break;

    case "Completed":
      let completedFilter = containerTodo.filter(function (task) {
        return task.isCompleted == true;
      });
      displayData(completedFilter);
      break;

    case "Uncompleted":
      let UncompletedFilter = containerTodo.filter(function (task) {
        return task.isCompleted == false;
      });
      displayData(UncompletedFilter);
      break;
  }
}

searchInput.addEventListener("input", function (e) {
  let searchArray = [];
  for (let i = 0; i < containerTodo.length; i++) {
    if (
      containerTodo[i].nameTodo
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    ) {
      searchArray.push(containerTodo[i]);
    }
  }
  displayData(searchArray);
});

function clearInputs() {
  nameTodo.value = "";
  nameTodo.classList.remove("is-valid");
}

nameTodo.addEventListener("input", function () {
 let regex = /^[a-zA-Z]{3,25}(\d{1,5})?$/i;

  let paraTodo = document.getElementById("paraTodo");

  if (regex.test(nameTodo.value)) {
    nameTodo.classList.add("is-valid");
    nameTodo.classList.remove("is-invalid");
    paraTodo.classList.add("d-none");
  } else {
    nameTodo.classList.add("is-invalid");
    nameTodo.classList.remove("is-valid");
    paraTodo.classList.remove("d-none");
  }
});

function setFormData(indexElement) {
  let updateTodo = containerTodo.findIndex(function (task) {
    return task.id == indexElement;
  });
  if (containerTodo[updateTodo].isCompleted == true) {
    return;
  } else {
    nameTodo.value = containerTodo[updateTodo].nameTodo;

    todoBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

    index = updateTodo;
  }
}

updateBtn.addEventListener("click", function () {
  if (nameTodo.value != "") {
    let newTodoList = {
      nameTodo: nameTodo.value,
      isCompleted: false,
      id: `${Math.random() * 10000} - ${Math.random() * 10000}`,
    };

    containerTodo.splice(index, 1, newTodoList);

    todoBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    localStorage.setItem("containerTodo", JSON.stringify(containerTodo));
    displayData(containerTodo);
    clearInputs();
  } else {
    Swal.fire({
      title: "Invalid Data",
      text: "Please Enter Data",
      icon: "error",
    });
  }
});
