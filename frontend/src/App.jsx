import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from './atoms'; // Adjust the import path as necessary
import { CreateToDo } from './components/CreateToDo';
import { Todos } from './components/Todos';
import { Login } from './components/Login';
import { useState } from 'react';
import Interface from './components/Interface';

function App() {
  const auth = useRecoilValue(authState);
  const [showCreateToDo, setShowCreateToDo] = useState(false);

  const handleToggleCreateToDo = () => {
    setShowCreateToDo(!showCreateToDo);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={auth.isAuthenticated ? <Navigate to="/todos" /> : <Login />} />
          <Route
            path="/todos"
            element={
              auth.isAuthenticated ? (
                <>
                  <Interface/>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

