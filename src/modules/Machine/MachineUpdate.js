import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import MachineService from '../../services/MachineService';
import { Stage, Layer, Rect, Transformer, Image } from 'react-konva';
import { Html } from 'react-konva-utils';
import EmplacementService from '../../services/EmplacementService';
function MachineUpdate({ match }) {


    const [machine, setMachine] = useState({});
    const machineId = useParams();
    const [selectedVue, setSelectedVue] = useState(machine.vues ? machine.vues[0] : null);
    

    const [rectangles, setRectangles] = useState([]);
    const [selectedShapeName, setSelectedShapeName] = useState('');
    const [rectId, setRectId] = useState(0);  // Nouvel état pour suivre l'ID du rectangle
    const rectRefs = useRef([]);
    const [isRectChanged, setIsRectChanged] = useState(false);
    const [selectedRectPosition, setSelectedRectPosition] = useState(null);
    const [initialePos, setInitialPos] = useState(null);
    const saveRectangle = async (rect) => {
        try {
            const response = await EmplacementService.createEmplacement(rect);
            if (response.data) {
                const newRect = { ...rect, id: response.data.id };
                setRectangles(prevRects => [...prevRects.slice(0, prevRects.length - 1), newRect]);
            }
        } catch (error) {
            console.error("Erreur lors de la création du rectangle:", error);
        }
    };
    

    const handleImageUpload = async (rect) => {
        const formData = new FormData();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        
        fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            formData.append('image', file);
            
            try {
                // Supposons que l'emplacement est déjà créé, vous voudrez mettre à jour avec une image.
                const response = await EmplacementService.updateEmplacement(rect.emplacementId, formData);
                const data = response.data;
                
                if (data && data.imageUrl) {
                    // Mettez à jour l'état local du rectangle avec l'URL de l'image.
                    const updatedRectangles = rectangles.map(r => 
                        r.id === rect.emplacementId ? { ...r, imageUrl: data.imageUrl } : r
                    );
                    
                    setRectangles(updatedRectangles);
                }
            } catch (error) {
                console.error("Erreur lors de l'upload de l'image:", error);
            }
        };
        
        fileInput.click();
    };
    


    // Etat pour le mode de dessin
    const [drawingMode, setDrawingMode] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        EmplacementService.getEmplacements().then(response => {
            console.log("Les emplacements trouvés :", response.data);
            setRectangles(response.data);  // Stockage des emplacements dans l'état
        });
    }, []);

    useEffect(() => {
        // Assurez-vous d'avoir une méthode pour obtenir les détails de la machine par ID
        MachineService.getMachineById(machineId.id)
            .then(response => {
                setMachine(response.data);
                console.log(machine);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des détails de la machine:", error);
            });
    }, [machineId]);


    useEffect(() => {
        if (selectedVue) {
            (async () => {
                try {
                    const response = await EmplacementService.getEmplacementById(selectedVue.vueId);
                    setRectangles(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des rectangles:', error);
                }
            })();
        }
    }, [selectedVue]);

    return (
        <div className="flex">
            <div className="w-1/2 p-4">
                <h2>Informations de la machine</h2>
                <label className="block mt-4">
                    Nom:
                    <input type="text" value={machine.nom || ''} onChange={e => setMachine(prev => ({ ...prev, nom: e.target.value }))} className="mt-2 border rounded p-2 w-full" />
                </label>
                <div className="mt-4">
                        <img src={machine.logoUrl} alt={machine.logoUrl} className="" width={150} height={150} />
                    </div>

                <button 
                    onClick={async () => {
                        try {
                            for (const rect of rectangles) {
                                await EmplacementService.createEmplacement(rect, null); 
                            }
                            setIsRectChanged(false);
                            alert('Modifications enregistrées avec succès !');
                        } catch (error) {
                            console.error('Erreur lors de la sauvegarde des modifications:', error);
                        }
                    }}
                    disabled={!isRectChanged}
                    className="mt-2 bg-green-500 text-white p-2 rounded"
                >
                    Enregistrer les modifications
                </button>

                {
                    selectedShapeName && selectedRectPosition && selectedRectPosition.x && selectedRectPosition.y && (
                        <button 
                            style={{ 
                                background: 'blue', // Couleur de fond pour le rendre visible
                                color: 'white',     // Couleur de texte
                                padding: '5px 10px', // Espacement interne pour le bouton
                                borderRadius: '5px' // Bord arrondi pour le bouton
                            }} 
                            onClick={() => handleImageUpload(rectangles.find(r => r.id === selectedShapeName))}
                        >
                            Upload Image
                        </button>
                    )
                }
            </div>

            <div className="w-1/2 p-4">
                <h2>Vues de la machine</h2>
              {/* Bouton pour activer le mode de dessin */}
              <button 
                            onClick={() => setDrawingMode(!drawingMode)}
                            className="mb-2 bg-blue-500 text-white p-2 rounded"
                        >
                            {drawingMode ? 'Désactiver le dessin' : 'Activer le dessin'}
                        </button>
                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    {machine.vues && machine.vues.map(vue => (
                        <li className="mr-2" key={vue.vueId}>
                            <a 
                                href="#" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedVue(vue);
                                }}
                                className={`inline-block p-4 rounded-t-lg ${selectedVue === vue ? 'text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500' : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'}`}
                            >
                                {vue.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {selectedVue && (
          <div className="mt-4 relative">

              <img src={selectedVue.imageUrl} alt={selectedVue.imageUrl} className="w-full" />

              <Stage
                width={window.innerWidth / 2}
                height={window.innerHeight}
                onMouseDown={e => {
                    if (!drawingMode) return; // Si le mode de dessin n'est pas activé, on ne fait rien
                    if (e.target !== e.target.getStage()) return;
                    // Si l'utilisateur clique ailleurs, désélectionnez le rectangle
                    if(e.target === e.target.getStage()) {
                        setSelectedShapeName('');
                    }
                    const pos = e.target.getStage().getPointerPosition();
                    // Ici, j'ajoute un vueId au rectangle lors de sa création.
                    setRectangles([...rectangles, {
                        x: pos.x, y: pos.y, width: 0, height: 0, vueId: selectedVue.vueId, id: rectId, rotation: 0, imageUrl: ''
                    }]);
                    setRectId(prevId => prevId + 1); // Incrémentation de l'ID pour le prochain rectangle
                    setIsDrawing(true); // Commence le dessin
                    setInitialPos(initialePos); // Gardez une trace de la position initiale du clic
                }}
                onMouseMove={e => {
                    if (!isDrawing) return; // Si on n'est pas en mode de dessin, on ne fait rien

                    const pos = e.target.getStage().getPointerPosition();

                    let lastRect = rectangles[rectangles.length - 1];
                    lastRect.width = pos.x - lastRect.x;
                    lastRect.height = pos.y - lastRect.y;

                    setRectangles([...rectangles.slice(0, rectangles.length - 1), lastRect]);
                }}
                onMouseUp={() => {
                    if (isDrawing) {
                        const lastRect = rectangles[rectangles.length - 1];
                        if (Math.abs(lastRect.width) > 5 && Math.abs(lastRect.height) > 5) { // Seulement enregistrer si le rectangle a une taille significative
                            saveRectangle(lastRect);
                        } else {
                            setRectangles(rectangles.slice(0, rectangles.length - 1)); // Sinon, supprimez le dernier rectangle
                        }
                    }
                    setIsDrawing(false);
                }}
                style={{ position: "absolute", top: 0, left: 0 }}
            >
            <Layer>
                {rectangles.filter(rect => rect.vueId === selectedVue.vueId).map((rect, i) => (
                    <React.Fragment key={rect.emplacementId}>
                            <Rect
                                x={rect.x}
                                y={rect.y}
                                width={rect.width}
                                height={rect.height}
                                rotation={rect.rotation}
                                fill="rgba(0,0,255,0.3)"
                                stroke={rect.emplacementId === selectedShapeName ? 'red' : null}
                                strokeWidth={3}
                                draggable
                                onDragEnd={(e) => {
                                    const index = rectangles.findIndex(r => r.emplacementId === rect.emplacementId);

                                    const updatedRects = [...rectangles];
                                    updatedRects[index] = {
                                        ...updatedRects[index],
                                        x: e.target.x(),
                                        y: e.target.y()
                                    };
                                    setIsRectChanged(true);
                                    setRectangles(updatedRects);
                                }}
                                ref={node => rectRefs.current[i] = node}
                                onClick={e => {
                                        if (e.target) {
                                            setSelectedShapeName(rect.emplacementId);
                                            console.log('AAAAAAAAAA', rect.emplacementId)
                                            setSelectedRectPosition({ x: e.target.x(), y: e.target.y() });
                                            e.cancelBubble = true;
                                        }
                                }}

                            />
                            {rect.imageUrl && (
                                <Image 
                                    x={rect.x}
                                    y={rect.y}
                                    width={rect.width}
                                    height={rect.height}
                                    image={new window.Image()} 
                                    onLoad={e => e.target.attrs.image.src = rect.imageUrl}
                                />
                            )}

                        {rect.emplacementId === selectedShapeName && (
                            <>

                            <Transformer
                                ref={node => {
                                    if (node) {
                                        node.setNode(rectRefs.current[i]);
                                    }
                                }}
                                anchorSize={5}
                                borderDash={[6, 2]}
                                onTransformEnd={() => {
                                    const index = rectangles.findIndex(r => r.emplacementId === rect.emplacementId);
                                    const updatedRects = [...rectangles];
                                    const node = rectRefs.current[i];
                                    const scaleX = node.scaleX();
                                    const scaleY = node.scaleY();

                                    updatedRects[index] = {
                                        ...updatedRects[index],
                                        x: node.x(),
                                        y: node.y(),
                                        width: node.width() * scaleX,
                                        height: node.height() * scaleY,
                                        rotation: node.rotation()  // enregistrement de la rotation
                                    };

                                    node.scaleX(1);
                                    node.scaleY(1);
                                    
                                    setIsRectChanged(true); // Ajout de cette ligne pour marquer le rectangle comme modifié
                                    setRectangles(updatedRects);
                                    setSelectedShapeName('');
                                }}
                                boundBoxFunc={(oldBox, newBox) => {
                                    if (newBox.width < 5 || newBox.height < 5) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                            />
                            </>
                            
                        )}

                    </React.Fragment>
                ))}
            </Layer>

            </Stage>

            </div>
            )}
            </div>
        </div>
    );
}

export default MachineUpdate;