import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Space, Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import NewFilm from './NewFilm';
import "./FilmList.css";
import moment from 'moment';

const { TextArea } = Input;

const FilmList = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFilm, setEditingFilm] = useState(null);
  const [form] = Form.useForm();
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=20d6f218c2d5b5050875849f0c4a2233&language=uk-UA&page=1")
      .then(res => res.json())
      .then(data => {
        const formattedData = data.results.map(film => ({ ...film, key: film.id }));
        setData(formattedData);
      })
      .catch(err => console.log("Помилка:", err));
  }, []);

  const handleDelete = (key) => {
    setData(prev => prev.filter(item => item.key !== key));
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  };

  const handleEditFilm = (updatedFilm) => {
    setData(prevData =>
      prevData.map(film => (film.key === updatedFilm.key ? updatedFilm : film))
    );
  };

  const handleAddFilm = (film) => {
    setData(prev => [film, ...prev]);
  };

  const showEditModal = (film) => {
    setEditingFilm(film);
    form.setFieldsValue({
      title: film.title,
      overview: film.overview,
      release_date: film.release_date ? moment(film.release_date) : null,
      vote_average: film.vote_average,
      original_language: film.original_language,
      poster_path: film.poster_path,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingFilm(null);
    form.resetFields();
  };

  const handleEditSubmit = (values) => {
    const releaseDate = values.release_date
      ? values.release_date.toISOString().split('T')[0]
      : '';

    const updatedFilm = {
      ...editingFilm,
      title: values.title,
      overview: values.overview,
      release_date: releaseDate,
      vote_average: values.vote_average,
      original_language: values.original_language,
      poster_path: values.poster_path,
    };

    setData(prev => prev.map(film => (film.key === updatedFilm.key ? updatedFilm : film)));
    handleCancel();
  };
  const toggleFavorite = (key) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const columns = [
    {
      title: 'Постер',
      dataIndex: 'poster_path',
      key: 'poster',
      render: poster => {
        if (!poster) {
          return <div style={{ width: 80, height: 120, backgroundColor: '#333' }}>Немає постера</div>;
        }
        const baseUrl = 'https://image.tmdb.org/t/p/w200';
        const src = poster.startsWith('http') ? poster : baseUrl + poster;
        return <img src={src} alt="poster" style={{ width: 80, borderRadius: 8 }} />;
      }
    },
    {
      title: 'Назва',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Опис',
      dataIndex: 'overview',
      key: 'overview',
      render: text => (
        <div style={{ maxWidth: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {text.length > 100 ? `${text.slice(0, 100)}...` : text}
        </div>
      )
    },
    {
      title: 'Дата релізу',
      dataIndex: 'release_date',
      key: 'release_date',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Мова',
      dataIndex: 'original_language',
      key: 'original_language',
      render: lang => lang.toUpperCase(),
    },
    {
      title: 'Рейтинг',
      dataIndex: 'vote_average',
      key: 'vote_average',
    },
    {
      title: 'Улюблене',
      key: 'favorite',
      render: (_, record) => {
        const isFav = favorites.has(record.key);
        return (
          <Button
            type={isFav ? "primary" : "default"}
            onClick={() => toggleFavorite(record.key)}
          >
            {isFav ? "Улюблений" : "В улюблені"}
          </Button>
        );
      }
    },
    {
      title: 'Дії',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => showEditModal(record)}>Редагувати</Button>
          <Popconfirm
            title={`Ви впевнені, що хочете видалити "${record.title}"?`}
            onConfirm={() => handleDelete(record.key)}
            okText="Так"
            cancelText="Ні"
          >
            <Button danger>Видалити</Button>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>
        Список фільмів &nbsp; 
        <span style={{ color: '#00bcd4' }}>
          (Улюблених: {favorites.size})
        </span>
      </h2>
      <NewFilm onAddFilm={handleAddFilm} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 6 }}
        style={{ marginTop: 24 }}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />

      <Modal
        title="Редагувати фільм"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
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
            label="Шлях до постеру"
            name="poster_path"
            rules={[
              { required: true, message: 'Вкажи шлях до постеру!' },
              {
                pattern: /^\/.*\.(jpg|jpeg|png|gif)$/i,
              },
            ]}
          >
            <Input placeholder="/tI7tcDR5hFtRHDzbECtDLVJi8nO.jpg" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={handleCancel}>Скасувати</Button>
              <Button type="primary" htmlType="submit">
                Зберегти
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FilmList;
