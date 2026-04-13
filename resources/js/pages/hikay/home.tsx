import SkeletonCard from '@/components/skeleton/skeleton-card'
import StatsSection from '@/components/stats/statscard'
import { Button } from '@/components/ui/button'
import FrontEndLayout from '@/layouts/app/front-end-layout'
import { Link, usePage } from '@inertiajs/react'
import { AudioLines, Briefcase, Camera, Palette, Printer, Share2, TvMinimalPlay, UsersRound, Video, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold]);

  return { ref, inView };
}

interface Media {
  id: number,
  title: string,
  tag: string,
  timestamps: string,
  description: string,
  file_path: string,// original file
  thumb_url?: string, // thumbnail or preview image
}
interface Props {

  media: Media[]
  filters: {
    category?: string;
  };
  [key: string]: any;
}
export default function Home({ media, filters }: Props) {

  const photoTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const videoTypes = ['mp4', 'webm', 'ogg'];
  const graphicTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const audioTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [heroImagesLoaded, setHeroImagesLoaded] = useState<Record<string, boolean>>({});

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (media) {
      const t = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(t);
    }
  }, [media]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

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
  const { auth } = usePage().props as any;
  const user = auth?.user;
  const handlePreview = (type: 'image' | 'video' | 'graphic' | 'audio', url: string) => {
    if (!user) {
      window.location.href = '/login'; // redirect if not logged in
      return;
    }

    setPreview({ type, url });
  };
  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: serviceRef, inView: serviceInView } = useInView();
  const { ref: portfolioRef, inView: portfolioInView } = useInView();
  return (
    <FrontEndLayout >
      <div className=" overflow-x-hidden space-y-15 ">
        {/* hero section */}

        <div
          ref={heroRef}
          className={`transition-all duration-700 ease-out transform ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {/* Hero content here */}

        </div>
        <div className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <div className='px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16'>
            <div className='flex flex-col justify-center space-y-8'>
              {loading ? (
                <div className="h-6 w-40 shimmer rounded-full" />
              ) : (
                <span className='w-fit border-2 border-blue-300 rounded-2xl bg-blue-200 text-blue-600 px-4 py-1 text-sm font-semibold'>
                  Your Creative Partner
                </span>
              )}
              {loading ? (
                <div className="space-y-3">
                  <div className="h-10 w-3/4 shimmer rounded" />
                  <div className="h-10 w-1/2 shimmer rounded" />
                </div>
              ) : (
                <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight'>
                  Bring Your <br />
                  <span className='bg-linear-to-tr from-[#3B5CCB] via-[#3F8FD1] to-[#2EC4B6] bg-clip-text text-transparent'>
                    Ideas to Life
                  </span>
                </h1>
              )}
              {loading ? (
                <div className="space-y-2">
                  <div className="h-4 w-full shimmer rounded" />
                  <div className="h-4 w-5/6 shimmer rounded" />
                </div>
              ) : (
                <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-xl'>
                  Professional multimedia production services for video, audio,
                  photography, and digital content. Transform your vision into reality.
                </p>
              )}
              <div className='flex flex-col sm:flex-row gap-4'>
                {loading ? (
                  <>
                    <div className="h-12 w-full sm:w-40 shimmer rounded-lg" />
                    <div className="h-12 w-full sm:w-40 shimmer rounded-lg" />
                  </>
                ) : (
                  <>
                    <Button className='h-10 sm:h-12 w-full sm:w-48 text-sm sm:text-base'>
                      <Link href='/service'>Get started</Link>
                    </Button>
                    <Button className='h-10 sm:h-12 w-full sm:w-48 text-sm sm:text-base'>
                      <Link href='/about'>Learn More</Link>
                    </Button>
                  </>
                )}
              </div>
              <hr className="border-gray-200" />

              {/* stats section */}
              <div className='flex flex-wrap gap-6 sm:gap-10'>

                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-6 w-16 shimmer rounded" />
                      <div className="h-3 w-24 shimmer rounded" />
                    </div>
                  ))
                  : (
                    <>
                      < StatsSection />
                    </>
                  )
                }

              </div>
            </div>

            {/* right image grid */}
            <div className='space-y-6'>

              {/* MAIN IMAGE */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl">

                {/* Shimmer */}
                {!heroLoaded && (
                  <div className="absolute inset-0 shimmer rounded-2xl" />
                )}

                {/* Image */}
                <img
                  src="/images/image3.jpg"
                  loading="lazy"
                  alt="Featured Work"
                  onLoad={() => setHeroLoaded(true)}
                  className={`w-full h-full object-cover transition-all duration-700 ${heroLoaded
                    ? 'opacity-100 scale-100 blur-0'
                    : 'opacity-0 scale-105 blur-sm'
                    }`}
                />
              </div>

              {/* SMALL IMAGES */}
              <div className='grid grid-cols-2 gap-4'>
                {["image2.jpg", "image1.jpg"].map((img) => (
                  <div
                    key={img}
                    className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden rounded-2xl"
                  >

                    {/* Shimmer */}
                    {!heroImagesLoaded[img] && (
                      <div className="absolute inset-0 shimmer rounded-2xl" />
                    )}

                    {/* Image */}
                    <img
                      src={`/images/${img}`}
                      alt="Gallery"
                      onLoad={() =>
                        setHeroImagesLoaded((prev) => ({
                          ...prev,
                          [img]: true,
                        }))
                      }
                      className={`w-full h-full object-cover transition-all duration-700 ${heroImagesLoaded[img]
                        ? 'opacity-100 scale-100 blur-0'
                        : 'opacity-0 scale-105 blur-sm'
                        }`}
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>


        {/* service section */}
        <div
          ref={serviceRef}
          className={`transition-all duration-700 ease-out transform ${serviceInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {/* service content here */}
          <div className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-gray-200 py-20 dark:bg-slate-900">
              <div className='max-w-7xl mx-auto px-8'>
                {loading ? (
                  <div className="text-center space-y-6 mb-16">
                    <div className="h-6 w-32 mx-auto shimmer rounded-full" />

                    <div className="space-y-4">
                      <div className="h-8 w-2/3 mx-auto shimmer rounded" />
                      <div className="h-4 w-1/2 mx-auto shimmer rounded" />
                    </div>
                  </div>
                ) : (
                  <div className='text-center flex-col items-center space-y-6 mb-16'>
                    <span className='w-fit mx-auto border-2 border-blue-300 rounded-2xl bg-blue-200 text-blue-600 px-4 py-1 text-sm font-semibold mb-6'>
                      Our Service
                    </span>

                    <div className='m-10 space-y-4'>
                      <h1 className='text-4xl md:text-5xl text-gray-900 dark:text-slate-50'>
                        Complete Multimedia Solutions
                      </h1>

                      <p className='text-xl text-gray-600 mx-auto max-w-2xl'>
                        From concept to completion, we offer comprehensive services to bring your creative vision to life
                      </p>
                    </div>
                  </div>
                )}

                {/* Services Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'>
                  {loading
                    ? Array.from({ length: 8 }).map((_, i) => (
                      <ServiceSkeleton key={i} />
                    ))
                    : [
                      { title: 'Video Production', desc: 'High-quality filming and professional editing.', icon: Video },
                      { title: 'Audio Production', desc: 'Crystal clear sound design and voiceovers.', icon: AudioLines },
                      { title: 'Photography', desc: 'Stunning visual storytelling through the lens.', icon: Camera },
                      { title: 'Graphic Design', desc: 'Creative visual identity and branding solutions.', icon: Palette },
                      { title: 'Digital Media', desc: 'Engaging social content and digital marketing assets.', icon: Share2 },
                      { title: 'Printing Service', desc: 'High-quality physical prints and marketing materials.', icon: Printer },
                      { title: 'Equipment & Studio', desc: 'Professional studio spaces and gear rentals.', icon: Briefcase },
                      { title: 'Consultancy', desc: 'Expert training and media strategy development.', icon: UsersRound },
                    ].map((service, index) => (
                      <div
                        key={index}
                        className='flex flex-col bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-transparent hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300'
                      >
                        <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-6 flex items-center justify-center text-blue-600 dark:text-blue-400'>
                          <service.icon className="w-6 h-6" />
                        </div>
                        <h3 className='text-lg sm:text-xl font-bold mb-3 dark:text-white'>
                          {service.title}
                        </h3>
                        <p className='text-sm sm:text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-grow'>
                          {service.desc}
                        </p>
                        <div className='mt-auto'>
                          <Link
                            href='/service'
                            className='text-blue-600 font-medium hover:underline flex items-center gap-1'
                          >
                            View More...
                          </Link>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* featured section */}
        <div
          ref={portfolioRef}
          className={`transition-all duration-700 ease-out transform ${portfolioInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          {/* feature content here */}
          <div className='max-w-7xl mx-auto px-8'>
            <div className='text-center flex-col items-center space-y-6 mb-16'>
              <span className='w-fit mx-auto border-2 border-blue-300 rounded-2xl bg-blue-200 text-blue-600 px-4 py-1 text-sm font-semibold mb-6'>
                Portfolio
              </span>
              <div>
                <div className='m-10 space-y-4 transition-all duration-300'>
                  <h1 className='text-4xl md:text-5xl text-slate-900  dark:text-slate-50'>
                    Featured Work
                  </h1>
                  <p className='text-xl text-muted-foreground mx-auto max-w-2xl' >
                    Explore our latest projects and see how we've helped clients achieve their creative goals
                  </p>

                </div>
                {/* media grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

                  {loading
                    ? Array.from({ length: 6 }).map((_, i) => (
                      <SkeletonCard key={i} />
                    ))
                    : media.map((item) => {
                      const fileUrl = item.file_path;
                      const extension = item.file_path?.split('?')[0]?.split('.')?.pop()?.toLowerCase() || '';
                      const thumbUrl = item.thumb_url ?? fileUrl;

                      const isPhoto = photoTypes.includes(extension);
                      const isVideo = videoTypes.includes(extension);
                      const isGraphic = graphicTypes.includes(extension);
                      const isAudio = audioTypes.includes(extension);

                      return (
                        <div
                          key={item.id}
                          className="group relative bg-white dark:bg-slate-900 rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition"
                        >
                          <div className="relative aspect-video bg-gray-100 dark:bg-slate-800 overflow-hidden">

                            <div className="relative w-full h-full">

                              {!loadedImages[item.id] && (
                                <div className="absolute inset-0 shimmer" />
                              )}

                              {isPhoto && (
                                <img
                                  src={fileUrl}
                                  loading="lazy"
                                  onLoad={() =>
                                    setLoadedImages(prev => ({ ...prev, [item.id]: true }))
                                  }
                                  onClick={() => handlePreview('image', fileUrl)}
                                  className={`w-full h-full object-cover cursor-pointer transition-all duration-700 ${loadedImages[item.id]
                                    ? 'opacity-100 scale-100 blur-0'
                                    : 'opacity-0 scale-105 blur-sm'
                                    }`}
                                />
                              )}

                              {isVideo && (
                                <video
                                  src={thumbUrl}
                                  muted
                                  playsInline
                                  onLoadedData={() =>
                                    setLoadedImages(prev => ({ ...prev, [item.id]: true }))
                                  }
                                  onClick={() => handlePreview('video', fileUrl)}
                                  className={`w-full h-full object-cover cursor-pointer transition-all duration-700 ${loadedImages[item.id]
                                    ? 'opacity-100 scale-100 blur-0'
                                    : 'opacity-0 scale-105 blur-sm'
                                    }`}
                                />
                              )}

                              {isGraphic && (
                                <img
                                  src={thumbUrl}
                                  loading="lazy"
                                  onLoad={() =>
                                    setLoadedImages(prev => ({ ...prev, [item.id]: true }))
                                  }
                                  onClick={() => handlePreview('graphic', fileUrl)}
                                  className={`w-full h-full object-cover cursor-pointer transition-all duration-700 ${loadedImages[item.id]
                                    ? 'opacity-100 scale-100 blur-0'
                                    : 'opacity-0 scale-105 blur-sm'
                                    }`}
                                />
                              )}
                              {isAudio && (
                                <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-slate-700">

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
                                )}

                              </div>

                              <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900 text-xs px-2 py-1 rounded font-semibold">
                                {item.tag}
                              </span>
                            </div>

                            <div className="p-4">
                              <h3 className="font-bold text-sm sm:text-base truncate">{item.title}</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground truncate mt-1">{item.description}</p>
                            </div>
                          </div>
                          );
                      })}
                        </div>

                  {
                        user && (<div>
                          {/* preview */}
                          {/* Image Model */}
                          {preview && (
                            <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">

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
                                  loading="lazy"
                                  className="w-full max-w-3xl max-h-[85vh] object-contain rounded-lg"
                                />
                              ) : preview?.type === 'graphic' ? (
                                <img
                                  loading="lazy"
                                  src={preview.url}
                                  className="w-full max-w-3xl max-h-[85vh] object-contain rounded-lg"
                                />
                              )
                                : preview?.type === 'video' ? (
                                  <video src={preview.url}
                                    controls
                                    autoPlay
                                    className="w-full max-w-3xl max-h-[85vh] object-contain rounded-lg" />
                                ) :
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
                        </div>)
                      }
                      <Button className='mt-10 p-7'>
                        <Link href='/portfolio'> View full Portfolio</Link>
                      </Button>
                </div>
              </div>
            </div>
          </div>


        </div>
    </FrontEndLayout>
  )
  function ServiceSkeleton() {
    return (
      <div className="flex flex-col bg-white dark:bg-slate-800 p-8 rounded-3xl border shadow-sm space-y-6">

        {/* Icon */}
        <div className="w-12 h-12 shimmer rounded-xl" />

        {/* Title */}
        <div className="h-5 w-2/3 shimmer rounded" />

        {/* Description */}
        <div className="space-y-2 flex-grow">
          <div className="h-3 w-full shimmer rounded" />
          <div className="h-3 w-5/6 shimmer rounded" />
        </div>

        {/* Button */}
        <div className="h-4 w-24 shimmer rounded mt-auto" />

      </div>
    );
  }
}
