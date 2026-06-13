import Link from "next/link";

export default function Navbar() {
  return (
  <nav className="
bg-black/80
backdrop-blur-lg
border-b
border-gray-800
sticky
top-0
z-50
shadow-lg
">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          href="/"
          className="text-indigo-400 text-4xl font-bold"
        >
          🏢 RoomIt
        </Link>

        <div className="flex items-center gap-4">
          <Link
  href="/"
  className="
  px-5
  py-2

  rounded-xl

  text-gray-300

  hover:text-white

  hover:bg-slate-800

  transition

  duration-300

  font-semibold
  "
>
  Rooms
</Link>

<Link
  href="/bookings"
  className="
  px-5
  py-2

  rounded-xl

  text-gray-300

  hover:text-white

  hover:bg-slate-800

  transition

  duration-300

  font-semibold
  "
>
  My Bookings
</Link>
        </div>

      </div>
    </nav>
  );
}