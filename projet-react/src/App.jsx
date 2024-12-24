import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import data from "../data.json";

function Header() {
  const [title, setTitle] = useState("Introduction à React");

  function changeTitle() {
    setTitle("Bienvenue dans React !");
  }

  return (
    <div>
      <img src={reactLogo} alt="Logo formation" />
      <h1>{title}</h1>
      <h2>A la découverte des premières notions de React</h2>
      <button onClick={changeTitle}>Changer le titre</button>
    </div>
  );
}

function MainContent() {
  const today = new Date();
  const [date, setDate] = useState(today);

  function updateTime() {
    setDate(new Date());
  }

  return (
    <div>
      <p>
        Bonjour, on est le {date.getDate()}, {date.getMonth() + 1}, {date.getFullYear()} et il est {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </p>
      <button onClick={updateTime}>Mettre à jour l'heure</button>
    </div>
  );
}

function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <div>
      <p>© {year} - Jesper.Elenga, Tous droits réservés.</p>
    </div>
  );
}

function MenuItem({ text, selected, onClick }) {
  return (
    <li>
      <button
        onClick={onClick}
        style={{
          fontWeight: selected ? 'bold' : 'normal',
          textDecoration: selected ? 'underline' : 'none',
        }}
      >
        {text}
      </button>
    </li>
  );
}

function getRandomItem(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

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

function Notes() {
  const notesData = data.filter(item => item.course.includes('Math') || item.course.includes('Physics') || item.course.includes('Chemistry') || item.course.includes('Biology') || item.course.includes('English') || item.course.includes('History') || item.course.includes('CS'));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course</TableCell>
            <TableCell>Student</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notesData.map((note) => (
            <TableRow key={note.unique_id}>
              <TableCell>{note.course}</TableCell>
              <TableCell>{note.student.firstname} {note.student.lastname}</TableCell>
              <TableCell>{note.date}</TableCell>
              <TableCell>{note.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Etudiants() {
  return <div>Etudiants</div>;
}

function Matieres() {
  return <div>Matieres</div>;
}

function APropos() {
  return <div>A propos</div>;
}

function App() {
  const [randomItem, setRandomItem] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("Notes");

  function handleRandomSelection() {
    const item = getRandomItem(data);
    setRandomItem(item);
  }

  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

  function renderContent() {
    switch (selectedMenu) {
      case "Notes":
        return <Notes />;
      case "Etudiants":
        return <Etudiants />;
      case "Matières":
        return <Matieres />;
      case "A propos":
        return <APropos />;
      default:
        return null;
    }
  }

  return (
    <>
      <nav style={{ marginBottom: "20px" }}>
        <ul style={{ display: "flex", listStyleType: "none", padding: 0, gap: "15px", alignContent: "left" }}>
          {menuItems.map((item) => (
            <MenuItem
              key={item}
              text={item}
              selected={item === selectedMenu}
              onClick={() => setSelectedMenu(item)}
            />
          ))}
        </ul>
      </nav>
      <div>
        <Header />
        <MainContent />
      </div>
      <div style={{ padding: "20px", fontFamily: "Arial", color: "#333" }}>
        <h1 style={{ color: "#fff" }}>Affichage d'une note</h1>
        <button onClick={handleRandomSelection} style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}>
          Tirer une note au hasard
        </button>
        <NoteDetails item={randomItem} />
      </div>
      <div>
        {renderContent()}
      </div>
      <Footer />
    </>
  );
}

export default App;