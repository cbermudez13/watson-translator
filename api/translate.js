const express = require('express');
const fileUpload = require('express-fileupload');
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');

const router = express.Router();

 
        
router.get('/translate', (req,res) => {
 
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  res.send('CoDr33')
  const docId = ''
  const File = req.files.file;
  const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    authenticator: new IamAuthenticator({
      apikey: '7DTkGycP1ao_MCgmZLtai1kf9pa9xM87F_4M-fDrbE3o',
    }),
    serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/ad130e18-14bf-4f8c-80b7-0d1774b2f3cc',
    disableSslVerification: true,
  });

  const translateDocumentParams = {
    file: fs.createReadStream(`${__dirname}/client/public/uploads/${File.name}`),
    modelId: 'en-es',
    filename: File.name,
  };
  languageTranslator.translateDocument(translateDocumentParams)
  .then(result => {
    docId = result.documentId;
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });

  const getDocumentStatusParams = {
    documentId: docId,
  };
  
  languageTranslator.getDocumentStatus(getDocumentStatusParams)
    .then(result => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });

    const getTranslatedDocumentParams = {
      documentId: docId,
    };
    
    
    languageTranslator.getTranslatedDocument(getTranslatedDocumentParams)
      .then(response => {
        const outputFile = fs.createWriteStream('./translated-doc.docx');
        response.result.pipe(outputFile);
      })
      .catch(err => {
        console.log('error:', err);
      });
  
  
})

/*const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs')

    const fileId = '';
    //const {fileId, setfileId}  = useState('');
    const languageTranslator = new LanguageTranslatorV3({
        version: '2018-05-01',
        authenticator: new IamAuthenticator({
          apikey: '7DTkGycP1ao_MCgmZLtai1kf9pa9xM87F_4M-fDrbE3o',
        }),
        serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/ad130e18-14bf-4f8c-80b7-0d1774b2f3cc',
        disableSslVerification: true,
      });
      
      const translateDocumentParams = {
        file: fs.createReadStream(`watson-translator/client/public/uploads/${uploadedFile.name}`),
        modelId: 'en-es',
        filename: `${uploadedFile.name}`,
      };
      
      languageTranslator.translateDocument(translateDocumentParams)
            
            .then(result => {
              fileId = result.document_id;
              //console.log(JSON.stringify(result, null, 2));
            })
            .catch(err => {
              console.log('error:', err);
            });
          
            const getDocumentStatusParams = {
              documentId: fileId,
            };
            
            languageTranslator.getDocumentStatus(getDocumentStatusParams)
              .then(result => {
                console.log(JSON.stringify(result, null, 2));
              })
              .catch(err => {
                console.log('error:', err);
              });
          
            const getTranslatedDocumentParams = {
              documentId: fileId,
            };
            
            
            languageTranslator.getTranslatedDocument(getTranslatedDocumentParams)
              .then(response => {
                const outputFile = fs.createWriteStream('./translated-doc.docx');
                response.result.pipe(outputFile);
              })
              .catch(err => {
                console.log('error:', err);
              });

          */

module.exports = router;



   
   


