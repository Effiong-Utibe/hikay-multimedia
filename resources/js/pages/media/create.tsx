import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircleIcon, Upload } from 'lucide-react';
import { ReactFormState } from 'react-dom/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'upload media',
    href: 'media/create',
  },
];
type Category = {
  id: number;
  name: string;
};

export default function create({ categories }: { categories: Category[] }) {
  const { media, can } = usePage().props as any;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAudio, setIsAudio] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    tag: '',
    category_id: '' as number | '',
    file_path: null as File | null,
    thumb: null as File | null
  });
  function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // ✅ enforce thumbnail for audio
    if (isAudio && !data.thumb) {
      alert("Thumbnail is required for audio");
      return;
    }
    post('/admin/media', {
      onSuccess: () => {
        setFile(null);
        setPreview(null);
        setIsAudio(false);
        setData({
          title: '',
          description: '',
          tag: '',
          category_id: '' as number | '',
          file_path: null as File | null,
          thumb: null as File | null
        });
      }
    });
  }
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {

      // Handle the selected file here (e.g., upload it to the server, display a preview, etc.)
      setFile(selectedFile);

      // add file to Inertia form
      setData('file_path', selectedFile);

      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      if (selectedFile.type.startsWith('audio/')) {
        setIsAudio(true);
      } else {
        setIsAudio(false);
        setData('thumb', null);
      }
    }

  };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="upload media" />
      <div className="overflow-x-auto max-auto rounded-lg p-6">
        <div className='mb-8'>
          <h1 className='text-3xl font-bold'> Upload Media</h1>
          <span className='text-muted-foreground'>Upload Images, Graphics and Videos</span>
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertTitle>Errors</AlertTitle>
            <AlertDescription>
              <ul>
                {Object.entries(errors).map(([key, message]) => (
                  <li key={key}>{message as string}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={submit} className="space-y-6">
          <div
            onClick={handleClick}
            className={cn(
              "relative group border-2 border-dashed rounded-2xl p-10 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[300px]",
              preview ? "border-blue-400 bg-blue-50/30" : "border-gray-200 hover:border-blue-400 hover:bg-gray-50 dark:bg-slate-800"
            )}>
            {/* hidden file Input */}
            <Input
              type='file'
              name='file_path'
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className='relative w-full flex flex-col items-center'>
              {/* thumbnail uploaded */}
              {data.thumb && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(data.thumb)}
                    className="h-52 mx-auto rounded-lg"
                  />
                </div>

              )}
              {
                preview ?
                  (file?.type.startsWith('image/') ?
                    (<div className="text-center">
                      <p className="mb-2 text-sm text-muted-foreground"> selected</p>
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-52 object-contain mx-auto"
                      />
                    </div>

                    ) : file?.type.startsWith('video/') ? (
                      <div className="text-center">
                        <p className="mb-2 text-sm text-muted-foreground">video selected</p>
                        <video src={preview} controls className='h-52 mx-auto' />
                      </div>

                    ) : file?.type.startsWith('audio/') ? (
                      <div className="text-center">
                          <p className="mb-2 text-sm text-muted-foreground">Audio selected</p>
                        <audio controls src={preview} className="mx-auto" />
                      </div>
                    ) : (
                      <p>preview not available</p>
                    )) : (

                    <div className='text-center space-y-4'>
                      <div className="p-4 text-muted-foreground rounded-full inline-block text-blue-600 group-hover:scale-110 transition-transform">
                        <Upload size={32} />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG, MP4 or WEBM (Max. 50MB)</p>
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                      >
                        Select file
                      </Button>
                    </div>
                  )}
            </div>
          </div>
          {/* input fields for title, description, tags and type of media */}
          <div className='bg-white dark:bg-slate-800 p-8 rounded-2xl border shadow-sm space-y-6'>
            <div>
              {/* audio thumnail */}
              {isAudio && (
                <div className="mt-6 space-y-3">
                  <Label>Upload Thumbnail (for audio)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    name='thumb'
                    onChange={(e) => {
                      const thumbFile = e.target.files?.[0];
                      if (thumbFile) {
                        setData('thumb', thumbFile);
                      }
                    }}
                  />
                </div>
              )}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
              <div className='space-y-2'>
                {/* label for title */}
                <Label htmlFor="title">Title:</Label>
                <Input
                  value={data.title}
                  onChange={e => setData('title', e.target.value)}
                  type='text'
                  name='title'
                  placeholder='Enter title'
                  className='w-50 mt-2'
                />
              </div>
              <div>
                {/* label for type */}
                <select
                  value={data.category_id}
                  onChange={e => setData('category_id', Number(e.target.value))}
                  name="category_id"
                  id="category_id"
                  className="w-50 border-2 mt-6 border-line rounded-sm p-2  dark:bg-slate-800"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='mt-5'>
              {/* label for description */}
              <Label htmlFor="description">Description:</Label>
              <Input
                onChange={e => setData('description', e.target.value)}
                value={data.description}
                type='text'
                name='description'
                placeholder='Enter description'
                className='w-full mt-2'
              />
            </div>
            {/* label for tags */}
            <div className='mt-5'>
              <Label htmlFor="tags">Tags:</Label>
              <Input
                value={data.tag}
                onChange={e => setData('tag', e.target.value)}
                type='text'
                name='tag'
                placeholder='Enter tags'
                className='w-full mt-2'
              />
            </div>
            <div className='mt-10 flex justify-end'>
              <Button variant="outline" className="mr-2"><Link href='admin/media' >Cancel</Link></Button>
                <Button variant="default" disabled={processing} type='submit'>Upload</Button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
