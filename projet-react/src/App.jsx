import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


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
  return (
    <div>
      <p>Ici, nous afficherons des informations interessantes :)</p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="fixed bottom-0 w-full p-4 bg-gray-100">
      <p className="text-center">Tous droits réservés - Elenga Jesper</p>
    </footer>
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




function App() {
  const [count, setCount] = useState(0)

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
      <Footer />
    </>
  )
}

export default App
