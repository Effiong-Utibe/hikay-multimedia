import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Megaphone, Upload, Video, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Media Library',
    href: 'media',
  },
];
interface Media {
  id: number,
  title: string,
  tag: string,
  timestamps: string,
  description: string,
  file_path: string,// original file
  thumb_url?: string, // thumbnail or preview image
  can_delete?: boolean;
  can_update?: boolean;
  categories:string;
  category: string,
}
interface Props {
  flash: {
    message: string;
  }
  can: {
    create: boolean;
    delete: boolean;
    edit: boolean;
    update:boolean
  };
  media: Media[]
  filters: {
    category?: string;
  };
  [key: string]: any;
}
export default function Index({ media, filters, can}: Props) {
  const { flash } = usePage<Props>().props;
  const { categories } = usePage<Props>().props;


  const photoTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const videoTypes = ['mp4', 'webm', 'ogg'];
  const graphicTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const audioTypes = ['mp3'];

  const [openId, setOpenId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  //close dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => setOpenId(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const [preview, setPreview] = useState<{
    type: 'image' | 'video' | 'graphic' | 'audio';
    url: string
  } | null>(null)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreview(null);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);
  // const categories = ['All', 'Video', 'Photo', 'Graphic', 'Audio'];
  const { processing, delete: destroy } = useForm();
  const handleDelete = (id: number, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      destroy(`/admin/media/${id}`, {
        onSuccess: () => {
          router.reload();
        },
      });
    }
  };

  return (

    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Media Library" />
      <div className='overflow-x-auto rounded-lg p-4 space-y-6'>
        {/* header section*/}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center rounded-xl shadow-sm gap-4 bg-white dark:bg-slate-800 p-6">
          <div>
            <span className='text-3xl text-gray-900 dark:text-slate-200'>Media Library</span>
            <p className='text-muted-foreground'>Manage and organize all your media files</p>
          </div>
          <div>
            {can.create && (
              <Link href='/admin/media/create'>
                <Button className='gap-2 shadow-lg'>
                  <Upload size={18} />
                  Upload Media
                </Button>
              </Link>
            )}
          </div>
        </div>
        {flash.message && (
          <Alert>
            < Megaphone />
            <AlertTitle>Notification!</AlertTitle>
            <AlertDescription>
              {flash.message}
            </AlertDescription>
          </Alert>
        )}
        {/* category Tab */}
        {/* <div className="flex flex-wrap gap-2 ">
          {categories.map((tab) => (
            <Button
              variant={activeCategory === tab ? "default" : "outline"}
              key={tab}
              onClick={() => router.get('/admin/media', {
                category: tab === 'All' ? null : tab
              }, { preserveState: true })
              }>
              {tab}
            </Button>
          ))}
        </div> */}
        <div className="flex flex-wrap gap-2">
          {/* ALL */}
          <Button
            variant={!filters.category ? "default" : "outline"}
            onClick={() => router.get('/admin/media', {
              category: null
            }, { preserveState: true })}
          >
            All
          </Button>

          {/* DYNAMIC CATEGORIES */}
          {categories.map((cat: any) => (
            <Button
              key={cat.id}
              variant={filters.category === cat.name ? "default" : "outline"}
              onClick={() =>
                router.get('/admin/media', {
                  category: cat.name
                }, { preserveState: true })
              }
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {/* media grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {media.map((item) => {
            const fileUrl = item.file_path;
            const extension = item.file_path?.split('?')[0]?.split('.')?.pop()?.toLowerCase() || '';
            const thumbUrl = item.thumb_url ?? fileUrl;
            const isPhoto = photoTypes.includes(extension);
            const isVideo = videoTypes.includes(extension);
            const isGraphic = graphicTypes.includes(extension);
            const isAudio = audioTypes.includes(extension);
            return (
              <div key={item.id}
                className="group relative bg-white dark:bg-slate-800 break-inside-avoid rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* media preview container*/}
                <div className="relative aspect-video bg-gray-100 dark:bg-slate-800 border overflow-hidden">

                  {isPhoto ? (
                    <div>
                      <img src={fileUrl}
                        alt={item.title}
                        onClick={() => setPreview({ type: 'image', url: fileUrl })}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition"
                      />
                    </div>

                  ) : isVideo ? (
                    <div>
                      <video
                        src={thumbUrl}   // ✅ MUST be the real video
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition"
                        onClick={() => setPreview({ type: 'video', url: thumbUrl })}
                      />
                    </div>
                  ) : isGraphic ? (
                    <div>
                      <img
                        src={thumbUrl}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setPreview({ type: 'graphic', url: fileUrl })}
                      />
                    </div>
                      ) : isAudio ? (<div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-slate-700">

                        <Video className="size-10 text-gray-400 mb-2" />

                        <p className="text-xs text-gray-500 px-2 text-center truncate">
                          {item.title}
                        </p>

                        <button
                          onClick={() => setPreview({ type: 'audio', url: fileUrl })}
                          className="mt-2 text-xs font-medium text-blue-600 hover:underline"
                        >
                          Play Audio
                        </button>

                      </div>
                  ) :
                    (
                      <div className="p-6 text-center text-gray-400">
                        <p className="text-sm">No preview available</p>
                      </div>
                    )

                  }
                  <span className="absolute top-3 left-3  dark:bg-slate-800 bg-white/90 text-xs px-2 py-1 rounded font-semibold">
                    {item.category}
                  </span>

                </div>
                {/* Options Button */}
                <div className="absolute top-2 right-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenId(openId === item.id ? null : item.id);
                    }}
                  >
                    <EllipsisVertical size={16} />
                  </Button>
                </div>
                {/* TITLE + DESCRIPTION (bottom overlay) */}
                {/* Info Section */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 truncate mt-1">{item.description}</p>
                </div>
                {/* Dropdown menu for Edit/Delete */}
                {openId === item.id && (
                  <div
                    ref={menuRef}
                    className="absolute top-12 border right-2 bg-white rounded-lg shadow-xl  py-1 anim-fade-in z-50 w-32"
                  >
                    <div className="flex flex-col p-2 space-y-2">
                    {item.can_update &&(
                        <Button variant="outline" size="sm">
                        <Link href={`/admin/media/${item.id}/edit`}
                          className='flex items-center px-4 py-2 text-sm hover:bg-gray-50 text-gray-700'
                        >
                          Edit
                        </Link>
                      </Button>
                    )}
                      {item.can_delete &&(
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(item.id, item.title)}
                          disabled={processing}
                          size="sm"
                        >
                          Delete
                        </Button>
                    )}
                    </div>
                  </div>
                )}
              </div>

            );
          })}
          {/* frame */}
          <div>
            {/* Image Model */}
            {preview && (<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">

              {/* Close Button */}
              <button
                onClick={() => setPreview(null)}
                className="absolute top-6 right-6 text-white"
              >
                <X size={32} />
              </button>

              {/* Full Image */}
              {preview?.type === 'image' ? (
                <img
                  src={preview.url}
                  className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                />
              )
              //  graphic preview
               : preview?.type === 'graphic' ? (
                <img
                  src={preview.url}
                  className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                />
              )
              // video preview
                : preview?.type === 'video' ? (
                  <video src={preview.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-full object-contain rounded-lg" />
                ) :
                // audio prview
                 preview?.type === 'audio' ? (
                      <audio
                        src={preview.url}
                        controls
                        autoPlay
                        className="w-full max-w-md"
                      />
              ) :
                media.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500">
                  <p>No media found</p>
                </div>
              )
              }

            </div>
            )
            }

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
