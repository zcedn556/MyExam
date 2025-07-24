import React from 'react';
import { Form, Input, DatePicker, InputNumber, Button } from 'antd';


const { TextArea } = Input;

const NewFilm = ({ onAddFilm }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const releaseDate = values.release_date
      ? values.release_date.toISOString().split('T')[0]
      : '';

    const newFilm = {
      key: Date.now(),
      id: Date.now(),
      title: values.title,
      overview: values.overview,
      release_date: releaseDate,
      vote_average: values.vote_average,
      original_language: values.original_language,
      poster_path: values.poster_path,
    };
    onAddFilm(newFilm);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        label="Назва"
        name="title"
        rules={[{ required: true, message: 'Вкажіть назву фільму!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Опис"
        name="overview"
        rules={[{ required: true, message: 'Вкажіть опис!' }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Дата релізу"
        name="release_date"
        rules={[{ required: true, message: 'Вкажіть дату релізу!' }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        label="Рейтинг"
        name="vote_average"
        rules={[
          { required: true, message: 'Вкажіть рейтинг!' },
          { type: 'number', min: 0, max: 10, message: 'Рейтинг має бути від 0 до 10' }
        ]}
      >
        <InputNumber min={0} max={10} step={0.1} />
      </Form.Item>

      <Form.Item
        label="Мова (код)"
        name="original_language"
        rules={[
          { required: true, message: 'Вкажіть код мови (наприклад, uk)' },
          { len: 2, message: 'Код мови має бути 2 символи' }
        ]}
      >
        <Input maxLength={2} />
      </Form.Item>

      <Form.Item
        label="URL постеру"
        name="poster_path"
        rules={[
          { required: true, message: 'Вкажіть URL постеру!' },
          { type: 'url', message: 'Введіть валідний URL!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Додати фільм
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewFilm;

