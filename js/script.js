let todos = localStorage.getItem("todos") //get todos from localstorage
let todosList = document.querySelector("#todos-list") // Get ul tag todo list


try {
    todos = JSON.parse(todos) //translate todos in local storage to correct form like obj or array
    todos = todos.length ? todos : null //if todos in local storage is [] set it null...
} catch (error) {
    todos = null //if todos in localstorage is simple string or it does not exist and we can not to JSON.parse(todos), make and set todos null
}
if (todos === null) {
    todos = [
        { content: "Wake up", status: true, isDefault: true },
        { content: "Breakfast", status: true },
        { content: "Watch Netfilx", status: true },
        { content: "Shopping", status: true },
        { content: "Sleep", status: true }
    ]
    localStorage.setItem("todos", JSON.stringify(todos))
}

//function to create and update todo list:
function createTodos(todos) {
    todosList.innerHTML = "" // Set todo list (<ul>) empty
    todos.forEach((todo, index) => { // Get element in our list:
        //Create li element and set that class:
        let li = document.createElement("li")
        li.className = "list-group-item"

        //Create content(<span>) in li and set it class and text content:
        let content = document.createElement("span")
        content.className = "float-left text-dark"
        content.textContent = todo.content

        // Add line center of content if todo status is false:
        content.style.textDecoration = todo.status ? "initial" : "line-through"

        //Create delete icon(<img>) in li and set it class, src and alt:
        let deleteBtn = document.createElement("img")
        deleteBtn.className = "float-right"
        deleteBtn.src = "./media/delete.png"
        deleteBtn.alt = "delete icon"

        //Insert content(<span>) and deleteBtn(<img>) inside li tag:
        li.append(content)
        li.append(deleteBtn)

        //Insert li tag inside ul tag:
        todosList.append(li)

        // Delete row when click in Deleted Btn:
        deleteBtn.addEventListener("click", e => {
            if (todos.length == 1) {
                todos = [{ isDefault: "clear" }]
                localStorage.setItem("todos", JSON.stringify(todos)) //update localstorage
                createTodos(todos) // Create in html css
                listTitle.innerHTML = `
                        <div class="list-group mt-3" id="listTitle">
                            <li class="list-group-item bg-dark text-light">
                                <span class="text-center">-- You don not have any ToDo right now --</span>
                            </li>
                        </div>
                        `
                todosList.innerHTML = ""

            } else if (todos.length > 1) {
                todos.splice(index, 1)
                localStorage.setItem("todos", JSON.stringify(todos))
                createTodos(todos)
            }
        })

        // Change todo status and reload localstorage to add line center of content:
        content.addEventListener("click", e => {
            todos[index].status = !todos[index].status
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })
    });
}

createTodos(todos)

// Add & Search:
let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")

