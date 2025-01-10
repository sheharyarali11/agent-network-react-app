import { Agent, AgentFormData } from '../types/Agent';

const API_URL = 'http://localhost:3001/agents';

export const AgentAPI = {
    // Fetch all agents
    getAllAgents: async (): Promise<Agent[]> => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch agents');
            return response.json();
        } catch (error) {
            console.error('Error fetching agents:', error);
            // Fallback to localStorage if API fails
            const storedAgents = localStorage.getItem('agents');
            return storedAgents ? JSON.parse(storedAgents) : [];
        }
    },

    // Add new agent
    addAgent: async (agentData: AgentFormData): Promise<Agent> => {
        const newAgent = { ...agentData, id: crypto.randomUUID() };
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAgent)
            });
            if (!response.ok) throw new Error('Failed to add agent');
            return response.json();
        } catch (error) {
            console.error('Error adding agent:', error);
            // Fallback: Return the new agent as if it was saved
            return newAgent;
        }
    },

    // Update existing agent
    updateAgent: async (agent: Agent): Promise<Agent> => {
        try {
            const response = await fetch(`${API_URL}/${agent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(agent)
            });
            if (!response.ok) throw new Error('Failed to update agent');
            return response.json();
        } catch (error) {
            console.error('Error updating agent:', error);
            // Fallback: Return the updated agent as if it was saved
            return agent;
        }
    },

    // Delete agent
    deleteAgent: async (id: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete agent');
            return true;
        } catch (error) {
            console.error('Error deleting agent:', error);
            return false;
        }
    }
};