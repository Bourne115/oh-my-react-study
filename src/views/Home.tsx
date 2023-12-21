import { useState } from 'react';
import { Layout, Menu, Breadcrumb, Message, Avatar } from '@arco-design/web-react';
import { 
  IconHome, 
  IconCalendar, 
  IconCaretRight, 
  IconCaretLeft,
  IconAt
} from '@arco-design/web-react/icon';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import ReactLogo from "@/assets/react.svg"

const MenuItem = Menu.Item;
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
  const location = useLocation()

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
            <MenuItem key='0_1' onClick={() => navigate('counter', { replace: true})}>
              <IconHome />
              计数器
            </MenuItem>
            <MenuItem key='0_2' onClick={() => navigate('todo')}>
              <IconCalendar />
              TodoMvc
            </MenuItem>
            <MenuItem key='0_3' onClick={() => navigate('viewArco')}>
              <IconAt />
              Arco Demo
            </MenuItem>
            <MenuItem key='0_4' onClick={() => navigate('stopWatch')}>
              <IconAt />
              stopWatch
            </MenuItem>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ paddingLeft: 20 }}>Header</Header>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <Content>
              <Outlet></Outlet>
            </Content>
            <Footer>@copyright qile.com { location.pathname }</Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
