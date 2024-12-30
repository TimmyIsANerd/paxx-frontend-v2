import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";

export function StatsCard({ title, value, change, Icon }) {
  const isPositive = change > 0;

  return (
    <div className="bg-[#0B1739] rounded-lg p-4 flex flex-col border-[#343B4F] border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400">
          <Icon className="w-5 h-5" />
          <span className="text-sm">{title}</span>
        </div>
        <button className="text-gray-400 hover:text-white">
          <EllipsisHorizontalIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span
          className={`flex items-center text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {/* {isPositive ? (
            <ArrowUpIcon className="w-4 h-4" />
          ) : (
            <ArrowDownIcon className="w-4 h-4" />
          )} */}
          {/* {Math.abs(change)}% */}
        </span>
      </div>
    </div>
  );
}
