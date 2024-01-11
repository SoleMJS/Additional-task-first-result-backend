const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
	// const notes = require('./db.json')
	// const notes = Buffer.from(buffer).toString('utf-8')
	const notes = await getNotes()
	const note = {
		title,
		id: Date.now().toFixed(),
	}
	notes.push(note)

	await fs.writeFile('./db.json', JSON.stringify(notes))
	console.log(chalk.green.inverse.bgCyan('Note was added'))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
	await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
	const notes = await getNotes()

	console.log(chalk.bgBlue('Here is the list of notes'))
	notes.forEach(note => {
		console.log(chalk.blue(`${note.title} и мой id: ${note.id}`))
	})
}

async function removeNotes(id) {
	const notes = await getNotes()
	console.log(chalk.red('Deleted notes'))
	const removedNotes = notes.filter(note => note.id !== id)
	await fs.writeFile(notesPath, JSON.stringify(removedNotes))
}

async function editNotes(id, newTitle) {
	const notes = await getNotes()
	const updatedNotes = notes.map(note =>
		note.id === id ? { ...note, title: newTitle } : note
	)
	await saveNotes(updatedNotes)
	console.log(chalk.green.inverse('Note edited'))
}

module.exports = {
	addNote,
	printNotes,
	removeNotes,
	editNotes,
}
