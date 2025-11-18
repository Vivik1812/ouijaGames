import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import juegosService from '../../services/productoService.jsx';

const JuegosList = () => {
    
    const [juegos, setJuegos] = useState([]);
    
    useEffect(() => {
        fetchJuegos();
    }, []);

    const fetchJuegos = () => {
        juegosService.getAllJuegos().then(response => {
            setJuegos(response.data);
        }).catch(error => {
            console.log('Error fetching juegos:', error);
        });
    };
    return (
        <div>
            <h2>Naves List</h2>
            <div className="bg-blue-500 text-white p-10 text-center font-bold text-2xl">
                Juegos de mesa
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre Juego</th>
                    </tr>
                </thead>
                <tbody>
                    {juegos.map(juego => (
                        <tr key={juego.id}>
                            <td>{juego.nombre}</td>    
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>);
    };
export default JuegosList;