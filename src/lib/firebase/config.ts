import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC3W2R7OgVGoH7el8jyV8zmP6-QUWWdnb4",
  authDomain: "todoappsial.firebaseapp.com",
  projectId: "todoappsial",
  storageBucket: "todoappsial.firebasestorage.app",
  messagingSenderId: "373923155243",
  appId: "1:373923155243:web:9a59f98a23886ea4b7496e",
  measurementId: "G-NFE4YRTQ90"
};

export const app = initializeApp(firebaseConfig);