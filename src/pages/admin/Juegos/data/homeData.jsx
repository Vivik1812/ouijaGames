// src/data/homeData.js
export const homeData = [
    {
        type: "text",
        text: [
            { id: 1, content: "Welcome a la edición de juegos", variant: "h1", className: "text-4xl font-bold text-center" },
            { id: 2, content: "Aqui podras editar todos los juegos de mesa :D", variant: "p", className: "text-lg text-gray-600 text-center mt-2" },
        ],
    },
    {
        type: "table",
        title: "Juegos Activos",
        columns: ["ID", "Nombre", "descripcion", "logo", "Acciones"],
        data: [], 
        service: "juegos",
        className: "my-8",
    },
];

export default homeData;