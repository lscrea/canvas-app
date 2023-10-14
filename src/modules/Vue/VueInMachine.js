// VueInMachine.js
import React, { useState, useEffect } from 'react';
import VueService from '../../services/VueService';  // Assurez-vous que le chemin d'importation est correct

function VueInMachine({ machineId }) {
    const [vues, setVues] = useState([]);
    const [activeVue, setActiveVue] = useState(null);

    useEffect(() => {
        VueService.getVueById(machineId.id) // Vous devriez avoir une telle méthode dans votre service
            .then(response => {
                setVues(response.data);
                setActiveVue(response.data[0]);
                console.log(response.data, "tttttttt");
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des vues:", error);
            });
    }, [machineId]);

    return (
        <div>
            <div className="flex mb-4">
                {vues.map(vue => (
                    <button key={vue.VueId} onClick={() => setActiveVue(vue)} className="mr-2 p-2 border rounded">
                        {vue.Name}
                    </button>
                ))}
            </div>

            {activeVue && (
                <div>
                    <img src={activeVue.ImageUrl} alt={activeVue.Name} className="w-full" />
                    {/* Ajoutez ici tout autre élément nécessaire pour VueUpdateDto */}
                </div>
            )}
        </div>
    );
}

export default VueInMachine;
