import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { message } from 'antd';

const NoteContext = createContext();

export const useNotes = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch notes when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    } else {
      setNotes([]);
    }
  }, [isAuthenticated]);

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/notes');
      setNotes(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
      message.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  // Get a single note
  const getNote = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/notes/${id}`);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch note');
      message.error('Failed to fetch note');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create a note
  const createNote = async (noteData) => {
    setLoading(true);
    try {
      const res = await axios.post('/notes', noteData);
      setNotes(prevNotes => [res.data.data, ...prevNotes]);
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
      message.error('Failed to create note');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a note
  const updateNote = async (id, noteData) => {
    setLoading(true);
    try {
      const res = await axios.put(`/notes/${id}`, noteData);
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note._id === id ? { ...note, ...res.data.data } : note
        )
      );
      return res.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update note');
      message.error('Failed to update note');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/notes/${id}`);
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
      message.error('Failed to delete note');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Pin/unpin a note
  const togglePinNote = async (id, isPinned) => {
    try {
      const noteToUpdate = notes.find(note => note._id === id);
      if (!noteToUpdate) return;
      
      const updatedNote = await updateNote(id, { 
        ...noteToUpdate, 
        pinned: !isPinned 
      });
      return updatedNote;
    } catch (err) {
      throw err;
    }
  };

  const value = {
    notes,
    loading,
    error,
    fetchNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    togglePinNote
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};