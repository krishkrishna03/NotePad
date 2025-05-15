import React from 'react';
import { Button, Tooltip } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <Button
        type="text"
        icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleTheme}
        className="fixed right-4 top-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md !h-10 !w-10 flex items-center justify-center rounded-full"
        size="large"
      />
    </Tooltip>
  );
};

export default ThemeToggle;