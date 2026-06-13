import Link from "next/link";

export default function RoomCard({ room }) {
  return (
    <div
      className="
      relative

      bg-slate-900

      border

      border-slate-700

      rounded-3xl

      p-8

      overflow-hidden

      shadow-2xl

      hover:border-indigo-500

      hover:shadow-indigo-500/20

      hover:-translate-y-2

      transition-all

      duration-300
      "
    >

      {/* Left Glow Border */}

      <div
        className="
        absolute

        left-0

        top-0

        h-full

        w-1

        bg-gradient-to-b

        from-indigo-500

        via-purple-500

        to-pink-500
        "
      />

      {/* Top Right Glow */}

      <div
        className="
        absolute

        -top-10

        -right-10

        h-32

        w-32

        rounded-full

        bg-indigo-500/10

        blur-3xl
        "
      />

      <h2
        className="
        text-4xl

        font-bold

        mb-6

        text-white
        "
      >
        🏢 {room.name}
      </h2>

      <p
        className="
        text-xl

        mb-4

        text-gray-300
        "
      >
        📍 {room.location}
      </p>

      <p
        className="
        text-xl

        mb-8

        text-gray-300
        "
      >
        👥 Capacity:{" "}
        <span className="text-white font-semibold">
          {room.capacity}
        </span>
      </p>

      <Link
        href={`/rooms/${room._id}`}
        className="
        inline-block

        bg-gradient-to-r

        from-indigo-500

        to-purple-600

        hover:from-indigo-600

        hover:to-purple-700

        text-white

        px-7

        py-3

        rounded-2xl

        font-bold

        text-lg

        shadow-lg

        hover:shadow-purple-500/40

        transition
        "
      >
        Book Room
      </Link>

    </div>
  );
}