Array.from(actions.children).forEach(action => { // Get data-action from add and search Btns
    // Add btn:
    if (action.dataset.action == "add") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
                <form id="add">
                    <div class="input-group mb-3">
                        <input type="text" name="add" class="form-control" placeholder="Add todos..." style="background-color: rgba(255, 255, 255, 0.781);">
                        <div class="input-group-append">
                            <button id="addBtn" class="btn btn-success" type="button">Add</button>
                        </div>
                    </div>
                </form>
                `

            let add = document.querySelector("#add") // Get top form tagdd

            // Add some style when focus on add input:
            add.add.addEventListener("focus", e => {
                e.target.style.boxShadow = "0 0 20px 2px rgba(255, 255, 255, 0.349)";
            })

            // -----------------
            function addTodoToList() {
                let addValue = add.add.value // Get input value that user write it

                let listTitle = document.getElementById("listTitle") // Get List title
                if (addValue) {
                    if (todos[0].isDefault === true || todos[0].isDefault === "clear") {
                        todos = []
                    }
                    listTitle.innerHTML = `
                        <div class="list-group mt-3" id="listTitle">
                            <li class="list-group-item bg-dark text-light">
                                <span class="float-left">Your ToDo list</span>
                                <span class="float-right">👇</span>
                            </li>
                        </div>
                        `
                    todos.push({ content: addValue, status: true, isDefault: false }) // Add todo that user write it
                    add.add.value = ""
                    localStorage.setItem("todos", JSON.stringify(todos)) //update localstorage
                    createTodos(todos) // Create in html css
                }
            }
            // -------------------------
            add.addEventListener("submit", e => { // Add listener when user write sth and Enter:
                e.preventDefault()
                addTodoToList()

            })
            document.getElementById("addBtn").addEventListener("click", e => {
                addTodoToList()
            })

        })
    }
    // Search btn:
    else if (action.dataset.action == "search") {
        action.addEventListener("click", e => {
            e.preventDefault()
            formWrapper.innerHTML = `
            <form id="search">
                    <input type="text" name="search" class="form-control" placeholder="Search todos..." style="background-color: rgba(255, 255, 255, 0.781);">
            </form>
            `

            let search = document.querySelector("#search") // Get top form tag 

            // Add some style when focus on add input:
            search.search.addEventListener("focus", e => {
                e.target.style.boxShadow = "0 0 20px 2px rgba(255, 255, 255, 0.349)";
            })

            // -----------------
            search.addEventListener("submit", e => { // When user click enter on keyboard
                e.preventDefault()
            })
            search.addEventListener("keyup", e => { // Add listener when user write sth in search:
                e.preventDefault()
                let searchValue = search.search.value // Get input value that user search it in todos list
                if (searchValue) {
                    let filtered_todos = todos.filter(todo => todo.content.toLowerCase().includes(searchValue.toLowerCase()))
                    createTodos(filtered_todos)
                } else {
                    createTodos(todos)
                }
            })
        })
    }
    // Clear all btn:
    else if (action.dataset.action == "clearAllBtn") {
        action.addEventListener("click", e => {
            todos = [{ isDefault: "clear" }]
            localStorage.setItem("todos", JSON.stringify(todos)) //update localstorage
            createTodos(todos) // Create in html css
            listTitle.innerHTML = `
                    <div class="list-group mt-3" id="listTitle">
                        <li class="list-group-item bg-dark text-light">
                            <span class="text-center">-- You don not have any ToDo right now --</span>
                        </li>
                    </div>
                    `
            todosList.innerHTML = ""
        })
    }
})











// let todos = localStorage.getItem("todos") //get todos from localstorage

// try {
//     todos = JSON.parse(todos) //translate todos in local storage to correct form like obj or array
//     todos = todos.length ? todos : null //if todos in local storage is [] set it null...
// } catch (error) {
//     todos = null //if todos in localstorage is simple string or it does not exist and we can not to JSON.parse(todos), make and set todos null
// }
// if (todos === null) {
// todos = [
//     { content: "Add something to your todo list, Like: 👇", status: true, isDefault: true }
// ]
//     localStorage.setItem("todos", JSON.stringify(todos))
// }

// //function to create and update todo list:
// function createTodos(todos) {
//     let todosList = document.querySelector("#todos-list") // Get ul tag todo list
//     todosList.innerHTML = "" // Make todo list (<ul>) empty
//     todos.forEach((todo, index) => { // Get element in our list:
//         //Create li element and set that class:
//         let li = document.createElement("li")
//         li.className = "list-group-item"

//         //Create content(<span>) in li and set it class and text content:
//         let content = document.createElement("span")
//         content.className = "float-left"
//         content.textContent = todo.content
//         content.style.textDecoration = todo.status ? "initial" : "line-through" // Add line center of content if todo status is false

//         //Create delete icon(<img>) in li and set it class, src and alt:
//         let deleteBtn = document.createElement("img")
//         deleteBtn.className = "float-right"
//         deleteBtn.src = "./media/delete.png"
//         deleteBtn.alt = "delete icon"

//         //Insert content(<span>) and deleteBtn(<img>) inside li tag:
//         li.append(content)
//         li.append(deleteBtn)

//         //Insert li tag inside ul tag:
//         todosList.append(li)

//         // Delete row when click in Deleted Btn:
//         deleteBtn.addEventListener("click", e => {
//             todos.splice(index, 1)
//             localStorage.setItem("todos", JSON.stringify(todos))
//             createTodos(todos)
//         })

//         // Change todo status and reload localstorage to add line center of content:
//         content.addEventListener("click", e => {
//             todos[index].status = !todos[index].status
//             localStorage.setItem("todos", JSON.stringify(todos))
//             createTodos(todos)
//         })
//     });
// }

// createTodos(todos)

// // Add & Search:
// let actions = document.querySelector("#actions")
// let formWrapper = document.querySelector("#form-wrapper")

// Array.from(actions.children).forEach(action => { // Get data-action from add and search Btns
//     // Add btn:
//     if (action.dataset.action == "add") {
//         action.addEventListener("click", e => {
//             formWrapper.innerHTML = `
//                 <form id="add">
//                     <input type="text" name="add" class="form-control" placeholder="Add todos..." style="background-color: rgba(255, 255, 255, 0.781);">
//                 </form>
//                 `

//             let add = document.querySelector("#add") // Get top form tagdd

//             // Add some style when focus on add input:
//             add.add.addEventListener("focus", e => {
//                 e.target.style.boxShadow = "0 0 20px 2px rgba(255, 255, 255, 0.349)";
//             })

//             // -----------------

//             add.addEventListener("submit", e => { // Add listener when user write sth and Enter:
//                 e.preventDefault()
//                 let addValue = add.add.value // Get input value that user write it

//                 if (addValue) {
//                     if (todos[0].isDefault === true) {
//                         todos = []
//                     }
//                     todos.push({ content: addValue, status: true }) // Add todo that user write it
//                     localStorage.setItem("todos", JSON.stringify(todos)) //update localstorage
//                     createTodos(todos) // Create in html css
//                 }
//             })
//         })
//     }
//     // Search btn:
//     else if (action.dataset.action = "search") {
//         action.addEventListener("click", e => {
//             formWrapper.innerHTML = `
//             <form id="search">
//                     <input type="text" name="search" class="form-control" placeholder="Search todos..." style="background-color: rgba(255, 255, 255, 0.781);">
//             </form>
//             `

//             let search = document.querySelector("#search") // Get top form tag 

//             // Add some style when focus on add input:
//             search.search.addEventListener("focus", e => {
//                 e.target.style.boxShadow = "0 0 20px 2px rgba(255, 255, 255, 0.349)";
//             })

//             // -----------------

//             search.addEventListener("keyup", e => { // Add listener when user write sth in search:
//                 e.preventDefault()
//                 let searchValue = search.search.value // Get input value that user search it in todos list
//                 if (searchValue) {
//                     let filtered_todos = todos.filter(todo => todo.content.toLowerCase().includes(searchValue.toLowerCase()))
//                     createTodos(filtered_todos)
//                 } else {
//                     createTodos(todos)
//                 }
//             })
//         })
//     }
// })