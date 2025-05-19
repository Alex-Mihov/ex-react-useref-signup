import { use, useState } from 'react'

import './App.css'


function App() {

  const initialFormData = {
    nomeCompleto: "",
    username: "",
    password: "",
    specializzazione: "",
    anniEsperienza: "",
    descrizione: ""
  };

  const [formData, SetFormaData] = useState(initialFormData)



  return (
    <>
      <form >
        <div>
          <input
            type="text"
            value={nomeCompleto}
            onChange={ }
          />
        </div>
      </form>
    </>
  )
}

export default App
