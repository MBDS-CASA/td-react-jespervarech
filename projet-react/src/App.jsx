import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import data from "../data.json";


function Header() {
  return (
    <div>
      <img src={reactLogo} alt="Logo formation" />
      <h1>Introduction à React</h1>
      <h2>A la découverte des premières notions de React</h2>
    </div>
  )
}

function MainContent() {
  const today = new Date();
  const jour = today.getDate();
  const mois = today.getMonth() + 1;
  const annee = today.getFullYear();
  const heure = today.getHours();
  const minute = today.getMinutes();
  const seconde = today.getSeconds();

  return (
    <div>
      <p>Bonjour, on est le {jour}, {mois}, {annee} et il est {heure}:{minute}:{seconde}</p>
    </div>
  )
}

function Footer() {
  const annee = new Date().getFullYear();
  return (
    <div>
      <p>© {annee} - Jesper.Elenga, Tous droits réservés.</p>
    </div>
  )
}


function MenuItem({ Text}) {
  function handleClick() {
    console.log("click on", Text);
  }
  return (
    <li>
      <button onClick={handleClick}>{Text}</button>
    </li>
  );
}


// Fonction pour tirer un élément aléatoirement
function getRandomItem(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

// Composant pour afficher les détails d'une note
function NoteDetails({ item }) {
  if (!item) return null;

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <h2>{item.course}</h2>
      <p><strong>Étudiant :</strong> {item.student.firstname} {item.student.lastname}</p>
      <p><strong>ID :</strong> {item.student.id}</p>
      <p><strong>Date :</strong> {item.date}</p>
      <p><strong>Note :</strong> {item.grade}</p>
    </div>
  );
}





function App() {
  const [count, setCount] = useState(0)

  // État pour stocker l'élément sélectionné
  const [randomItem, setRandomItem] = useState(null);

  function handleRandomSelection() {
    const item = getRandomItem(data);
    setRandomItem(item);
  }

  return (
    <>
      <div>
        <Header /> 

        <MainContent />

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + MBDS +  React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ padding: "20px", fontFamily: "Arial", color: "#333" }}>
        <h1 style={{ color : "#fff"}}>Affichage d'une note</h1>
        <button onClick={handleRandomSelection} style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}>
          Tirer une note au hasard
        </button>

        {/* Composant pour afficher les détails */}
        <NoteDetails item={randomItem} />
      </div>
      <Footer />
    </>
  )
}

export default App
