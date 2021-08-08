import React, { Fragment, useState } from 'react';

export default function  Fileupload(){
   const [file, setFile] = useState({});
   const [filename, setFilename] = useState("Choose file");

    const onChange = (f) => {
        setFile(f.target.files[0]);
        setFilename(f.target.files[0].name);
    }

    const onSubmit = (f) => {
        f.preventDefaut();
        const formData = new FormData();
        formData.append(file);
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
