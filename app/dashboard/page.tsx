'use client';

import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import LocationSearch from '../components/LocationSearch';
import RideSelector from '../components/RideSelector';
import RequestButton from '../components/RequestButton';
import RideStatusCard from '../components/RideStatusCard';

const Map = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
});

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-col-reverse md:flex-row flex-1 overflow-hidden">
        {/* Map Section */}
        <div className="w-full md:w-2/3 h-[300px] md:h-full">
          <Map />
        </div>

        {/* Sidebar Section */}
        <div className="w-full md:w-1/3 h-full p-4 overflow-y-auto bg-white shadow-md md:shadow-lg">
          <LocationSearch />
          <RideSelector />
          <RequestButton />
          <RideStatusCard />
        </div>
      </div>
    </div>
  );
}
