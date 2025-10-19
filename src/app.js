//selecting all the elements/nodes to be manipulated later as needed.
const form = document.querySelector("#registrationForm")
const studentBody = document.querySelector("#studentBody")

//loading the existing records from the local storage
let students = JSON.parse(localStorage.getItem("students")) || [] // here we use the JSON.parse to convert the data into an object
//because it returns a string.

//to display the existing students. the list of students who have already registered.
renderStudents();

//form data handling
form.addEventListener("submit" ,(event)=>{
    event.preventDefault();//it prevents to submit the default values of the form.


    //selecting the the form elements and getting accessing the values entered 
    //to store the input value in a variable for furthur use.
    const name = document.querySelector("#name").value.trim()
    const studentID = document.querySelector("#studentID").value.trim()
    const email = document.querySelector("#Email").value.trim()
    const contact = document.querySelector("#number").value.trim()

    //checking for the validations of the input values of the form element.
    if(!/^[A-Za-z\s]+$/.test(name)) return alert(`name can only contain letters`)
    if(!/^\d+$/.test(studentID)) return alert(`Student id must be numeric`)
    if(!email.includes("@")) return alert(`enter a valid email`)
    if(!/^\d{10}$/.test(contact)) return alert(`contact must be of 10 digits`)
 
    const newStudent = { name, studentID, email, contact }; //storing the input details as an object

    students.push(newStudent);
    saveToLocalStorage(); //calling a function to save the entered data to the localstorage.
    renderStudents();
    form.reset()
})

function renderStudents() {
    studentBody.innerHTML = ""
    students.forEach((stu,index) => {
        const row = document.createElement("tr")
        row.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${index + 1}</td>
        <td class="border border-gray-300 px-4 py-2">${stu.name}</td>
        <td class="border border-gray-300 px-4 py-2">${stu.studentID}</td>
        <td class="border border-gray-300 px-4 py-2">${stu.email}</td>
        <td class="border border-gray-300 px-4 py-2">${stu.contact}</td>
        <td class="flex justify-center gap-3 items-center">
        <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 mt-1 rounded hover:scale-105 transition-transform" onclick="editStudent(${index})"><i class="fa-solid fa-pencil"></i></button>
        <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 mt-1 rounded hover:scale-105 transition-transform" onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i></button>
        </td>`
        studentBody.appendChild(row)
    });
}


//adding edit functionality
function editStudent(index){
    const stu = students[index];
    document.querySelector("#name").value = stu.name
    document.querySelector("#studentID").value = stu.studentID
    document.querySelector("#Email").value = stu.email
    document.querySelector("#number").value = stu.contact

    students.splice(index,1); //removing the old recoed temprorily
    saveToLocalStorage()
    renderStudents()
}

function deleteStudent(index) {
    if(confirm('you want to delete this record')){
        students.splice(index,1);
        saveToLocalStorage()
        renderStudents();
    }
}

function saveToLocalStorage() {
    localStorage.setItem("students",JSON.stringify(students))
}

