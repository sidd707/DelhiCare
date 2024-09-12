import  { useState } from 'react';
import TotalProducts from './cards/totalProducts';
import StockRadial from './cards/stockRadial';
import InventoryTable from './inventoryTable';
import StockOverviewComponent from './cards/stockAvailable';

export default function InventoryDashboard() {
  const [activeTab, setActiveTab] = useState('medicines');

  return (
    <div className="container mx-auto p-0">
      {/* Tab Navigation with very small top margin */}
      <div className="flex space-x-4 border-b mt-1">
        <button
          className={`px-4 py-2 ${activeTab === 'medicines' ? 'border-b-2 border-black font-bold' : ''}`}
          onClick={() => setActiveTab('medicines')}
        >
          Medicines
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'consumables' ? 'border-b-2 border-black font-bold' : ''}`}
          onClick={() => setActiveTab('consumables')}
        >
          Consumables
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'equipment' ? 'border-b-2 border-black font-bold' : ''}`}
          onClick={() => setActiveTab('equipment')}
        >
          Equipment
        </button>
      </div>

      {/* Section for the graphs based on active tab */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
        {activeTab === 'medicines' && (
          <>
            {/* Graphs related to Medicines */}
            <TotalProducts />
            <StockRadial />
            <StockOverviewComponent />
            {/* Add additional graphs related to Medicines if needed */}
          </>
        )}

        {activeTab === 'consumables' && (
          <>
            {/* Graphs related to Consumables */}
            <TotalProducts />
            <StockRadial />
            <StockOverviewComponent />
            {/* Add additional graphs related to Consumables if needed */}
          </>
        )}

        {activeTab === 'equipment' && (
          <>
            {/* Graphs related to Equipment */}
            <TotalProducts />
            <StockRadial />
            <StockOverviewComponent />
            {/* Add additional graphs related to Equipment if needed */}
          </>
        )}
      </div>

      {/* Space for additional components */}
      <div className="mt-8">
        <InventoryTable inventory={[]} />
      </div>
    </div>
  );
}
