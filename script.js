const todoForm = document.getElementById("todo-form")
const titleInput = document.getElementById("title")
const descriptionInput = document.getElementById("description")
const taskList = document.getElementById("task-list")

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveTask = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const renderTask = () => {
    taskList.innerHTML = ""
    tasks.forEach((task, index) => {
        const li = document.createElement("li")
        li.innerHTML = `<div class="listInner container"> <h3 class="todoArea">${task.title}: </h3> <p class = "taskdescription"><i>${task.description}</i></p> <button class="remove-btn btn btn-danger" data-index="${index}">Remove</button></div>`
        taskList.appendChild(li)
    })

    const removeButtons = document.querySelectorAll(".remove-btn")
    removeButtons.forEach(button => {
        button.addEventListener("click", event => {
            const index = event.target.getAttribute("data-index")
            tasks.splice(index, 1)
            saveTask()
            renderTask()
        })
    })

}

todoForm.addEventListener("submit", event => {
    event.preventDefault()
    const title = titleInput.value
    const description = descriptionInput.value
    tasks.push({ title, description })
    saveTask()
    renderTask()
    titleInput.value = ""
    descriptionInput.value = ""
})

renderTask()
