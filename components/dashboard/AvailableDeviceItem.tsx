// src/components/dashboard/AvailableDeviceItem.tsx
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FaPersonRunning } from 'react-icons/fa6';
import { BsHeartPulseFill } from 'react-icons/bs';
import { FaApple, FaGoogle } from 'react-icons/fa';

// --- FIX PART 1: Separate the components from their styles ---

// Store the actual component types (constructors) in this object.
const IconComponents: { [key: string]: React.ComponentType<{ className?: string }> } = {
  fitbit: FaPersonRunning,
  omron: BsHeartPulseFill,
  dexcom: BsHeartPulseFill,
  apple_health: FaApple,
  google_fit: FaGoogle,
};

// Store the corresponding class names for styling.
const iconClasses: { [key: string]: string } = {
  fitbit: "text-teal-400",
  omron: "text-blue-400",
  dexcom: "text-purple-400",
  apple_health: "text-gray-400",
  google_fit: "text-red-400",
};


interface AvailableDeviceItemProps {
  name: string;
  iconId: string;
}

export function AvailableDeviceItem({ name, iconId }: AvailableDeviceItemProps) {
  // --- FIX PART 2: Use a PascalCase variable to hold the component ---
  const IconComponent = IconComponents[iconId];
  const iconClassName = iconClasses[iconId];

  return (
    <div className="bg-background rounded-lg p-4 flex items-center justify-between transition-colors hover:bg-background/80">
      <div className="flex items-center gap-4">
        <div className="text-3xl">
          {/* Render the component using the PascalCase variable. Add a check to prevent errors. */}
          {IconComponent && <IconComponent className={iconClassName} />}
        </div>
        <span className="font-semibold text-foreground">{name}</span>
      </div>
      <Button variant="primary">Connect</Button>
    </div>
  );
}

