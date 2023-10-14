import React, { useState, useEffect } from "react";
import ModeleMachineService from "../../services/ModeleMachineService";  // Assurez-vous que le chemin d'importation est correct

function ModeleMachine() {
    const [modeles, setModeles] = useState([]);
  
    useEffect(() => {
      ModeleMachineService.getModeleMachines()
        .then(response => {
          setModeles(response.data);
          console.log(response.data, 'ttt');
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des modèles de machine:", error);
        });
    }, []);
  
    return (
      <div>
        <h1>Modèles de Machine</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modeles.map(modele => (
            <div key={modele.modeleMachineId} className="p-4 border rounded-md shadow">
              <img src={modele.logoUrl} alt={modele.logoUrl} className="w-full h-40 object-cover rounded-t-md" />
              <h2 className="text-lg mt-2">{modele.nom}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ModeleMachine;
