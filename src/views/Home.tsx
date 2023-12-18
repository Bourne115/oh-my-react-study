import { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Message, Avatar } from '@arco-design/web-react';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';
import { Outlet, useNavigate } from 'react-router-dom';
import ReactLogo from "@/assets/react.svg"

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

function Home () {
  const [collapsed, changeCollapsed] = useState(false)
  const handleCollapsed = () => {
    changeCollapsed(!collapsed)
  };
  const navigate = useNavigate()
  return (
    <>
      <Layout className='layout-collapse-demo'>
        <Sider
          theme='dark'
          collapsed={collapsed}
          onCollapse={handleCollapsed}
          collapsible
          trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
          breakpoint='xl'
        >
          <div className='logo' >
            <Avatar>
              <img
                alt='avatar'
                src={ReactLogo}
              />
            </Avatar>
          </div>
          <Menu
            theme='dark'
            defaultOpenKeys={['1']}
            defaultSelectedKeys={['0_1']}
            onClickMenuItem={(key) =>
              Message.info({
                content: `You select ${key}`,
                showIcon: true,
              })
            }
            style={{ width: '100%' }}
          >
            <MenuItem key='0_1' onClick={() => navigate('counter')}>
              <IconHome />
              计数器
            </MenuItem>
            <MenuItem key='0_2' onClick={() => navigate('todo')}>
              <IconCalendar />
              TodoMvc
            </MenuItem>
            <MenuItem key='0_3'>
              <IconCalendar />
              Menu 3
            </MenuItem>
            <SubMenu
              key='1'
              title={
                <span>
                  <IconCalendar />
                  Navigation 1
                </span>
              }
            >
              <MenuItem key='1_1'>Menu 1</MenuItem>
              <MenuItem key='1_2'>Menu 2</MenuItem>
              <SubMenu key='2' title='Navigation 2'>
                <MenuItem key='2_1'>Menu 1</MenuItem>
                <MenuItem key='2_2'>Menu 2</MenuItem>
              </SubMenu>
              <SubMenu key='3' title='Navigation 3'>
                <MenuItem key='3_1'>Menu 1</MenuItem>
                <MenuItem key='3_2'>Menu 2</MenuItem>
                <MenuItem key='3_3'>Menu 3</MenuItem>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key='4'
              title={
                <span>
                  <IconCalendar />
                  Navigation 4
                </span>
              }
            >
              <MenuItem key='4_1'>Menu 1</MenuItem>
              <MenuItem key='4_2'>Menu 2</MenuItem>
              <MenuItem key='4_3'>Menu 3</MenuItem>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ paddingLeft: 20 }}>Header</Header>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
              <Outlet></Outlet>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
