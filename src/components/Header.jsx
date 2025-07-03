import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Dropdown, Avatar, Typography, Button, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { NotebookPen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Logged out successfully');
    } catch (err) {
      message.error('Failed to logout');
    }
  };

  const dropdownItems = {
    items: [
      {
        key: 'username',
        label: (
          <div className="py-2 px-1">
            <Text strong className="text-base">{currentUser?.username}</Text>
            <br />
            <Text type="secondary" className="text-sm">
              {currentUser?.email}
            </Text>
          </div>
        ),
        disabled: true,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        danger: true,
        icon: <LogoutOutlined />,
        label: 'Logout',
        onClick: handleLogout,
      },
    ],
  };

  return (
    <AntHeader className="bg-white dark:bg-gray-800 px-6 flex justify-between items-center shadow-sm border-b border-gray-100 dark:border-gray-700">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg mr-3 text-white transform hover:rotate-12 transition-transform duration-200">
          <NotebookPen size={24} />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
  <Link to="/">
    NoteHub
  </Link>
</span>
      </div>
      
      <Dropdown menu={dropdownItems} placement="bottomRight" arrow>
        <Button 
          type="text" 
          className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          icon={
            <Avatar 
              size="small" 
              icon={<UserOutlined />} 
              className="bg-gradient-to-br from-teal-500 to-teal-600"
            />
          }
        >
          <span className="ml-2 hidden sm:inline">{currentUser?.username}</span>
        </Button>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;
