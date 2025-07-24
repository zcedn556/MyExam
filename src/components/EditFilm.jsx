import React, { useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const EditFilm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const film = location.state?.film;

  useEffect(() => {
    if (!film) {
      message.error("Дані фільму не передані");
      navigate('/');
      return;
    }
    form.setFieldsValue({
      ...film,
      release_date: dayjs(film.release_date),
    });
  }, [film, form, navigate]);

  const onFinish = (values) => {
    const updatedFilm = {
      ...film,
      ...values,
      release_date: values.release_date.format('YYYY-MM-DD'),
    };
    navigate('/', { state: { updatedFilm } });
    message.success("Фільм оновлено");
  };

  if (!film) return null;

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "auto" }}>
      <h2>Редагування фільму</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Назва"
          rules={[{ required: true, message: "Введіть назву фільму" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="overview"
          label="Опис"
          rules={[{ required: true, message: "Введіть опис" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="release_date"
          label="Дата релізу"
          rules={[{ required: true, message: "Оберіть дату" }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="poster_path"
          label="Шлях до постера (rel path)"
        >
          <Input placeholder="/abc.jpg" />
        </Form.Item>

        <Form.Item
          name="vote_average"
          label="Рейтинг"
          rules={[{ required: true, message: "Вкажіть рейтинг" }]}
        >
          <InputNumber min={0} max={10} step={0.1} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="original_language"
          label="Мова"
          rules={[{ required: true, message: "Вкажіть мову" }]}
        >
          <Input placeholder="uk" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зберегти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditFilm;
