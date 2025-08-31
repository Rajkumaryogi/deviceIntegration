// src/components/dashboard/ConnectedDevicesCard.tsx
'use client'; 

import React, { useState } from 'react';
import { mockPatient, availableDevices } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FaPersonRunning } from 'react-icons/fa6';
import { BsHeartPulseFill } from 'react-icons/bs';
import { Modal } from '@/components/ui/Modal';
import { AvailableDeviceItem } from './AvailableDeviceItem';
// --- NEW --- Import the new component for the manage list
import { ConnectedDeviceItem } from './ConnectedDeviceItem';

// Define the icons for connected devices in one place
const deviceIcons: { [key: string]: React.ReactNode } = {
  fitbit: <FaPersonRunning className="text-teal-400" size={24} />,
  omron: <BsHeartPulseFill className="text-blue-400" size={24} />,
  dexcom: <BsHeartPulseFill className="text-purple-400" size={24} />,
};

export function ConnectedDevicesCard() {
  // --- UPDATED --- State now tracks which modal is open, if any.
  const [activeModal, setActiveModal] = useState<'connect' | 'manage' | null>(null);
  const deviceCount = mockPatient.connected_devices.length;

  return (
    <>
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Connected Devices</h2>
            <p className="text-secondary mt-1">{deviceCount} device linked</p>
          </div>
          <div className="flex items-center gap-4">
            {/* --- NEW --- This button now opens the 'manage' modal */}
            <button 
              onClick={() => setActiveModal('manage')} 
              className="flex -space-x-3 transition-transform hover:scale-105"
              aria-label="Manage connected devices"
            >
              {mockPatient.connected_devices.map((device) => (
                <div
                  key={device.device_id}
                  className="w-10 h-10 rounded-full bg-card border-2 border-secondary/30 flex items-center justify-center"
                  title={device.model}
                >
                  {deviceIcons[device.type]}
                </div>
              ))}
            </button>
            {/* This button still opens the 'connect' modal */}
            <Button variant="outline" onClick={() => setActiveModal('connect')}>
              + Connect More
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal for Connecting New Devices */}
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

      {/* --- NEW --- Modal for Managing Connected Devices */}
      <Modal 
        isOpen={activeModal === 'manage'} 
        onClose={() => setActiveModal(null)}
        title="Manage Your Devices"
      >
        <div className="flex flex-col gap-4 mt-4">
          {mockPatient.connected_devices.map((device) => (
            <ConnectedDeviceItem 
              key={device.device_id}
              device={device}
              icon={deviceIcons[device.type]} // Pass the icon component
            />
          ))}
        </div>
      </Modal>
    </>
  );
}