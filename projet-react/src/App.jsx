import { useState, useEffect } from 'react';
import Logo from './assets/react.svg';
import './App.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import data from "../data.json";

function Header() {
  const [title, setTitle] = useState("Introduction à React");

  function changeTitle() {
    setTitle("Bienvenue dans React !");
  }

  return (
    <div>
      <img src={Logo} alt="Logo formation" />
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

function Notes({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((note) => (
            <TableRow key={note.unique_id}>
              <TableCell>{note.course}</TableCell>
              <TableCell>{note.student.firstname} {note.student.lastname}</TableCell>
              <TableCell>{note.date}</TableCell>
              <TableCell>{note.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

function Etudiants() {
  const [studentsData, setStudentsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // Simulate fetching data
    const fetchedStudents = data.map(item => item.student);
    setStudentsData(fetchedStudents);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.firstname}</TableCell>
              <TableCell>{student.lastname}</TableCell>
              <TableCell>{student.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={studentsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}


function Matieres({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const subjectsData = [...new Set(data.map(item => item.course))];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjectsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((subject, index) => (
            <TableRow key={index}>
              <TableCell>{subject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={subjectsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

function APropos() {
  return <div>A propos</div>;
}

function SearchBar({ data, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredData = data.filter((item) => 
      item.course.toLowerCase().includes(term) ||
      item.student.firstname.toLowerCase().includes(term) ||
      item.student.lastname.toLowerCase().includes(term) ||
      item.grade.toString().includes(term)
    );

    onSearch(filteredData);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Rechercher par cours, étudiant ou note..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

function App() {
  const [randomItem, setRandomItem] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("Notes");
  const [filteredData, setFilteredData] = useState(data);

  function handleRandomSelection() {
    const item = getRandomItem(data);
    setRandomItem(item);
  }

  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

  function renderContent() {
    switch (selectedMenu) {
      case "Notes":
        return <Notes data={filteredData} />;
      case "Etudiants":
        return <Etudiants data={filteredData} />;
      case "Matières":
        return <Matieres data={filteredData} />;
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
        <SearchBar data={data} onSearch={setFilteredData} />  
        <Header />
        <MainContent />
      </div>
      <div>
        {renderContent()}
      </div>
      <div style={{ padding: "20px", fontFamily: "Arial", color: "#333" }}>
        <h1 style={{ color: "#fff" }}>Affichage d'une note</h1>
        <button onClick={handleRandomSelection} style={{ marginBottom: "20px", padding: "10px", fontSize: "16px" }}>
          Tirer une note au hasard
        </button>
        <NoteDetails item={randomItem} />
      </div>
      
      <Footer />
    </>
  );
}

export default App;