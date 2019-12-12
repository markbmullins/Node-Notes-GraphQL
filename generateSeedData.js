const Note = require("./server/schema/notes.model");
const seedContent = require("./seedContent");

const NUM_NOTES = 20;

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(seedContent.length));
}

(async () => {
    for (let i = 0; i < NUM_NOTES; i++) {
        let note = new Object();
        note.title = "TEST" + i;
        note.content = seedContent[getRandomInt()];
        note.order = i;
        const noteObj = new Note(note);
        await noteObj.save();
    }
})();
