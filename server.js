const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

//Upload endpoint
app.post('/upload',(req,res) => {
    if(req.files === null){
        return res.status(400).json({msg: 'No file was uploaded'});
    }
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err){
            console.error();
            return res.status(500).send(err);
        }
        res.json({fileName: file.name, filePath: `/uploads/${file.name}`});
    });
})

const port = process.env.PORT || 5000 
 app.listen(port, function() {
     console.log("To view your app, open this link in your browser: http://localhost:" + port);
 });