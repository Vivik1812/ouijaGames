export const adminLinks = [
    {to: "/admin/dashboard", label: "Dashboard"},
    {to: "/admin/users", label: "Usuarios"},
    {to: "/admin/juegos", label: "Juegos"},
    {to: "/", label: "Salir", onClick: () => handleLogout()},
];

export default adminLinks;