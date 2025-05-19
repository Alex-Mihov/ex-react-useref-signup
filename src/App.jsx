import { useState } from 'react'
import './App.css'

function App() {
  // Stato iniziale del form con campi vuoti
  const initialFormData = {
    nomeCompleto: "",
    username: "",
    password: "",
    specializzazione: "",
    anniEsperienza: "",
    descrizione: ""
  };

  // Inizializza lo state del form usando useState
  const [formData, setFormData] = useState(initialFormData)

  // Gestore del cambiamento dei campi input
  // Aggiorna lo state quando l'utente digita
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Gestore dell'invio del form
  const handleSubmit = (e) => {
    // Previene il comportamento predefinito del form
    e.preventDefault();

    // Destrutturazione dei campi dal form
    const { nomeCompleto, username, password, specializzazione, anniEsperienza, descrizione } = formData

    // Validazione: verifica che tutti i campi siano compilati
    if (
      !nomeCompleto.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specializzazione ||
      !anniEsperienza ||
      !descrizione.trim()
    ) {
      alert("Per favore, compila tutti i campi")
      return;
    }

    // Validazione: verifica che gli anni di esperienza siano positivi
    if (Number(anniEsperienza) <= 0) {
      alert("Gli anni devono essere un numero positivo")
      return;
    }

    // Stampa i dati del form in console
    console.log("Dati inviati:", formData);
  }

  return (
    <>
      {/* Form container con gestore di submit */}
      <form className="form-container" onSubmit={handleSubmit}>
        {/* Campo Nome Completo */}
        <div className="form-group">
          <label className="form-label">Nome Completo:</label>
          <input
            className="form-input"
            type="text"
            name="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={handleChange}
          />
        </div>

        {/* Campo Username */}
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            className="form-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {/* Campo Password */}
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Menu a tendina per la Specializzazione */}
        <div className="form-group">
          <label className="form-label">Specializzazione:</label>
          <select
            className="form-select"
            name="specializzazione"
            value={formData.specializzazione}
            onChange={handleChange}
          >
            <option value="">-- Seleziona --</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </div>

        {/* Campo numerico per gli anni di esperienza */}
        <div className="form-group">
          <label className="form-label">Anni di esperienza:</label>
          <input
            className="form-input"
            type="number"
            name="anniEsperienza"
            value={formData.anniEsperienza}
            onChange={handleChange}
          />
        </div>

        {/* Area di testo per la descrizione */}
        <div className="form-group">
          <label className="form-label">Descrizione:</label>
          <textarea
            className="form-input"
            name="descrizione"
            value={formData.descrizione}
            onChange={handleChange}
            rows="4"
          />
        </div>

        {/* Pulsante di invio */}
        <button className="form-button">Registrati</button>
      </form>
    </>
  )
}

export default App
