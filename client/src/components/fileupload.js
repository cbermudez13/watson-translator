import React, { Fragment, useState } from 'react';


const axios = require('axios');

export default function  Fileupload(){
   const [File, setFile] = useState('');
   const [FileName, setFilename] = useState('Choose File');
   const [uploadedFile, setUploadedFile] = useState({});

  

    const onChange = f => {
        setFile(f.target.files[0]);
        setFilename(f.target.files[0].name);
    }

    const onSubmit = async f => {
        f.preventDefault();
        const formData = new FormData();
        formData.append('file', File);

        try{
            const res = await axios.post('/translate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
        } catch(e){
            if(e.response.status === 500){
                console.log('Server Error');
            } else {
                console.log(e.response.data.msg);
            }
        }
    }
    
   /* const languageTranslator = new LanguageTranslatorV3({
        version: '2018-05-01',
        authenticator: new IamAuthenticator({
          apikey: '7DTkGycP1ao_MCgmZLtai1kf9pa9xM87F_4M-fDrbE3o',
        }),
        serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/ad130e18-14bf-4f8c-80b7-0d1774b2f3cc',
        disableSslVerification: true,
      });
    
      const translateDocumentParams = {
        file: fs.createReadStream(`${__dirname}/client/public/uploads/${FileName}`),
        modelId: 'en-es',
        filename: FileName,
      };
      languageTranslator.translateDocument(translateDocumentParams)
      .then(result => {
        console.log(JSON.stringify(result, null, 2));
      })
      .catch(err => {
        console.log('error:', err);
      });
    
      const getDocumentStatusParams = {
        documentId: 'aeee9ca1-fd2e-46a9-8cdc-7acf83462d64',
      };
      
      languageTranslator.getDocumentStatus(getDocumentStatusParams)
        .then(result => {
          console.log(JSON.stringify(result, null, 2));
        })
        .catch(err => {
          console.log('error:', err);
        });
        */

    return (
        
           <Fragment>
                <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type='file' className="custom-file-input" id='customfile' onChange={onChange}/>
                    <label className='custom-file-label' htmlFor='customFile'>
                        {FileName}
                    </label>
                </div>
                <input
                    type='submit'
                    value='Upload'
                    className='btn btn-primary btn-block mt-4'/>
                </form>
                
                
           </Fragment>
    )
}
