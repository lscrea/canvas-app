import React, { useState, useEffect } from "react";
import MachineService from "../../services/MachineService";  // Assurez-vous que le chemin d'importation est correct
import { Link } from "react-router-dom";

function Machine() {
    const [machines, setMachines] = useState([]);
  
    useEffect(() => {
      MachineService.getMachines()
        .then(response => {
          setMachines(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des machines:", error);
        });
    }, []);
  
    return (
      <div>
        <h1>Machines</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {machines.map(machine => (
            <Link key={machine.machineId} to={`/machine-update/${machine.machineId}`} className="p-4 border rounded-md shadow hover:bg-gray-100">
              <img src={machine.logoUrl} alt={machine.logoUrl} className="w-full h-40 object-cover rounded-t-md" />
              <h2 className="text-lg mt-2">{machine.nom}</h2>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  
  export default Machine;
