import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Agent, AgentState, AgentAction, AgentFormData } from '../types/Agent';
import { AgentAPI } from '../services/api';

const initialState: AgentState = {
  agents: [],
  loading: false,
  error: null,
};

type AgentContextType = {
  state: AgentState;
  addAgent: (agent: AgentFormData) => Promise<void>;
  updateAgent: (agent: Agent) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  getAgentById: (id: string) => Agent | undefined;
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case 'ADD_AGENT':
      return {
        ...state,
        agents: [...state.agents, action.payload],
      };
    case 'UPDATE_AGENT':
      return {
        ...state,
        agents: state.agents.map((agent) =>
          agent.id === action.payload.id ? action.payload : agent
        ),
      };
    case 'DELETE_AGENT':
      return {
        ...state,
        agents: state.agents.filter((agent) => agent.id !== action.payload),
      };
    case 'SET_AGENTS':
      return {
        ...state,
        agents: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(agentReducer, initialState);

  // Load agents from API on mount
  useEffect(() => {
    const fetchAgents = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const agents = await AgentAPI.getAllAgents();
        dispatch({ type: 'SET_AGENTS', payload: agents });
        // Update localStorage with the latest data
        localStorage.setItem('agents', JSON.stringify(agents));
      } catch (error) {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: 'Failed to fetch agents' 
        });
        // Fallback to localStorage
        const storedAgents = localStorage.getItem('agents');
        if (storedAgents) {
          dispatch({ 
            type: 'SET_AGENTS', 
            payload: JSON.parse(storedAgents) 
          });
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchAgents();
  }, []);

  // Save to localStorage whenever agents change
  useEffect(() => {
    localStorage.setItem('agents', JSON.stringify(state.agents));
  }, [state.agents]);

  const addAgent = async (agentData: AgentFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newAgent = await AgentAPI.addAgent(agentData);
      dispatch({ type: 'ADD_AGENT', payload: newAgent });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to add agent' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateAgent = async (agent: Agent) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const updatedAgent = await AgentAPI.updateAgent(agent);
      dispatch({ type: 'UPDATE_AGENT', payload: updatedAgent });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to update agent' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteAgent = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await AgentAPI.deleteAgent(id);
      dispatch({ type: 'DELETE_AGENT', payload: id });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to delete agent' 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getAgentById = (id: string) => {
    return state.agents.find((agent) => agent.id === id);
  };

  const value = {
    state,
    addAgent,
    updateAgent,
    deleteAgent,
    getAgentById,
  };

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgentContext() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error('useAgentContext must be used within an AgentProvider');
  }
  return context;
}