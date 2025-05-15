import React, { useState, useEffect } from 'react';
import { 
  Modal, Form, Input, Button, Select, ColorPicker, Switch, message, Typography
} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNotes } from '../context/NoteContext';

const { Text } = Typography;

const NoteForm = ({ visible, onClose, note }) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const { createNote, updateNote, loading } = useNotes();
  const [submitting, setSubmitting] = useState(false);
  
  const isEditMode = !!note;

  useEffect(() => {
    if (visible) {
      if (note) {
        form.setFieldsValue({
          title: note.title,
          category: note.category,
          color: note.color,
          pinned: note.pinned
        });
        setContent(note.content);
      } else {
        form.resetFields();
        setContent('');
      }
    }
  }, [visible, note, form]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      
      if (!content.trim()) {
        message.error('Note content cannot be empty');
        return;
      }

      const noteData = {
        ...values,
        content
      };
      
      if (isEditMode) {
        await updateNote(note._id, noteData);
        message.success('Note updated successfully');
      } else {
        await createNote(noteData);
        message.success('Note created successfully');
      }
      
      onClose();
    } catch (err) {
      if (err.errorFields) {
        message.error('Please fill in all required fields');
      } else {
        message.error(isEditMode ? 'Failed to update note' : 'Failed to create note');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  };

  const categoryOptions = [
    { value: 'General', label: 'General' },
    { value: 'Work', label: 'Work' },
    { value: 'Personal', label: 'Personal' },
    { value: 'Ideas', label: 'Ideas' },
    { value: 'To-Do', label: 'To-Do' }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  return (
    <Modal
      title={isEditMode ? 'Edit Note' : 'Create New Note'}
      open={visible}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleSubmit}
          loading={submitting || loading}
        >
          {isEditMode ? 'Update Note' : 'Create Note'}
        </Button>
      ]}
    >
      {isEditMode && (
        <div className="mb-4 space-y-1">
          <Text type="secondary" className="text-sm">
            Created: {formatDate(note.createdAt)}
          </Text>
          {note.updatedAt !== note.createdAt && (
            <div>
              <Text type="secondary" className="text-sm">
                Last updated: {formatDate(note.updatedAt)}
              </Text>
            </div>
          )}
        </div>
      )}

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: '',
          category: 'General',
          color: '#00B96B',
          pinned: false
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Note title" />
        </Form.Item>

        <div className="mb-4">
          <label className="ant-form-item-label">
            <span className="ant-form-item-required">Content</span>
          </label>
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent}
            modules={quillModules}
            placeholder="Write your note here..."
            style={{ height: '200px', marginBottom: '40px' }}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <Form.Item
            name="category"
            label="Category"
            className="w-full sm:w-auto sm:flex-1"
          >
            <Select 
              placeholder="Select a category" 
              options={categoryOptions} 
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="color"
            label="Color Label"
            className="w-full sm:w-auto"
          >
            <ColorPicker />
          </Form.Item>

          <Form.Item
            name="pinned"
            label="Pin Note"
            valuePropName="checked"
            className="w-full sm:w-auto flex items-end"
          >
            <Switch />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default NoteForm;