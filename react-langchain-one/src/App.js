import ChatUI from "./ChatUI";
import "./css/App.css";
import { Toaster } from "react-hot-toast";
import { firebaseConfig, initializeApp, getAnalytics } from "./firebase";
import { useEffect } from "react";
import { Header } from "./Header";

function App() {
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    getAnalytics(firebaseApp);
  }, []);
  return (
    <div className="app-container">
      <Header />
      <ChatUI userName={"Omprakash"} />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
