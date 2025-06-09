'use client';

export default function ServiceSelector() {
  const services = [
    { type: 'Plumber', price: '$20/hr', eta: 'Available in 15 min' },
    { type: 'Electrician', price: '$25/hr', eta: 'Available in 10 min' },
    { type: 'Carpenter', price: '$18/hr', eta: 'Available in 20 min' },
    { type: 'Painter', price: '$22/hr', eta: 'Available in 30 min' },
  ];

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Select a Service</h2>
      <div className="space-y-2">
        {services.map((service) => (
          <div
            key={service.type}
            className="flex justify-between items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <div>
              <h3 className="font-medium text-base">{service.type}</h3>
              <p className="text-sm text-gray-500">{service.eta}</p>
            </div>
            <span className="font-bold text-sm">{service.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
