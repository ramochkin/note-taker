const fs = require('fs')
const util = require('util')
const uuid = require('uuid/v1')

const readasync = util.promisify(fs.readFile)
const writeasync = util.promisify(fs.writeFile)

class Methods {
    read() {
        return readasync('db/db.json', 'utf-8')
    };

    readNotes() {
        return this.read().then((notes) => {
            let allNotes;
            try {
                allNotes = [].concat(JSON.parse(notes))
            } catch (err) {
                allNotes = []
            }

            return allNotes
        })
    };

    write(notes) {
        return writeasync('db/db.json', JSON.stringify(notes))
    };

    writeNotes(note) {
        const { title, text } = note;

        const newNote = {
            title, text, id: uuid()
        }

        return this.readNotes().then((notes) => [...notes, newNote]).then((updatedNotes) => this.write(updatedNotes))
    };

    deleteNote(id){
        return this.readNotes().then((notes) => notes.filter((note)=> note.id !== id)).then((updatedNotes) => this.write(updatedNotes))
    }

    
}

module.exports = new Methods()


