
//get data
const getSavedNotes = () => {
    const notesJsnon = localStorage.getItem('notes')
    try{
        return notesJsnon ? JSON.parse(notesJsnon) : []
    } 
    catch {
        return []
    }
}

//save data
const saveNote = (notes) => {
    localStorage.setItem('notes',JSON.stringify(notes))
}

//remove note
const removeNote = (id, notes) => {
    const removedNote = notes.filter((note) => {
        return note.id !== id
    })
    saveNote(removedNote)
}

//rendering
const noteDom = (note) => {
    const noteSelectEl = document.createElement('a')
    const noteEl = document.createElement('div')
    const noteTitleEl = document.createElement('h3')
    const noteBodyEl = document.createElement('p')

    noteSelectEl.classList.add('selectNote')
    noteEl.classList.add('note')

    if(note.title.length > 0){
        noteTitleEl.textContent = note.title.length > 20 ? `${note.title.slice(0, 20)}...` : note.title
        
        noteTitleEl.classList.add('noteTitel')
        noteTitleEl.classList.remove('noNoteTitel')
    } else {
        noteTitleEl.textContent = 'Without title'
        noteTitleEl.classList.remove('noteTitel')
        noteTitleEl.classList.add('noNoteTitel')
    }

    if(note.body.length > 0){
        noteBodyEl.textContent = note.body.length > 20 ? `${note.body.slice(0, 30)}...` : note.body
        noteBodyEl.classList.add('description')
        noteBodyEl.classList.remove('noDescription')
    } else {
        noteBodyEl.textContent = 'Without Description'
        noteBodyEl.classList.add('noDescription')
        noteBodyEl.classList.remove('description')
    }
    

    noteSelectEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.appendChild(noteTitleEl)
    noteEl.appendChild(noteBodyEl)
    noteSelectEl.appendChild(noteEl)

    return noteSelectEl
}

const renderNotes = (notes, filters) => {
    const noteListEl = document.querySelector('#noteList')
    const rendering = notes.filter((note) => {
        return note.title.toLowerCase().includes(filters.text.toLowerCase()) || note.body.toLowerCase().includes(filters.text.toLowerCase())
    })

    noteListEl.innerHTML = ''

    if(rendering.length > 0) {
        rendering.forEach((note) => {
            const eachNoteEl = noteDom(note)
            noteListEl.appendChild(eachNoteEl)
        })
    } else {
        const emptyMsgEl = document.createElement('div')
        const msgEl = document.createElement('h1')
        msgEl.textContent = 'Nothing to show!'
        emptyMsgEl.appendChild(msgEl)

        emptyMsgEl.classList.add('emptyMsg')
        msgEl.classList.add('msg')

        noteListEl.appendChild(emptyMsgEl)
    }
}

window.addEventListener('storage', (e) =>{
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})