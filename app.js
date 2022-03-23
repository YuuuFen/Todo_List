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

    // create a todo
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth + "/" + todoDate;
    todo.appendChild(text);
    todo.appendChild(time);

    section.appendChild(todo);

    // create check and trash can icon
    let completeBtn = document.createElement("button")
    completeBtn.classList.add("complete")
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>'

    let trashBtn = document.createElement("button")
    trashBtn.classList.add("trash")
    trashBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'

    todo.appendChild(completeBtn)
    todo.appendChild(trashBtn)

    section.appendChild(todo)
})