import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { BarChart3, Eye, FileImage, FileVideo, LineChartIcon } from 'lucide-react';
import MediaBarChart from '@/components/charts/BarChart';
import TotalViewsChart from '@/components/charts/LineChart';
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
  },
];
interface Props {
  monthlyStats: Record<string, number[]>
  totals: {
    photo: number
    video: number
    graphic: number
    audio: number
    total_views: number
  }
  [key: string]: any
}

export default function Dashboard() {
  const { monthlyStats, totals } = usePage<Props>().props;
  const safeStats = {
    Photo: monthlyStats.Photo || Array(12).fill(0),
    Video: monthlyStats.Video || Array(12).fill(0),
    Graphic: monthlyStats.Graphic || Array(12).fill(0),
    Audio: monthlyStats.Audio || Array(12).fill(0),
    views: monthlyStats.views || Array(12).fill(0),
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className='overflow-x-auto rounded-lg p-6 space-y-8'>
        {/* welcome header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-200"> Dashboard Overview</h1>
          <p className="text-muted-foreground ">Welcome back! Here's what's happening with your media library.</p>
        </div>
        {/* top stat Row */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* photo */}
          <StatCard
            title="Total Photos"
            value={totals.photo}
            icon={<FileImage className="text-blue-600" size={28} />}
            bgColor="bg-blue-50 dark:bg-blue-900/20"
          />

          {/* video */}
          <StatCard
            title="Total Videos"
            value={totals.video}
            icon={<FileVideo className="text-purple-600" size={28} />}
            bgColor="bg-purple-50 dark:bg-purple-900/20"
          />
          {/* graphic */}
          <StatCard
            title="Total Graphics"
            value={totals.graphic}
            icon={<FileImage className="text-emerald-600" size={28} />}
            bgColor="bg-emerald-50 dark:bg-emerald-900/20"
          />
          <StatCard
            title="Total Audio"
            value={totals.audio}
            icon={<FileImage className="text-emerald-600" size={28} />}
            bgColor="bg-emerald-50 dark:bg-emerald-900/20"
          />
        </div>

        {/* Secondary Stats & Placeholders */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full h-40 rounded-lg border bg-white dark:bg-slate-900 ">
            <h1 className="text-sm p-4 font-semibold muted-foreground">Total views</h1>
            <div className='flex justify-around items-center'>
              <span className="text-xl font-semibold">{totals.total_views}</span>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Eye className="text-orange-600" size={32} />
              </div>
            </div>
          </div>

          {/* user activity can be implemented later when we have user accounts and activity tracking in place */}
          <div className="w-full h-40 rounded-lg border bg-white dark:bg-slate-900 ">
            <h1 className="text-sm p-4 font-semibold muted-foreground">User Activity</h1>
            <div className='flex justify-around items-center'>
              <span className="text-xl font-semibold">{totals.graphic}</span>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Eye className="text-orange-600" size={32} />
              </div>
            </div>
          </div>

          {/* views and user activity can be implemented later when we have user accounts and view tracking in place */}
          <div className="rounded-xl border bg-white p-6 dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <LineChartIcon size={20} className="text-muted-foreground" />
              <h3 className="text-sm font-semibold">View Trends</h3>
            </div>
            <div className="h-[300px] w-full">

              {/* Pass your views data array here */}
              {/* <TotalViewsChart data={monthlyStats.views || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]} /> */}
              {/* <MediaBarChart monthlyStats={safeStats} /> */}
              <TotalViewsChart data={safeStats.views} />
            </div>
          </div>

          {/* total number of media uploaded each month for the past year, broken down by category (photo, video, graphic) */}
          <div className="rounded-xl border bg-white p-6 dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 size={20} className="text-muted-foreground" />
              <h3 className="text-sm font-semibold">Upload Statistics</h3>
            </div>
            <div className="h-[300px] w-full">
              <MediaBarChart monthlyStats={monthlyStats} />
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
  function StatCard({ title, value, icon, bgColor }: { title: string, value: number, icon: React.ReactNode, bgColor: string }) {
    return (
      <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold mt-1 dark:text-white">{value.toLocaleString()}</p>
        </div>
        <div className={`p-4 rounded-xl ${bgColor}`}>
          {icon}
        </div>
      </div>
    );
  }
}
