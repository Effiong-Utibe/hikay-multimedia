import {Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Megaphone, Upload, Video, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import FrontEndLayout from '@/layouts/app/front-end-layout';

interface Media {
  id: number,
  title: string,
  tag: string,
  timestamps: string,
  description: string,
  file_path: string,// original file
  thumb_url?: string, // thumbnail or preview image
  category_id:number,
  categories:string
}
interface Category {
  id: number;
  name: string;
};
interface Props {
  flash: {
    message: string;
  }
  media: Media[]
  categories: Category[];
  filters: {
    category?: string;
  };
  [key: string]: any;
}
export default function Index({ media, filters, categories }: Props) {
  const photoTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const videoTypes = ['mp4', 'webm', 'ogg'];
  const graphicTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openId, setOpenId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  //close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [preview, setPreview] = useState<{
    type: 'image' | 'video' | 'graphic';
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
  const categoryTabs = [
    { id:0, name: 'All' },
    ...categories,
  ];


  const filteredMedia = media.filter((item) => {
    if (activeCategory === 0) return true;
    return item.category_id === activeCategory;
  });
  return (

    <FrontEndLayout>
      <div className='overflow-x-auto rounded-lg p-4 space-y-15'>
        {/* header section*/}
       <div className='m-8'>
          <h1 className='text-2xl'>Projects</h1>
          <p className='text-muted-foreground'>showcasing creative project</p>
       </div>
        {/* category Tab */}
        <div className='m-5 md:m-10 space-y-4 '>
          <div className="flex gap-2">
            {categoryTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeCategory === tab.id ? "default" : "outline"}
                onClick={() => setActiveCategory(tab.id)}
                className='w-15 text-sm'
              >
                {tab.name}
              </Button>
            ))}
          </div>
          <div className='m-5 md:m-10 space-y-4 '>
              <hr/>
          </div>

        </div>


        {/* media grid */}
        <div className='m-5 md:m-10  space-y-4'>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((item) => {
              const fileUrl = item.file_path;
              const extension = item.file_path?.split('?')[0]?.split('.')?.pop()?.toLowerCase() || '';
              const thumbUrl = item.thumb_url ?? fileUrl;
              const isPhoto = photoTypes.includes(extension);
              const isVideo = videoTypes.includes(extension);
              const isGraphic = graphicTypes.includes(extension);
              return (
                <div key={item.id}
                  className="group relative bg-white dark:bg-slate-800 break-inside-avoid rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* media preview container*/}
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">

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
                          src={fileUrl}   // ✅ MUST be the real video
                          controls
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition"
                          onClick={() => setPreview({ type: 'video', url: fileUrl })}
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
                    ) : (
                      <div className="p-6 text-center text-gray-400">
                        <p className="text-sm">No preview available</p>
                      </div>
                    )

                    }
                    <span className="absolute top-3 left-3 dark:bg-slate-900 bg-white/90 text-xs px-2 py-1 rounded font-semibold">
                      {categories.find(c => c.id === item.category_id)?.name}
                    </span>
                  </div>
                  {/* Options Button */}

                  {/* TITLE + DESCRIPTION (bottom overlay) */}
                  {/* Info Section */}
                  <div className="p-4  dark:bg-slate-900">
                    <h3 className="font-bold text-muted-foreground truncate">{item.title}</h3>
                    <p className="text-xs text-gray-500 truncate mt-1">{item.description}</p>
                  </div>
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
                ) : preview?.type === 'graphic' ? (
                  <img
                    src={preview.url}
                    className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                  />
                )
                  : preview?.type === 'video' ? (
                    <video src={preview.url}
                      controls
                      autoPlay
                      className="max-w-full max-h-full object-contain rounded-lg" />
                  ) : null
                }

              </div>
              )
              }
            </div>
          </div>
          </div>
      </div>
    </FrontEndLayout>
  );
}
