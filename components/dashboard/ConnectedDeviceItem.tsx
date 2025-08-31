//components/dashboard/ConnectedDeviceItem.tsx
import { format, parseISO } from 'date-fns';
import { Device } from '@/types';
import { Button } from '@/components/ui/Button';

interface ConnectedDeviceItemProps {
  device: Device;
  icon: React.ReactNode;
}

export function ConnectedDeviceItem({ device, icon }: ConnectedDeviceItemProps) {
  return (
    <div className="bg-background rounded-lg p-4 flex items-center justify-between transition-colors hover:bg-background/80">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="font-semibold text-foreground">{device.model}</p>
          <p className="text-sm text-secondary">
            Connected on {format(parseISO(device.connected_on), 'MMMM d, yyyy')}
          </p>
        </div>
      </div>
      <Button variant="outline">Disconnect</Button>
    </div>
  );
}
