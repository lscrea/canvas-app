import logo from './logo.svg';
import './App.css';
import SideNav from './components/sideNav';
import ModeleMachine from './modules/Modele/ModeleMachine';
import Machine from './modules/Machine/Machine';
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";
import MachineUpdate from './modules/Machine/MachineUpdate';

function App() {

  console.log(process.env);
  return (
    <Router>
      <div className="flex">
        <SideNav />
        <div className="flex-1 p-10">
          <Routes>
            <Route path="/modeles" element={<ModeleMachine />} />
            <Route path="/machines" element={<Machine />} />
            <Route path="/machine-update/:id" element={<MachineUpdate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
