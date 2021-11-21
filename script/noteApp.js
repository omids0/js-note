let notes = getSavedNotes()
let filters = {
    text: ''
}
renderNotes(notes, filters)

//selectors
const searchEl = document.querySelector('#search')
const addNoteEl = document.querySelector('#addNote')
const noteListEl = document.querySelector('#noteList')

//events
addNoteEl.addEventListener('click', (e) => {
    const id = uuidv4()
    notes.push({
        id: id,
        title: '',
        body: ''
    })
    saveNote(notes)
    location.assign(`/edit.html#${id}`)
})

searchEl.addEventListener('input', (e) => {
    filters.text = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const id = uuidv4()
        notes.push({
            id: id,
            title: '',
            body: ''
        })
        saveNote(notes)
        location.assign(`/edit.html#${id}`)
    }
})


//render
renderNotes(notes, filters)