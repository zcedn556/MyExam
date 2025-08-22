import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import "./Home.css";

const Home = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=20d6f218c2d5b5050875849f0c4a2233&language=uk-UA&page=1"
    )
      .then((res) => res.json())
      .then((data) => {
        setFilms(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Помилка:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Популярні фільми</h2>
      <Row gutter={[16, 16]}>
        {films.map((film) => {
          const posterUrl = film.poster_path
            ? `https://image.tmdb.org/t/p/w300${film.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Poster";

          return (
            <Col key={film.id} xs={24} sm={12} md={8} lg={6}>
              <div className="film-box">
                <img src={posterUrl} alt={film.title} className="film-poster" />
                <h3 className="film-title">{film.title}</h3>
                <p className="film-info">
                  Рейтинг: {film.vote_average} | Дата: {film.release_date}
                </p>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Home;
