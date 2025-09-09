import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NoteModal from "./NoteModal";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authorization token found, Please Login in");
        return;
      }
      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get("search") || "";

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filteredNotes = search
        ? data.filter((notes) => {
            const match =
              notes.title.toLowerCase().includes(search.toLowerCase()) ||
              notes.description.toLowerCase().includes(search.toLowerCase());
            return match;
          })
        : data;

      setNotes(filteredNotes);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  }, [location.search]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleEdit = (note) => {
    setEditNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (newNote) => {
    setNotes((prevNotes) =>
      editNote
        ? prevNotes.map((note) =>
            note._id === newNote._id ? newNote : note
          )
        : [...prevNotes, newNote]
    );
    setEditNote(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in");
        return;
      }
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete note");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-6 min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100">
      {error && <p className="text-red-400 mb-4">{error}</p>}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditNote(null);
        }}
        note={editNote}
        onSave={handleSaveNote}
      />

      {/* Floating Create Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-700 rounded-full text-white text-3xl text-center shadow-lg hover:bg-blue-800 duration-200 flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="flex items-center justify-center mb-1 h-full w-full">
          +
        </span>
      </button>

      {loading ? (
        <p className="text-gray-500 text-center mt-10">Loading notes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col justify-between max-w-md"
              key={note._id}
            >
              {/* Title */}
              <div className="text-lg font-medium text-black dark:text-gray-100">
                {note.title}
              </div>

              {/* Description */}
              <div className="text-gray-500 dark:text-gray-100 break-words whitespace-normal flex-1">
                {note.description}
              </div>

              {/* Footer: Buttons + Date */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(note)}
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                  >
                    <MdModeEditOutline />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                  >
                    <MdDelete />
                  </button>
                </div>

                <p className="text-sm text-gray-400 dark:text-gray-100">
                  {new Date(note.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
