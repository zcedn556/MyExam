import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, Layout as Layoutantd, Menu, theme } from 'antd';
import{
  HomeOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
const { Header, Content, Footer } = Layoutantd;
const items = [
    {
        key: '1',
        label: <Link to='/'>Home</Link>,
        icon: <HomeOutlined />
    },
    {
        key: '2',
        label: <Link to='/Films'>Films</Link>,
        icon: <DesktopOutlined />
    },
    {
      key: '3',
      label: <Link to="/create-session">Sessions</Link>,
      
    }
]


const Layout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layoutantd className='Layout'>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#121212'
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0, backgroundColor: '#121212' }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: '#121212',
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center',}}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layoutantd>
  );
};
export default Layout;