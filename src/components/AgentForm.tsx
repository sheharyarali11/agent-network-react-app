import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { useAgentContext } from '../context/AgentContext';
import { Agent, AgentStatus, AgentFormData } from '../types/Agent';

interface AgentFormProps {
    agent?: Agent;
    visible: boolean;
    onHide: () => void;
}

const AgentForm: React.FC<AgentFormProps> = ({ agent, visible, onHide }) => {
    const { addAgent, updateAgent } = useAgentContext();
    const [formData, setFormData] = useState<AgentFormData>({
        name: '',
        email: '',
        status: 'Active'
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (agent) {
            setFormData({
                name: agent.name,
                email: agent.email,
                status: agent.status
            });
        } else {
            // Reset form when opening for new agent
            setFormData({
                name: '',
                email: '',
                status: 'Active'
            });
        }
        // Reset errors when form is opened/closed
        setErrors({});
    }, [agent, visible]);

    const statusOptions: { label: string; value: AgentStatus }[] = [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' }
    ];

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                if (agent) {
                    await updateAgent({
                        ...formData,
                        id: agent.id
                    });
                } else {
                    await addAgent(formData);
                }
                onHide();
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    status: 'Active'
                });
            } catch (error) {
                console.error('Error saving agent:', error);
                setErrors({
                    submit: 'Failed to save agent. Please try again.'
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const renderFooter = () => {
        return (
            <div>
                <Button
                    label="Cancel"
                    icon="pi pi-times"
                    outlined
                    onClick={onHide}
                    className="p-button-text"
                    disabled={isSubmitting}
                />
                <Button
                    label="Save"
                    icon="pi pi-check"
                    onClick={handleSubmit}
                    loading={isSubmitting}
                    autoFocus
                />
            </div>
        );
    };

    return (
        <Dialog
            header={agent ? 'Edit Agent' : 'Add New Agent'}
            visible={visible}
            style={{ width: '450px' }}
            modal
            className="p-fluid"
            footer={renderFooter()}
            onHide={onHide}
            closable={!isSubmitting}
        >
            <div className="flex flex-column gap-4">
                {errors.submit && (
                    <div className="p-error text-sm mb-2">{errors.submit}</div>
                )}

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={classNames({ 'p-invalid': errors.name })}
                        disabled={isSubmitting}
                        autoFocus
                    />
                    {errors.name && <small className="p-error">{errors.name}</small>}
                </div>

                <div className="field">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <InputText
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={classNames({ 'p-invalid': errors.email })}
                        disabled={isSubmitting}
                    />
                    {errors.email && <small className="p-error">{errors.email}</small>}
                </div>

                <div className="field">
                    <label htmlFor="status" className="font-bold">
                        Status
                    </label>
                    <Dropdown
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.value })}
                        options={statusOptions}
                        optionLabel="label"
                        placeholder="Select a Status"
                        disabled={isSubmitting}
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default AgentForm;