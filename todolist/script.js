let todoInput = document.getElementById("title");
let addTodo = document.getElementById("addTodo");

addTodo.addEventListener('click', () => {

    if (todoInput.value.trim() != 0) {
        // get todo
        let localItem = JSON.parse(localStorage.getItem('Item of Todo'));
        if (localItem == null) {
            todoArr = [];
        } else {
            todoArr = localItem;
        }
    }


    // push the value title and desc
    todoArr.push(todoInput.value);
    localStorage.setItem('Item of Todo', JSON.stringify(todoArr))

})

const showList = () => {

    // output
    let outPut = "";
    let listShow = document.getElementById("renderList");
    // get todo
    let localItem = JSON.parse(localStorage.getItem('Item of Todo'))
    if (localItem == null) {
        todoArr = [];
    } else {
        todoArr = localItem;
    }

    todoArr.forEach((title, index) => {
        outPut += `
        <div class="listItem">
                <h3 id="head">${title}</h3>
            <button id="deleteItem" onClick="deleteItem(${index})"><ion-icon name="close-circle-outline"></ion-icon></button>
        </div>
        `
    })
    listShow.innerHTML = outPut;
}

const deleteItem = (index) => {
    let localItem = JSON.parse(localStorage.getItem('Item of Todo'));
    todoArr.splice(index, 1);
    localStorage.setItem('Item of Todo', JSON.stringify(todoArr))
    showList();
    checkMe();
}

let deleteTodo = document.getElementById("deleteTodo")
deleteTodo.addEventListener('click', () => {
    localStorage.clear();
})

showList();
