import ChatUI from './ChatUI';
import SideBar from './SideBar';
import './css/App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='app-container'>
      <SideBar />
      <ChatUI userName={"Omprakash"} />
      <Toaster  position='top-right'/>
    </div>
  );
}

export default App;
