export default function LocationSearch() {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter pickup location"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="Enter destination"
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
