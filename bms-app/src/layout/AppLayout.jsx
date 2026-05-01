import { Outlet } from 'react-router-dom';
import TacticalHeader from '../components/layout/TacticalHeader';
import BackgroundGrid from '../components/layout/BackgroundGrid';

export default function AppLayout() {
  return (
    <div className="relative min-h-screen w-full bg-navy-900 text-white overflow-hidden flex flex-col">
      <BackgroundGrid />
      <div className="relative z-10 flex flex-col h-screen">
        <TacticalHeader />
        <main className="flex-1 overflow-y-auto no-scrollbar p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
