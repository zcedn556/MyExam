import React, { createContext, useState, useEffect, useContext } from 'react';
import { getFavorites, toggleFavorite, isFavorite } from '../services/favorites.service';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleToggleFavorite = (id) => {
        toggleFavorite(id);
        setFavorites(getFavorites());
    };

    const value = {
        favorites,
        isFavorite: (id) => isFavorite(id),
        toggleFavorite: handleToggleFavorite
    };

    return (
        <FavoriteContext.Provider value={value}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoriteContext);
