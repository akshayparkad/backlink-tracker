import logo from './logo.svg';
import './App.css';
import DashboardSection from './components/Dashboard/DashboardSection';
import { DeleteProvider } from './hooks/DeleteContext';

function App() {
  return (
    <div>
      <DeleteProvider>
        <DashboardSection />

      </DeleteProvider>
    </div>
  );
}

export default App;
