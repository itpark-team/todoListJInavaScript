class TodoItem {
    #id;
    #date;
    #description;

    constructor(date, description) {
        this.#id = 0;
        this.#date = date;
        this.#description = description;
    }

    setId(id) {
        this.#id = id;
    }

    getId() {
        return this.#id;
    }

    getDate() {
        return this.#date;
    }

    getDescription() {
        return this.#description;
    }
}

class TodoItemsManager {
    #todoItems;
    #todoItemsId;

    constructor() {
        this.#todoItems = [];
        this.#todoItemsId = 0;
    }

    addNew(todoItem) {
        this.#todoItemsId++;
        todoItem.setId(this.#todoItemsId);

        this.#todoItems.push(todoItem);
    }

    getAll() {
        return this.#todoItems;
    }

    deleteById(id) {
        let index = this.#todoItems.findIndex(todoItem => {
            return todoItem.getId() === id;
        });
        this.#todoItems.splice(index, 1);
    }
}

let todoItemsManager = new TodoItemsManager();
clearInputFields();

function clearInputFields() {
    let inputDateField = document.getElementById("input-date-field");
    let inputTaskField = document.getElementById("input-task-field");

    inputDateField.valueAsDate = new Date();
    inputTaskField.value = "";
}

function showTodoItems() {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date) {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
        ].join('.');
    }

    let tableHtml = "";
    tableHtml += `<table class="table mb-4">`;
    tableHtml +=
        `<thead>
        <tr>
            <th scope="col">№</th>
            <th scope="col">Дата</th>
            <th scope="col">Задача</th>
            <th scope="col">Действие</th>
        </tr>
        </thead>`;

    tableHtml += "<tbody>";

    todoItemsManager.getAll().forEach((todoItem, index) => {
        tableHtml += "<tr>";
        tableHtml += `<th scope="row">${index + 1}</th>`;
        tableHtml += `<td>${formatDate(todoItem.getDate())}</td>`;
        tableHtml += `<td>${todoItem.getDescription()}</td>`;
        tableHtml += `<td>
                        <button type="submit" class="btn btn-danger" onclick="buttonDeleteTodoItemById_Click(${todoItem.getId()})">Удалить</button>
                     </td>`;
        tableHtml += "</tr>";

    });

    tableHtml += "</tbody>";
    tableHtml += "</table>";

    let tableTasksDiv = document.getElementById("table-tasks-div");
    tableTasksDiv.innerHTML = tableHtml;
}

function buttonDeleteTodoItemById_Click(id) {
    todoItemsManager.deleteById(id);

    showTodoItems();
}

function buttonAddTodoItem_Click() {
    let inputDateField = document.getElementById("input-date-field");
    let inputTaskField = document.getElementById("input-task-field");

    if (inputTaskField.value === "") {
        alert("Ошибка добавление. Поле задача не может быть пустым!");
        return;
    }

    todoItemsManager.addNew(new TodoItem(
        new Date(inputDateField.value),
        inputTaskField.value
    ));

    inputDateField.valueAsDate = new Date();
    inputTaskField.value = "";

    showTodoItems();
}


