import React from "react";
import { useSelector } from "react-redux";
import { selectNearestFavorite } from "../redux/favorites/favorites.selectors";

const NearestFavorite = () => {
  const nearest = useSelector(selectNearestFavorite);

  if (!nearest) {
    return (
      <div style={{ color: "#bbb", fontSize: "14px", padding: "0 12px" }}>
        Немає вибраних сеансів
      </div>
    );
  }

  return (
    <div style={{ color: "white", fontSize: "14px", padding: "0 12px" }}>
      <b>{nearest.filmTitle}</b> — {nearest.date}
    </div>
  );
};

export default NearestFavorite;
