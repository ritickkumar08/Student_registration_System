//selecting all the elements/nodes to be manipulated later as needed.
const form = document.querySelector("#registrationForm")
const studentBody = document.querySelector("#studentBody")

//loading the existing records from the local storage
let students = JSON.parse(localStorage.getItem("student") || []) // here we use the JSON.parse to convert the data into an object
//because it returns a string.

//to display the existing students. the list of students who have already registered.
renderStudents();

//form data handling
form.addEventListener()

