// components/dashboard/DeviceListItem.tsx
import { Device } from '@/types';
import { Card } from '@/components/ui/Card';
// --- FIX APPLIED HERE ---
// Replaced the missing FaFitbit icon with FaPersonRunning from the Font Awesome 6 set.
import { FaPersonRunning } from 'react-icons/fa6';
import { BsHeartPulseFill } from 'react-icons/bs';
import { format, parseISO } from 'date-fns';

interface DeviceListItemProps {
  device: Device;
}

const deviceIcons = {
  // Use the available FaPersonRunning icon as a substitute for Fitbit.
  fitbit: <FaPersonRunning className="text-teal-400" size={24} />,
  omron: <BsHeartPulseFill className="text-blue-400" size={24} />,
  dexcom: <BsHeartPulseFill className="text-purple-400" size={24} />,
};

export function DeviceListItem({ device }: DeviceListItemProps) {
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {deviceIcons[device.type]}
        <div>
          <p className="font-semibold text-foreground">{device.model}</p>
          <p className="text-sm text-secondary">Connected on {format(parseISO(device.connected_on), 'MMMM d, yyyy')}</p>
        </div>
      </div>
      <button className="text-sm font-medium text-red-500 hover:text-red-400">
        Disconnect
      </button>
    </Card>
  );
}

