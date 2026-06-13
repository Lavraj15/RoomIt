export default function BookingForm({
  formData,
  setFormData,
  handleBooking,
}) {
  return (
    <div className="space-y-3 mt-5">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full"
        value={formData.bookedByName}
        onChange={(e) =>
          setFormData({
            ...formData,
            bookedByName:
              e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={formData.bookedByEmail}
        onChange={(e) =>
          setFormData({
            ...formData,
            bookedByEmail:
              e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Meeting Title"
        className="border p-2 w-full"
        value={formData.title}
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
      />

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Book Now
      </button>
    </div>
  );
}