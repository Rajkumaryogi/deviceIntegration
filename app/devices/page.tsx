// app/devices/page.tsx
import { mockPatient } from '@/data/mockData';
import { PageTitle } from '@/components/ui/PageTitle';
import { DeviceListItem } from '@/components/dashboard/DeviceListItem';
import { Button } from '@/components/ui/Button';

export default function DevicesPage() {
  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <PageTitle>Manage Devices</PageTitle>
        <Button>Connect New Device</Button>
      </div>
      <div className="space-y-4">
        {mockPatient.connected_devices.map((device) => (
          <DeviceListItem key={device.device_id} device={device} />
        ))}
      </div>
    </main>
  );
}