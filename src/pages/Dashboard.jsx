import React, { useState, useEffect } from 'react';
import { Layout, Space, Button, Input, Empty, message, Modal } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNotes } from '../context/NoteContext';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import EmptyState from '../components/EmptyState';

const { Content, Sider } = Layout;

const Dashboard = () => {
  const { notes, loading, fetchNotes, deleteNote, togglePinNote } = useNotes();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  // Extract unique categories
  useEffect(() => {
    if (notes.length > 0) {
      const uniqueCategories = [...new Set(notes.map(note => note.category))];
      setCategories(['All', ...uniqueCategories]);
    } else {
      setCategories(['All']);
    }
  }, [notes]);

  // Filter notes by search term and category
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group notes by pinned status
  const pinnedNotes = filteredNotes.filter(note => note.pinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.pinned);

  const handleAddNote = () => {
    setCurrentNote(null);
    setIsFormVisible(true);
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsFormVisible(true);
  };

  const handleDeleteNote = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this note?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteNote(id);
        } catch (err) {
          message.error('Failed to delete note');
        }
      }
    });
  };

  const handleTogglePin = async (id, isPinned) => {
    try {
      await togglePinNote(id, isPinned);
    } catch (err) {
      message.error('Failed to pin/unpin note');
    }
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setCurrentNote(null);
  };

  return (
    <Layout className="min-h-screen">
      <Header />
      
      <Layout>
        <Sider 
          width={250} 
          className="bg-white dark:bg-gray-800 p-4"
          collapsible
          collapsed={siderCollapsed}
          onCollapse={setSiderCollapsed}
          breakpoint="lg"
          collapsedWidth={0}
        >
          <div className="mb-6">
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAddNote}
              className="w-full"
              size="large"
            >
              {!siderCollapsed && 'New Note'}
            </Button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <Space direction="vertical" className="w-full">
              {categories.map(category => (
                <Button
                  key={category}
                  type={selectedCategory === category ? 'primary' : 'text'}
                  onClick={() => setSelectedCategory(category)}
                  className="text-left w-full"
                  ghost={selectedCategory === category}
                >
                  {category}
                </Button>
              ))}
            </Space>
          </div>
        </Sider>
        
        <Content className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                {selectedCategory === 'All' ? 'All Notes' : selectedCategory}
              </h1>
              <div className="flex gap-4">
                <Input
                  placeholder="Search notes..."
                  prefix={<SearchOutlined />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleAddNote}
                  className="md:hidden"
                >
                  New
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center my-12">
                <div className="w-12 h-12 border-4 border-t-teal-500 border-gray-200 rounded-full animate-spin"></div>
              </div>
            ) : notes.length === 0 ? (
              <EmptyState onAddNote={handleAddNote} />
            ) : filteredNotes.length === 0 ? (
              <Empty description="No matching notes found" />
            ) : (
              <div className="space-y-8">
                {pinnedNotes.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Pinned</h2>
                    <NoteList 
                      notes={pinnedNotes} 
                      onEdit={handleEditNote} 
                      onDelete={handleDeleteNote}
                      onTogglePin={handleTogglePin}
                    />
                  </div>
                )}
                
                {unpinnedNotes.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      {pinnedNotes.length > 0 ? 'Others' : 'Notes'}
                    </h2>
                    <NoteList 
                      notes={unpinnedNotes} 
                      onEdit={handleEditNote} 
                      onDelete={handleDeleteNote}
                      onTogglePin={handleTogglePin}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </Content>
      </Layout>

      <NoteForm 
        visible={isFormVisible} 
        onClose={closeForm} 
        note={currentNote} 
      />
    </Layout>
  );
};

export default Dashboard;