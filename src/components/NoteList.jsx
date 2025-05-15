import React from 'react';
import { Row, Col, Card, Space, Tooltip, Button, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PushpinOutlined, PushpinFilled } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const NoteList = ({ notes, onEdit, onDelete, onTogglePin }) => {
  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Strip HTML content for preview
  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <Row gutter={[16, 16]}>
      {notes.map(note => (
        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={note._id}>
          <Card
            className="h-full overflow-hidden transition-all duration-300 hover:shadow-md"
            style={{ 
              borderLeft: `5px solid ${note.color || '#00B96B'}`,
              borderRadius: '8px' 
            }}
            bodyStyle={{ padding: '16px' }}
            actions={[
              <Tooltip title={note.pinned ? "Unpin" : "Pin"} key="pin">
                <Button 
                  type="text" 
                  icon={note.pinned ? <PushpinFilled /> : <PushpinOutlined />}
                  onClick={() => onTogglePin(note._id, note.pinned)}
                />
              </Tooltip>,
              <Tooltip title="Edit" key="edit">
                <Button 
                  type="text" 
                  icon={<EditOutlined />} 
                  onClick={() => onEdit(note)}
                />
              </Tooltip>,
              <Tooltip title="Delete" key="delete">
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={() => onDelete(note._id)}
                />
              </Tooltip>
            ]}
          >
            <div onClick={() => onEdit(note)} className="cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <Text strong ellipsis={{ tooltip: note.title }} className="text-lg">
                  {note.title}
                </Text>
                {note.category && (
                  <Text className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {note.category}
                  </Text>
                )}
              </div>
              
              <Paragraph 
                ellipsis={{ rows: 3, expandable: false }} 
                className="text-gray-600 dark:text-gray-400 mb-3"
              >
                {stripHtml(note.content)}
              </Paragraph>
              
              <div className="flex flex-col gap-1">
                <Text type="secondary" className="text-xs">
                  Created: {formatDate(note.createdAt)}
                </Text>
                {note.updatedAt !== note.createdAt && (
                  <Text type="secondary" className="text-xs">
                    Updated: {formatDate(note.updatedAt)}
                  </Text>
                )}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default NoteList;