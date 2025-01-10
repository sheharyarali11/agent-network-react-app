import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useAgentContext } from '../context/AgentContext';

const AgentDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getAgentById } = useAgentContext();
    
    const agent = getAgentById(id || '');

    if (!agent) {
        return (
            <div className="surface-ground p-4">
                <Card>
                    <div className="flex flex-column align-items-center gap-4">
                        <h2>Agent Not Found</h2>
                        <Button 
                            label="Back to List" 
                            icon="pi pi-arrow-left" 
                            onClick={() => navigate('/')}
                        />
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="surface-ground p-4">
            <Card>
                <div className="flex flex-column gap-4">
                    <div className="flex justify-content-between align-items-center">
                        <h2 className="m-0">Agent Details</h2>
                        <Button 
                            label="Back to List" 
                            icon="pi pi-arrow-left" 
                            outlined
                            onClick={() => navigate('/')}
                        />
                    </div>
                    
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div className="flex flex-column gap-4">
                                <div>
                                    <label className="block text-600 font-medium mb-2">Name</label>
                                    <div className="text-900">{agent.name}</div>
                                </div>
                                
                                <div>
                                    <label className="block text-600 font-medium mb-2">Email</label>
                                    <div className="text-900">{agent.email}</div>
                                </div>
                                
                                <div>
                                    <label className="block text-600 font-medium mb-2">Status</label>
                                    <Tag 
                                        value={agent.status} 
                                        severity={agent.status === 'Active' ? 'success' : 'danger'}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-600 font-medium mb-2">Agent ID</label>
                                    <div className="text-600">{agent.id}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AgentDetails;