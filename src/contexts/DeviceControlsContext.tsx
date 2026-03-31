import { createContext, useContext, type ReactNode } from 'react';
import { useDeviceControls } from '@/hooks/useDeviceControls';

type DeviceControlsValue = ReturnType<typeof useDeviceControls>;

const DeviceControlsContext = createContext<DeviceControlsValue | null>(null);

export function DeviceControlsProvider({ children }: { children: ReactNode }) {
  const controls = useDeviceControls();
  return (
    <DeviceControlsContext.Provider value={controls}>
      {children}
    </DeviceControlsContext.Provider>
  );
}

export function useDeviceControlsContext(): DeviceControlsValue {
  const ctx = useContext(DeviceControlsContext);
  if (!ctx) throw new Error('useDeviceControlsContext must be used within DeviceControlsProvider');
  return ctx;
}
