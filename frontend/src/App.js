import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/css/Projects-Grid-images.css";
import Banner from './components/interfaces/banner.js';
import Form from './components/interfaces/form.js';

function App() {

  const app_style = {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  };
  return (
      <div className='chatbot' style={app_style}>
        <Banner/>
        <Form/>
      </div>
  );}

export default App;