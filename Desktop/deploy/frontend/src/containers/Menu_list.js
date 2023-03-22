import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, message } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  SettingOutlined,
  StarOutlined,
  TagsOutlined,
  SearchOutlined,
  ToolOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { MYFAV_QUERY } from '../graphql';
import { useQuery } from "@apollo/client";
import Cookies from 'universal-cookie';
import LogoutModal from '../components/ConfirmLogoutModal';

import { useNavigate } from 'react-router-dom';
import { set } from 'ol/transform';
const { Sider } = Layout;
const { useToken } = theme;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('首頁', 'homePage', <HomeOutlined />),
  getItem("搜尋", "search", <SearchOutlined />),
  getItem('景點', 'sub2', <TagsOutlined />, [
    getItem('大自然類', '102', undefined, [
      getItem("生態類", "2"),
      getItem("國家公園類", "7"),
      getItem("國家風景類", "8"),
      getItem("自然風景類", "11"),
      getItem("森林遊樂類", "16"),
      getItem("林場類", "17"),
    ]),
    getItem('文藝／古蹟', '101', undefined, [
      getItem("文化類", "1"),
      getItem("古蹟類", "3"),
      getItem("廟宇類", "4"),
      getItem("藝術類", "5"),
    ]),
    getItem('小吃／特產', '6'),
    getItem('溫泉類', '10'),
    getItem('遊憩場所', '100', undefined, [
      getItem("休閒農業類", "9"),
      getItem("遊憩類", "12"),
      getItem("觀光工廠類", "14"),
      getItem("都會公園類", "15"),
    ]),
    getItem('體育場所', '13'),
    getItem('其他', '18')
  ]),
  getItem('最愛', 'favorite', <StarOutlined />),
  getItem('帳號設定', 'setting', <SettingOutlined />),
  getItem('開發者', 'developer', <TeamOutlined />),
  getItem("問題回報", "report", <ToolOutlined />),
  getItem('登出', 'logout', <PoweroffOutlined />),
];

const Menu_list = ({ setLoggedIn, setUser, username }) => {
  const [open, setOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setMode] = useState((window.innerWidth < 800) ? "horizontal" : "vertical");

  const cookies = new Cookies();

  const navigate = useNavigate();

  const onClick = (e) => {

    if (e.key === 'logout') {
      setOpen(true)
    } else {
      setCurrent(e.key);
      navigate('/' + e.key)
    }
  };

  useEffect(() => {
    if (confirmLogout) {
      cookies.remove('authJwtToken');
      cookies.remove('username');
      setLoggedIn(false);
      setUser('');
      navigate('/');
      message.info('登出成功！', 1)
    }
  }, [confirmLogout]);


  const { token } = useToken()

  window.addEventListener('resize', () => {
    if (window.innerWidth < 800)
      setMode("horizontal")
    else setMode("vertical")
  });

  return (
    <>
      <LogoutModal open={open} setOpen={setOpen} setConfirmLogout={setConfirmLogout} />
      <Sider
        theme='dark'
        style={{ backgroundColor: token.colorPrimary, minWidth: "50px", width: "50px" }}
        collapsible collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme='dark'
          style={{ backgroundColor: token.colorPrimary }}
          onClick={onClick}
          defaultOpenKeys={['HomePage']}
          selectedKeys={[current]}
          mode={mode}
          inlineCollapsed={collapsed}
          items={items}
        />
        <p style={{ color: "white", display: "flex", justifyContent: "center", fontSize: "120%", opacity: "0.85" }}>Hi {username}</p>
      </Sider>
    </>
  );
};

export default Menu_list;