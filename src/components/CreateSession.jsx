import React, { useEffect, useState } from "react";
import { Form, Select, Button, message, Card, Row, Col, List, DatePicker, InputNumber, Popconfirm, Space } from "antd";
import dayjs from "dayjs";

import "./CreateSession.css";

const { Option } = Select;

const CreateSession = () => {
  const [films, setFilms] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=20d6f218c2d5b5050875849f0c4a2233&language=uk-UA&page=1")
      .then(res => res.json())
      .then(data => {
        const list = data.results.map(f => ({ id: f.id, title: f.title }));
        setFilms(list);
      })
      .catch(err => {
        message.error("Помилка при завантаженні фільмів");
        console.error(err);
      });
  }, []);

  const onFinish = (values) => {
    const selected = films.find(f => f.id === values.filmId);
    const dateStr = values.date.format("YYYY-MM-DD HH:mm");

    if (!selected || !dateStr || values.price === undefined) {
      message.error("Будь ласка, заповніть всі поля");
      return;
    }

    const newSession = {
      id: Date.now(),
      filmTitle: selected.title,
      date: dateStr,
      price: values.price,
    };

    setSessions(prev => [...prev, newSession]);
    message.success(`Сеанс "${selected.title}" створено на ${dateStr} за ціною ${values.price} грн`);
  };

  const handleDeleteSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    message.success("Сеанс видалено");
  };

  return (
    <Row gutter={24} style={{ padding: "30px" }}>
      <Col span={12}>
        <Card
          title="Створення нового сеансу"
          className="create-session-card"
          style={{ maxWidth: "100%" }}
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<span className="create-session-label">Фільм</span>}
              name="filmId"
              rules={[{ required: true, message: "Оберіть фільм" }]}
            >
              <Select
                placeholder="Оберіть фільм"
                className="create-session-select"
              >
                {films.map(f => (
                  <Option key={f.id} value={f.id}>{f.title}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={<span className="create-session-label">Дата і час</span>}
              name="date"
              rules={[{ required: true, message: "Виберіть дату й час" }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="create-session-label">Ціна (грн)</span>}
              name="price"
              rules={[
                { required: true, message: "Вкажіть ціну" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} step={1} />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" block className="create-session-button">
                Створити
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col span={12}>
        <Card
          title="Список сеансів"
          style={{ maxHeight: "100%", overflowY: "auto" }}
        >
          {sessions.length === 0 ? (
            <p style={{ color: "#888" }}>Сеансів ще немає</p>
          ) : (
            <List
              bordered
              dataSource={sessions}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title={`Видалити сеанс "${item.filmTitle}"?`}
                      onConfirm={() => handleDeleteSession(item.id)}
                      okText="Так"
                      cancelText="Ні"
                      key="delete"
                    >
                      <Button danger size="small">Видалити</Button>
                    </Popconfirm>
                  ]}
                >
                  <div>
                    <b>{item.filmTitle}</b> — {item.date} — <i>{item.price} грн</i>
                  </div>
                </List.Item>
              )}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CreateSession;


