import React from 'react';
import { Button, Typography, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { NotebookPen } from 'lucide-react';

const { Title, Text } = Typography;

const EmptyState = ({ onAddNote }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full mb-8 text-white transform hover:scale-105 transition-transform duration-200">
        <NotebookPen size={48} />
      </div>
      
      <Title level={2} className="!mb-2 text-center bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
        Start Your Note-Taking Journey
      </Title>
      
      <Text className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md text-lg">
        Create your first note to begin organizing your thoughts, ideas, and tasks in one beautiful space.
      </Text>
      
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={onAddNote}
        size="large"
        className="shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
      >
        Create your first note
      </Button>
    </div>
  );
};

export default EmptyState;