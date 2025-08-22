const key = 'fav-films';

export const getFavorites = () => {
    const favs = localStorage.getItem(key);
    return favs ? JSON.parse(favs) : [];
};

export const isFavorite = (id) => {
    return getFavorites().includes(id);
};

export const addFavorite = (id) => {
    const favs = getFavorites();
    if (!favs.includes(id)) {
        favs.push(id);
        localStorage.setItem(key, JSON.stringify(favs));
    }
};

export const removeFavorite = (id) => {
    const favs = getFavorites().filter(favId => favId !== id);
    localStorage.setItem(key, JSON.stringify(favs));
};

export const toggleFavorite = (id) => {
    if (isFavorite(id)) {
        removeFavorite(id);
    } else {
        addFavorite(id);
    }
};
