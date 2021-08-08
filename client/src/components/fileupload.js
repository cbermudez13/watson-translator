import React, { Fragment, useState } from 'react';
 

const axios = require('axios');

export default function  Fileupload(){
   const [file, setFile] = useState('');
   const [filename, setFilename] = useState('Choose File');
   const [uploadedFile, setUploadedFile] = useState({});

    const onChange = f => {
        setFile(f.target.files[0]);
        setFilename(f.target.files[0].name);
    }

    const onSubmit = async f => {
        f.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try{
            const res = await axios.post('/upload', formData, {
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



    return (
        
           <Fragment>
                <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type='file' className="custom-file-input" id='customfile' onChange={onChange}/>
                    <label className='custom-file-label' htmlFor='customFile'>
                        {filename}
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
