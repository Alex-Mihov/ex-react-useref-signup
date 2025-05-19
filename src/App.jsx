import { useState } from 'react'
import './App.css'

// Definizione del componente principale App
function App() {
  // Oggetto con i valori iniziali del form
  const initialFormData = {
    nomeCompleto: "",
    username: "",
    password: "",
    specializzazione: "",
    anniEsperienza: "",
    descrizione: ""
  }

  // Stato per gestire i dati del form e gli errori
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  // Stringhe contenenti i caratteri validi per la password
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"

  // Funzione di validazione dei campi
  const validate = (name, value) => {
    let error = ""

    // Validazione username: minimo 6 caratteri alfanumerici
    if (name === "username") {
      const isValid = /^[a-zA-Z0-9]{6,}$/.test(value)
      if (!isValid) error = "Almeno 6 caratteri alfanumerici, senza spazi o simboli"
    }

    // Validazione password: minimo 8 caratteri con lettere, numeri e simboli
    if (name === "password") {
      const hasLetter = [...value].some(c => letters.includes(c))
      const hasNumber = [...value].some(c => numbers.includes(c))
      const hasSymbol = [...value].some(c => symbols.includes(c))
      if (!(value.length >= 8 && hasLetter && hasNumber && hasSymbol)) {
        error = "Minimo 8 caratteri, 1 lettera, 1 numero, 1 simbolo"
      }
    }

    // Validazione descrizione: tra 100 e 1000 caratteri
    if (name === "descrizione") {
      const len = value.trim().length
      if (len < 100 || len > 1000) error = "Tra 100 e 1000 caratteri"
    }

    // Aggiorna lo stato degli errori
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  // Gestore del cambiamento dei campi input
  const handleChange = (e) => {
    const { name, value } = e.target
    // Aggiorna lo stato del form
    setFormData(prev => ({ ...prev, [name]: value }))
    // Valida i campi specifici
    if (["username", "password", "descrizione"].includes(name)) {
      validate(name, value)
    }
  }

  // Gestore dell'invio del form
  const handleSubmit = (e) => {
    e.preventDefault()
    // Estrae i valori dal form
    const { nomeCompleto, username, password, specializzazione, anniEsperienza, descrizione } = formData

    // Verifica che tutti i campi siano compilati
    if (
      !nomeCompleto.trim() || !username || !password ||
      !specializzazione || !anniEsperienza || !descrizione.trim()
    ) {
      alert("Compila tutti i campi")
      return
    }

    // Verifica che gli anni di esperienza siano positivi
    if (Number(anniEsperienza) <= 0) {
      alert("Anni esperienza deve essere positivo")
      return
    }

    // Verifica che non ci siano errori di validazione
    if (Object.values(errors).some(e => e)) {
      alert("Correggi gli errori evidenziati")
      return
    }

    // Stampa i dati del form in console
    console.log("Dati inviati:", formData)
  }

  // Funzione per mostrare messaggi di errore o successo
  const showMessage = (name) => {
    if (!formData[name]) return null
    return errors[name]
      ? <p className="error">{errors[name]}</p>
      : <p className="success">✅ Valido</p>
  }

  // Renderizza il form
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {/* Campo Nome Completo */}
      <div className="form-group">
        <label>Nome Completo</label>
        <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} />
      </div>

      {/* Campo Username con validazione */}
      <div className="form-group">
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        {showMessage("username")}
      </div>

      {/* Campo Password con validazione */}
      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {showMessage("password")}
      </div>

      {/* Menu a tendina per la Specializzazione */}
      <div className="form-group">
        <label>Specializzazione</label>
        <select name="specializzazione" value={formData.specializzazione} onChange={handleChange}>
          <option value="">-- Seleziona --</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
      </div>

      {/* Campo numerico per gli anni di esperienza */}
      <div className="form-group">
        <label>Anni di esperienza</label>
        <input type="number" name="anniEsperienza" value={formData.anniEsperienza} onChange={handleChange} />
      </div>

      {/* Area di testo per la descrizione con validazione */}
      <div className="form-group">
        <label>Descrizione</label>
        <textarea name="descrizione" rows="4" value={formData.descrizione} onChange={handleChange} />
        {showMessage("descrizione")}
      </div>

      {/* Pulsante di invio */}
      <button className="form-button">Registrati</button>
    </form>
  )
}

export default App
