// Importa gli hook useState e useRef da React
import { useState, useRef } from 'react'
// Importa il file di stile
import './App.css'

// Definizione del componente principale
function App() {
  // Definizione dello stato iniziale per i campi che richiedono validazione
  const initialFormData = {
    username: "",
    password: "",
    descrizione: ""
  }

  // Inizializzazione degli stati per i dati del form e gli errori
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  // Creazione dei riferimenti per i campi non controllati
  const nomeCompletoRef = useRef()
  const specializzazioneRef = useRef()
  const anniEsperienzaRef = useRef()

  // Definizione dei caratteri validi per la password
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~"

  // Funzione per la validazione dei campi
  const validate = (name, value) => {
    // Inizializza la stringa di errore
    let error = ""

    // Validazione per l'username
    if (name === "username") {
      const isValid = /^[a-zA-Z0-9]{6,}$/.test(value)
      if (!isValid) error = "Almeno 6 caratteri alfanumerici, senza spazi o simboli"
    }

    // Validazione per la password
    if (name === "password") {
      const hasLetter = [...value].some(c => letters.includes(c))
      const hasNumber = [...value].some(c => numbers.includes(c))
      const hasSymbol = [...value].some(c => symbols.includes(c))
      if (!(value.length >= 8 && hasLetter && hasNumber && hasSymbol)) {
        error = "Minimo 8 caratteri, 1 lettera, 1 numero, 1 simbolo"
      }
    }

    // Validazione per la descrizione
    if (name === "descrizione") {
      const len = value.trim().length
      if (len < 100 || len > 1000) error = "Tra 100 e 1000 caratteri"
    }

    // Aggiorna lo stato degli errori
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  // Gestore degli eventi di modifica dei campi
  const handleChange = (e) => {
    // Estrae nome e valore dal campo modificato
    const { name, value } = e.target
    // Aggiorna lo stato del form
    setFormData(prev => ({ ...prev, [name]: value }))
    // Esegue la validazione solo per i campi specifici
    if (["username", "password", "descrizione"].includes(name)) {
      validate(name, value)
    }
  }

  // Gestore dell'invio del form
  const handleSubmit = (e) => {
    // Previene il comportamento predefinito del form
    e.preventDefault()

    // Recupera i valori dai campi non controllati
    const nomeCompleto = nomeCompletoRef.current.value.trim()
    const specializzazione = specializzazioneRef.current.value
    const anniEsperienza = anniEsperienzaRef.current.value.trim()
    // Destruttura i valori dai campi controllati
    const { username, password, descrizione } = formData

    // Verifica che tutti i campi siano compilati
    if (!nomeCompleto || !username || !password ||
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

    // Stampa i dati del form nella console
    console.log("Dati inviati:", {
      nomeCompleto,
      username,
      password,
      specializzazione,
      anniEsperienza,
      descrizione
    })
  }

  // Funzione per mostrare i messaggi di validazione
  const showMessage = (name) => {
    // Se il campo è vuoto non mostra nessun messaggio
    if (!formData[name]) return null
    // Mostra messaggio di errore o di successo
    return errors[name]
      ? <p className="error">{errors[name]}</p>
      : <p className="success">✅ Valido</p>
  }

  // Rendering del form
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {/* Sezione Nome Completo */}
      <div className="form-group">
        <label>Nome Completo</label>
        <input type="text" name="nomeCompleto" ref={nomeCompletoRef} />
      </div>

      {/* Sezione Username con validazione */}
      <div className="form-group">
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        {showMessage("username")}
      </div>

      {/* Sezione Password con validazione */}
      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {showMessage("password")}
      </div>

      {/* Menu a tendina per la Specializzazione */}
      <div className="form-group">
        <label>Specializzazione</label>
        <select name="specializzazione" ref={specializzazioneRef}>
          <option value="">-- Seleziona --</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
        </select>
      </div>

      {/* Campo numerico per gli anni di esperienza */}
      <div className="form-group">
        <label>Anni di esperienza</label>
        <input type="number" name="anniEsperienza" ref={anniEsperienzaRef} />
      </div>

      {/* Area di testo per la descrizione con validazione */}
      <div className="form-group">
        <label>Descrizione</label>
        <textarea name="descrizione" rows="4" value={formData.descrizione} onChange={handleChange} />
        {showMessage("descrizione")}
      </div>

      {/* Pulsante di invio del form */}
      <button className="form-button">Registrati</button>
    </form>
  )
}

// Esporta il componente
export default App
