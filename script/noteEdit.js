// elements
const titleEl = document.querySelector('#title')
const bodyEl = document.querySelector('#body')
const saveEl = document.querySelector('#save')
const removeEl = document.querySelector('#remove')

saveEl.textContent = '<'

//get notes
const notes = getSavedNotes()
const noteId = location.hash.substring(1)

//find note
const note = notes.find((note) => note.id === noteId)

//check note
if(!note){
    location.assign('/index.html')
}

titleEl.value = note.title
bodyEl.value = note.body

titleEl.addEventListener('input',(e)=>{
    note.title = e.target.value
    saveNote(notes)
})

bodyEl.addEventListener('input',(e)=>{
    note.body = e.target.value
    saveNote(notes)
})

saveEl.addEventListener('click', ()=>{
    location.assign('/index.html')
    saveNote(notes)
})

removeEl.addEventListener('click', ()=>{
    location.assign('/index.html')
    removeNote(noteId, notes)
})

window.addEventListener('keydown',(e) =>{
    if(e.key === 'Enter') {
        location.assign('/index.html')
    }
})