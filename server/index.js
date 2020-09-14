const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pdf = require('html-pdf');
const cors = require('cors');
const {Storage} = require('@google-cloud/storage');
const pdfTemplate = require('./documents');
const action = require('./gcp-profilemanagement-1/gcp-profilemanagement-1')
const app = express();
const port = process.env.PORT || 5000;

const storage = new Storage({
    projectId: 'marine-pillar-287815',
    keyFilename: "./marine-pillar-287815-9a3170580028.json"
  });
  

const bucket = storage.bucket('gcp-profilemanagement-1');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));   
app.use(bodyParser.json());


app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            console.log(err);
            res.send(Promise.reject());
        }
    res.send(Promise.resolve()); 
    });
});

app.get('/fetch-pdf', async (req, res) => {
          console.log('hello');
          await res.sendFile(`${__dirname}/result.pdf`);
      })


app.post('/upload', async (req, res, next) => {
    console.log(req.files.filename);
    const data = fs.readFileSync(`${__dirname}/result.pdf`, 'utf8')
    try {

          const fileUrl = await action.uploadFile(data)
          res.status(200).json({
              message: "File Uploaded Succesfully"
          })
        } catch (error) {
          res.status(400).json({
            message: "File Upload Failed",
          })
          next(error)
        }
      })
      

  

app.listen(port, () => console.log(`Listening on port ${port}`));
module.export = app