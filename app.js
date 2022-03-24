let section = document.querySelector("section")
let add = document.querySelector("form button");

add.addEventListener("click", e => {
    // 防止資料被送出
    e.preventDefault();
    
    // 得到 input 的值
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;
    // console.log(todoText, todoMonth, todoDate)

    if (todoText === "") {
        alert("Please enter Item.");
        return;
    }

    // create a todo
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth + " / " + todoDate;
    todo.appendChild(text);
    todo.appendChild(time);

    section.appendChild(todo);

    // create complete icon
    let completeBtn = document.createElement("button")
    completeBtn.classList.add("complete")
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>'

    // complete status
    completeBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done")
    })

    // create trash can icon
    let trashBtn = document.createElement("button")
    trashBtn.classList.add("trash")
    trashBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

    // delete item + animation
    trashBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        // 為了不讓 remove 先執行，要先等 animation 結束再執行
        todoItem.addEventListener("animationend", () => {

            // remove from localStorage
            let text = todoItem.children[0].innerText;
            let myListArr = JSON.parse(localStorage.getItem("list"));
            myListArr.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArr.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArr))
                }
            })

            // remove from HTML
            todoItem.remove();
        })

        todoItem.style.animation = "scaleDown 0.2s forwards";
    })

    todo.appendChild(completeBtn);
    todo.appendChild(trashBtn);

    // show up animation
    todo.style.animation = "scaleUP 0.2s forwards";

    // create an object
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate
    }

    // store data into an array of object
    let myList = localStorage.getItem("list");
    if (myList == null) {
        // 設空的 list 跟 array，把 myTodo 資料放進 array
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        // 如果 localStorage 本來就有 list 的話
        // JSON.parse 回 Array
        let myListArr = JSON.parse(myList);
        // push 到 myTodo
        myListArr.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArr))
    }

    // clear the text input
    form.children[0].value = ""
    section.appendChild(todo)
})

// load data from localStorage
let myList = localStorage.getItem("list")
if (myList !== null) {
    let myListArr = JSON.parse(myList);
    // 對 myListArr 的每個 object
    myListArr.forEach(item => {

        // create Todo
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;
        let time = document.createElement("p")
        time.classList.add("todo-time");
        time.innerText = item.todoMonth + " / " + item.todoDate;
        todo.appendChild(text);
        todo.appendChild(time);

        // create complete icon
        let completeBtn = document.createElement("button")
        completeBtn.classList.add("complete")
        completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>'

        // complete status
        completeBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done")
        })

        // create trash can icon
        let trashBtn = document.createElement("button")
        trashBtn.classList.add("trash")
        trashBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

        // delete item + animation
        trashBtn.addEventListener("click", e => {
            let todoItem = e.target.parentElement;

            // 為了不讓 remove 先執行，要先等 animation 結束再執行
            todoItem.addEventListener("animationend", () => {
            // remove from localStorage
            let text = todoItem.children[0].innerText;
            let myListArr = JSON.parse(localStorage.getItem("list"));
            myListArr.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArr.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArr))
                }
            })
            // remove from HTML
            todoItem.remove();
            })

            todoItem.style.animation = "scaleDown 0.2s forwards";
        })

        todo.appendChild(completeBtn);
        todo.appendChild(trashBtn);

        section.appendChild(todo);
    })
}