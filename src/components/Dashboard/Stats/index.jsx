import {
  HomeIcon,
  CreditCardIcon,
  BanknotesIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { StatsCard } from "./stats-card";

const statsData = [
  {
    title: "Pageviews",
    value: "50.8K",
    change: 28.4,
    Icon: HomeIcon,
  },
  {
    title: "Monthly users",
    value: "23.6K",
    change: -12.6,
    Icon: CreditCardIcon,
  },
  {
    title: "New sign ups",
    value: "756",
    change: 3.1,
    Icon: BanknotesIcon,
  },
  {
    title: "Subscriptions",
    value: "2.3K",
    change: 11.3,
    Icon: ShoppingBagIcon,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          Icon={stat.Icon}
        />
      ))}
    </div>
  );
}
