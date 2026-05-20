import Link from "next/link";
import { FaPaw, FaPlus, FaClipboardList } from "react-icons/fa";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pt-5">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-neutral-950 tracking-tight">
          Dashboard
        </h1>
        <div className="w-12 h-1 bg-neutral-950 rounded-full"></div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/my-listings"
          className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
            <FaPaw size={14} />
          </div>
          <h3 className="text-sm font-black text-neutral-950">My Listings</h3>
          <p className="text-xs text-neutral-400 font-medium">
            Manage your pet listings
          </p>
        </Link>

        <Link
          href="/dashboard/add-pet"
          className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
            <FaPlus size={14} />
          </div>
          <h3 className="text-sm font-black text-neutral-950">Add Pet</h3>
          <p className="text-xs text-neutral-400 font-medium">
            List a new pet for adoption
          </p>
        </Link>

        <Link
          href="/dashboard/my-requests"
          className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center">
            <FaClipboardList size={14} />
          </div>
          <h3 className="text-sm font-black text-neutral-950">My Requests</h3>
          <p className="text-xs text-neutral-400 font-medium">
            Track your adoption requests
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
