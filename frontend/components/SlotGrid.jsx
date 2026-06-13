export default function SlotGrid({
  slots,
  selectedSlots,
  setSelectedSlots,
}) {
const toMinutes = (time) => {
  const [h, m] = time
    .split(":")
    .map(Number);

  return h * 60 + m;
};

const handleClick = (slot) => {

  if (!slot.available) return;

  // Deselect

  if (
    selectedSlots.includes(slot.slot)
  ) {

    setSelectedSlots(
      selectedSlots.filter(
        (s) => s !== slot.slot
      )
    );

    return;
  }

  // First slot

  if (selectedSlots.length === 0) {

    setSelectedSlots([
      slot.slot,
    ]);

    return;
  }

  const sorted = [
    ...selectedSlots,
  ].sort(
    (a, b) =>
      toMinutes(a) -
      toMinutes(b)
  );

  const first =
    toMinutes(sorted[0]);

  const last =
    toMinutes(
      sorted[
        sorted.length - 1
      ]
    );

  const current =
    toMinutes(slot.slot);
    console.log(
  "Selected:",
  selectedSlots
);

console.log(
  "Current:",
  slot.slot,
  current
);

console.log(
  "First:",
  first
);

console.log(
  "Last:",
  last
);
  // only allow adjacent slot

  if (

    current === last + 30 ||

    current === first - 30

  ) {

    setSelectedSlots([
      ...selectedSlots,
      slot.slot,
    ]);

  } else {

    alert(
      "Please select consecutive slots only"
    );

  }

};

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
      {slots.map((slot) => (
        <button
          key={slot.slot}
          onClick={() =>
            handleClick(slot)
          }
         className={`

p-4

rounded-xl

font-semibold

shadow

transition

${
!slot.available

? "bg-red-600 text-white"

: selectedSlots.includes(slot.slot)

? "bg-green-600 text-white"

: "bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"

}

`}
        >
          {slot.slot}
        </button>
      ))}
    </div>
  );
}