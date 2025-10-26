const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = document.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");
const addBtn = popupBox.querySelector("button");






const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



// Getting local storage notes if exist and parsing them
//to JS object else passing the empty array to notes.
const notes = JSON.parse(localStorage.getItem("notes") || "[]");


let isUpdate = false, updateId;












// Display the form on clicking the Add Note Box
addBox.addEventListener("click", () => {

    popupBox.classList.add("show");
    titleTag.focus();

});








// Closing the opened form
closeIcon.addEventListener("click", () => {

    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note"
    popupTitle.innerText = "Add a New Note"
    isUpdate = false;
    popupBox.classList.remove("show");

});








function showMenu(elem){
    elem.parentElement.classList.add("show");

    // Removing show class from menu on document click
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem)
        {
            elem.parentElement.classList.remove("show");
        }
    });
}







// Function that will display all the notes on the screen by refreshing the 
//page and fetching data from local storage
function showNotes(){

    // Removing the duplication of elements if exist
    document.querySelectorAll(".note").forEach(note => note.remove());

    notes.forEach((note, index) => {

        let liTag = `<li class="note">
                        <p>${note.title}</p>

                        <span>
                            ${note.description}
                        </span>

                        <div class="bottom-content">
                            <span>${note.date}</span>

                            <div class="settings">
                                <i onclick = "showMenu(this)" class='bx bx-dots-horizontal-rounded' ></i>
                                <ul class="menu">
                                    <li onclick = "updateNote(${index}, '${note.title}', '${note.description}')"><i class='bx bx-pencil'></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class='bx bx-trash' ></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;

        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();











// Closing the opened form
addBtn.addEventListener("click", e => {

    e.preventDefault();                 //Stopping the form from submitting
    let noteTitle = titleTag.value;
    let notedesc = descTag.value;

    // If atleast one value is present.
    if(noteTitle || notedesc)
    {
        let dateObj = new Date();
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: notedesc,
            date: `${month} ${day}, ${year}`
        }

        if(!isUpdate)
        {
            notes.push(noteInfo);       //Adding new note to notes.
        }
        else
        {   
            isUpdate = false;
            notes[updateId] = noteInfo;             //Updating the specified note.
        }
        

        //Saving notes to locaql storage
        localStorage.setItem("notes", JSON.stringify(notes))
        closeIcon.click();
        showNotes();

    }

});









// Function to delete a note
function deleteNote(noteId){

    let confirmDelete = confirm("Are you sure you want to delete this note?");
    if(!confirmDelete) return;

    notes.splice(noteId, 1)                 //removing selected notes from array tasks

    //Saving updated notes to locaql storage
    localStorage.setItem("notes", JSON.stringify(notes))
    showNotes();
}








function updateNote(noteId, title, description)
{
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    addBtn.innerText = "Update Note"
    popupTitle.innerText = "Update a Note"
    titleTag.value = title;
    descTag.value = description;
}