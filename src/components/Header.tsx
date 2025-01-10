import React, { useState } from 'react';
import { Button } from 'primereact/button';
import AgentForm from './AgentForm';

const Header: React.FC = () => {
    const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

    return (
        <div className="surface-0 shadow-1">
            <div className="flex justify-content-between align-items-center px-5 py-3">
                <h1 className="text-900 text-xl font-medium m-0">Agent Network</h1>
                <Button 
                    label="Add Agent"
                    icon="pi pi-plus"
                    className="p-button-success"
                    onClick={() => setShowAddDialog(true)}
                />
            </div>

            <AgentForm
                visible={showAddDialog}
                onHide={() => setShowAddDialog(false)}
            />
        </div>
    );
};

export default Header;