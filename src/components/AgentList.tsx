import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable, DataTableRowClickEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useAgentContext } from '../context/AgentContext';
import { Agent } from '../types/Agent';
import AgentForm from './AgentForm';

const AgentList: React.FC = () => {
  const navigate = useNavigate();
  const { state, deleteAgent } = useAgentContext();
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const confirmDelete = (agent: Agent) => {
    confirmDialog({
      message: `Are you sure you want to delete ${agent.name}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteAgent(agent.id),
      reject: () => {/* do nothing */}
    });
  };

  const statusBodyTemplate = (agent: Agent) => {
    return (
      <Tag 
        value={agent.status} 
        severity={agent.status === 'Active' ? 'success' : 'danger'}
        className="text-xs"
      />
    );
  };

  const actionBodyTemplate = (agent: Agent) => {
    return (
      <div className="flex gap-2 justify-content-end">
        <Button
          icon="pi pi-eye"
          rounded
          outlined
          className="p-button-text"
          onClick={() => navigate(`/agent/${agent.id}`)}
        />
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="p-button-text"
          onClick={() => {
            setSelectedAgent(agent);
            setShowEditDialog(true);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          className="p-button-text"
          onClick={() => confirmDelete(agent)}
        />
      </div>
    );
  };

  const onRowClick = (event: DataTableRowClickEvent) => {
    navigate(`/agent/${event.data.id}`);
  };

  return (
    <div className="card mt-5 px-4">
      <div className="flex flex-column gap-4">
        <div className="flex justify-content-between align-items-center">
          <h2 className="text-900 font-medium text-lg m-0">Agents</h2>
          <span className="p-input-icon-left">
            <InputText
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search agents..."
              className="p-inputtext-sm"
            />
          </span>
        </div>

        <DataTable
          value={state.agents}
          paginator
          rows={10}
          dataKey="id"
          globalFilter={globalFilter}
          emptyMessage="No agents found."
          loading={state.loading}
          className="p-datatable-sm"
          stripedRows
          showGridlines
          tableStyle={{ minWidth: '50rem' }}
          onRowClick={onRowClick}
          selectionMode="single"
        >
          <Column 
            field="name" 
            header="Name" 
            sortable 
            style={{ width: '30%' }}
          />
          <Column 
            field="email" 
            header="Email" 
            sortable 
            style={{ width: '40%' }}
          />
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            style={{ width: '15%' }}
          />
          <Column
            body={actionBodyTemplate}
            style={{ width: '15%' }}
          />
        </DataTable>

        <ConfirmDialog />

        {showEditDialog && selectedAgent && (
          <AgentForm
            visible={showEditDialog}
            onHide={() => {
              setShowEditDialog(false);
              setSelectedAgent(null);
            }}
            agent={selectedAgent}
          />
        )}
      </div>
    </div>
  );
};

export default AgentList;