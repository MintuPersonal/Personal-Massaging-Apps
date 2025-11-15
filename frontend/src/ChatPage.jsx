import { useState, useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import "./ChatPage.css";
import "./App.css";

const API_BASE = 'http://localhost:3001/api';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: "me", text: "Hi" },
    { from: "other", text: "Hello" },
    { from: "me", text: "How are you?" },
    { from: "other", text: "I am good, thanks!" }
  ]);

  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [users, setUsers] = useState([]); // Store user objects from API
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/users`);
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
      setIsLoading(false);
    }
  };

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { 
      from: selectedUser ? selectedUser.name : "me", 
      text: input.trim(),
      avatar: selectedUser?.avatar
    }]);
    setInput("");
  };

  // Add new user via API
  const addUser = async () => {
    if (input.trim() === "") return;

    const name = input.trim();

    // Check for duplicate names
    if (users.some(user => user.name.toLowerCase() === name.toLowerCase())) {
      toast.error(`User "${name}" already exists!`);
      setInput("");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ name })
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const newUser = await response.json();
      setUsers([newUser, ...users]);
      setSelectedUser(newUser);
      setInput("");
      toast.success(`User "${name}" added successfully`);
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Personal Messaging App</h1>
        <div className="h6">Chat Interface</div>
        <p>Select or create a user to start messaging</p>
      </header>

      <main className="app-main">
        <div className="health-check">
          <h2>Message Status</h2>
          <Toaster position="top-right" />
          <div className={`chat-container ${darkMode ? "dark" : ""}`}>
            {/* Dark Mode Toggle Button */}
            <div className="top-bar">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>

            <div className="input-area">
              <label className="top-5">Sender</label>
              
              <div className="user-selection">
                <select 
                  value={selectedUser ? selectedUser.id : ''} 
                  onChange={(e) => {
                    const user = users.find(u => u.id === parseInt(e.target.value));
                    setSelectedUser(user);
                  }}
                  className="user-select"
                >
                  <option value="">Select user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>

                <div className="new-user-input">
                  <input
                    type="text"
                    placeholder="New user name..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addUser()}
                  />
                  <button onClick={addUser} className="create-btn">
                    Create
                  </button>
                </div>
              </div>
            </div>

            <div className="messages-box">
              {messages.map((msg, i) => (
                <div key={i} className={`message-row ${msg.from === selectedUser?.name ? "msg-right" : "msg-left"}`}>
                  {msg.avatar && (
                    <img 
                      src={msg.avatar} 
                      alt={msg.from} 
                      className="message-avatar"
                    />
                  )}
                  <div className={`message-bubble ${msg.from === selectedUser?.name ? "my-msg" : "other-msg"}`}>
                    <div className="message-sender">{msg.from}</div>
                    <div className="message-text">{msg.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="input-area message-input">
              <input
                type="text"
                placeholder={selectedUser ? "Type a message..." : "Select a user to start messaging"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={!selectedUser}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
