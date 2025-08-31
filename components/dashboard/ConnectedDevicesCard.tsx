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
// --- WARNING FIX --- The unused FaApple and FaGoogle imports are removed from here.

const deviceIcons: { [key: string]: React.ReactNode } = {
  fitbit: <FaPersonRunning className="text-teal-400" size={24} />,
  omron: <BsHeartPulseFill className="text-blue-400" size={24} />,
  dexcom: <BsHeartPulseFill className="text-purple-400" size={24} />,
};

export function ConnectedDevicesCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <div className="flex -space-x-3">
              {mockPatient.connected_devices.map((device) => (
                <div
                  key={device.device_id}
                  className="w-10 h-10 rounded-full bg-card border-2 border-secondary/30 flex items-center justify-center"
                  title={device.model}
                >
                  {deviceIcons[device.type]}
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              + Connect More
            </Button>
          </div>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Connect a New Device"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {availableDevices.map((device) => (
            <AvailableDeviceItem 
              key={device.id} 
              name={device.name} 
              // --- BUILD ERROR FIX APPLIED HERE ---
              // The prop is now correctly named 'iconId' and receives the string identifier.
              iconId={device.icon} 
            />
          ))}
        </div>
      </Modal>
    </>
  );
}

