import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './home/App';
import SinglePokemon from './single-pokemon/SinglePokemon';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/pokedex-react/",
        Component: App
    },
    {
        path: "/pokedex-react/single-pokemon/:id",
        Component: SinglePokemon
    }
]);

root.render( <RouterProvider router={router} />);