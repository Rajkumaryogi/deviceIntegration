// app/components/dashboard/ConnectedDevicesCard.tsx
'use client'; 

import React, { useState } from 'react';
// --- REMOVED --- No longer importing mockPatient
import { availableDevices } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FaPersonRunning } from 'react-icons/fa6';
import { BsHeartPulseFill } from 'react-icons/bs';
import { Modal } from '@/components/ui/Modal';
import { AvailableDeviceItem } from './AvailableDeviceItem';
import { ConnectedDeviceItem } from './ConnectedDeviceItem';
import { Device } from '@/types'; // Import the Device type

const deviceIcons: { [key: string]: React.ReactNode } = {
  fitbit: <FaPersonRunning className="text-teal-400" size={24} />,
  omron: <BsHeartPulseFill className="text-blue-400" size={24} />,
  dexcom: <BsHeartPulseFill className="text-purple-400" size={24} />,
};

// --- NEW --- The component now accepts props
interface ConnectedDevicesCardProps {
  connectedDevices: Device[];
}

export function ConnectedDevicesCard({ connectedDevices }: ConnectedDevicesCardProps) {
  const [activeModal, setActiveModal] = useState<'connect' | 'manage' | null>(null);
  // --- UPDATED --- Use the length of the prop array
  const deviceCount = connectedDevices.length;

  return (
    <>
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Connected Devices</h2>
            <p className="text-secondary mt-1">{deviceCount} device linked</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveModal('manage')} 
              className="flex -space-x-3 transition-transform hover:scale-105"
              aria-label="Manage connected devices"
            >
              {/* --- UPDATED --- Map over the prop array */}
              {connectedDevices.map((device) => (
                <div
                  key={device.device_id}
                  className="w-10 h-10 rounded-full bg-card border-2 border-secondary/30 flex items-center justify-center"
                  title={device.model}
                >
                  {deviceIcons[device.type]}
                </div>
              ))}
            </button>
            <Button variant="outline" onClick={() => setActiveModal('connect')}>
              + Connect More
            </Button>
          </div>
        </div>
      </Card>

      <Modal 
        isOpen={activeModal === 'connect'} 
        onClose={() => setActiveModal(null)}
        title="Connect a New Device"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {availableDevices.map((device) => (
            <AvailableDeviceItem 
              key={device.id} 
              name={device.name} 
              iconId={device.icon} 
            />
          ))}
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'manage'} 
        onClose={() => setActiveModal(null)}
        title="Manage Your Devices"
      >
        <div className="flex flex-col gap-4 mt-4">
          {/* --- UPDATED --- Map over the prop array */}
          {connectedDevices.map((device) => (
            <ConnectedDeviceItem 
              key={device.device_id}
              device={device}
              icon={deviceIcons[device.type]}
            />
          ))}
        </div>
      </Modal>
    </>
  );
}

