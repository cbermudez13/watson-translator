import './App.css';
import React from 'react';
import Fileupload from './components/fileupload';

function App() {
  return (
    

    <div className='container mt-4'>
      <h4 className='display-4 text-center mb-4'>
        <i className='fab fa-react'>Uploader</i>
        </h4>
      <Fileupload/>
     
    </div>
    

  );
}

export default App;
