export type AgentStatus = 'Active' | 'Inactive';

export interface Agent {
    id: string;
    name: string;
    email: string;
    status: AgentStatus;
}

// For form handling and validation
export interface AgentFormData extends Omit<Agent, 'id'> {
    id?: string;
}

// For agent state management
export interface AgentState {
    agents: Agent[];
    loading: boolean;
    error: string | null;
}

// For agent context actions
export type AgentAction =
    | { type: 'ADD_AGENT'; payload: Agent }
    | { type: 'UPDATE_AGENT'; payload: Agent }
    | { type: 'DELETE_AGENT'; payload: string }
    | { type: 'SET_AGENTS'; payload: Agent[] }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean };