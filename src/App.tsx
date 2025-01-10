import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AgentProvider } from './context/AgentContext';
import Header from './components/Header';
import AgentList from './components/AgentList';
import AgentDetails from './components/AgentDetails';
import { Toast } from 'primereact/toast';

function App() {
    return (
        <Router>
            <AgentProvider>
                <div className="min-h-screen surface-ground">
                    <Toast position="top-right" />
                    <Header />
                    <div className="max-w-7xl mx-auto">
                        <Routes>
                            <Route path="/" element={<AgentList />} />
                            <Route path="/agent/:id" element={<AgentDetails />} />
                        </Routes>
                    </div>
                </div>
            </AgentProvider>
        </Router>
    );
}

export default App;