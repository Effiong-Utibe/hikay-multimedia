import React from 'react'
  import { BreadcrumbItem } from '@/types/navigation'
import { App, Head, usePage } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Clock3, Eye, FileImage, User } from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Analytics',
    href: '/analytics',
  },
]
interface Props {
  monthlyStats: Record<string, number[]>
  totals: {
    photo: number
    video: number
    graphic: number
    Audio: number
    total_views: number
    active_users:number
    avg_activity:number
    total_users:number
  }
  [key: string]: any
}
export default function analytics() {

  const { monthlyStats, totals } = usePage<Props>().props;

  const totalMedia = totals.photo + totals.video + totals.graphic + totals.Audio;
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Analytics"/>
      <div className='overflow-x-auto rounded-lg p-4'>
        <h1 className="text-4xl font-bold"> Media Analytics</h1>
        <span>Get insights into your media library's performance and trends.</span>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* total view */}
         <StatCard
                    title="Total User"
            value={totals.total_users}
                    icon={<Eye className="text-emerald-600" size={28} />}
                    bgColor="bg-emerald-50 dark:bg-emerald-900/20"
                  />
          {/* <div>
                  {/* average  view */}

          <StatCard
            title="Average User"
            value={totals.avg_activity}
            icon={<User className="text-emerald-600" size={28} />}
            bgColor="bg-emerald-50 dark:bg-emerald-900/20"
          />
          {/* total media */}
          <StatCard
            title="Total Media"
            value={totalMedia}
            icon={<Clock3 className="text-emerald-600" size={28} />}
            bgColor="bg-emerald-50 dark:bg-emerald-900/20"
          />
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

