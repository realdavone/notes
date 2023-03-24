import Note from "../models/note.js"

export async function getNotesFromDB(options) {
  return await Note.find(options).sort({ timestamp: 'descending' })
}

export function getNoteFromDB(userId) {
  return async function (options){
    return new Promise((resolve, reject) => {
      Note.findOne(options).then((data, error) => {
        if(error)
          throw('Niečo sa pokazilo')
  
        if(data._doc.author.toString() !== userId)
          throw('Nemáte prístup k tejto poznámke')
  
        resolve(data)
      }).catch(error => reject(error))    
    })
  }
}

export async function createNoteInDB(options){
  return await Note.create(options)
}

export function editNoteInDB(id, userId) {
  return async function(options) {
    return new Promise((resolve, reject) => {
      Note.findById(id).then((data, error) => {
        if(error)
          throw('Niečo sa pokazilo')

        if(data._doc.author.toString() !== userId)
          throw('Nemáte prístup k tejto poznámke')
        
        data.title = options?.title
        data.content = options?.content
        data.isImportant = options?.isImportant
        data.category = options?.category
    
        data.save()
    
        resolve(data)
      }).catch(error => reject(error))
    })
  }
}

export async function removeNoteFromDB(id, userId) {
  return new Promise((resolve, reject) => {
    Note.findById(id).then((data, error) => {
      if(error)
        throw('Niečo sa pokazilo')
      if(data._doc.author.toString() !== userId)
        throw('Môžete mazať len svoje poznámky')
  
      data.remove()
      
      resolve(data)
    }).catch(error => reject(error))
  })
}