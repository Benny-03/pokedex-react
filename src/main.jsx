import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App';
import SinglePokemon from './single-pokemon/SinglePokemon';

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        Component: App
    },
    {
        path: "/single-pokemon/:id",
        Component: SinglePokemon
    }
]);

root.render( <RouterProvider router={router} />);