import ChatUI from './ChatUI';
import SideBar from './SideBar';
import './css/App.css';

function App() {
  return (
    <div className='app-container'>
      <SideBar />
      <ChatUI userName={"Omprakash"} />
    </div>
  );
}

export default App;
