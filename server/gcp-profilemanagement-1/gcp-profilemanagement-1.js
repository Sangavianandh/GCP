const util = require('util')
const gc = require('../config/')
const { BucketActionToHTTPMethod } = require('@google-cloud/storage/build/src/bucket')
const bucket = gc.bucket('gcp-profilemanagement-1')
const { format } = util
const storage = require('../config/index')
const uploadFile = (file) => new Promise((resolve, reject) => {
  const myFile = file.files
    const fileName= myFile.files.name;
    const insertId=null;
  const { originalFilename, buffer } = file
  const blob = bucket.file(originalFilename.replace(/ /g, "_"))

  const blobStream = blob.createWriteStream({
  resumable: false
   })
    blobStream.on('finish', () => {
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`)
       resolve(publicUrl)
     })
     .on('error', (error) => {
       reject(`Unable to upload image, something went wrong`)
     })
     .end(buffer)
  })
 
   
  module.exports = { uploadFile }