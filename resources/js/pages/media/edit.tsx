import { Head,useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Label } from '@/components/ui/label';
import { useRef, useState,useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircleIcon, Upload } from 'lucide-react';
import { ReactFormState } from 'react-dom/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Edit media',
    href: '/media/edit',
  },
];
type Category = {
  id: number;
  name: string;
};

type Medium = {
  id: number;
  title: string;
  description: string;
  tag: string;
  category_id: number;
};

export default function Edit({ categories, medium }: { categories: Category[]; medium: Medium }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string| null>(null);
  const { data, setData, put, processing, errors } = useForm({
    title: medium.title,
    description: medium.description,
    tag: medium.tag,
    category_id: medium.category_id,
    file_path: null as File | null,
  });

  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    put(`/media/${medium.id}`, {
      forceFormData: true
    });
  };

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
    }
  };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="upload media" />
      <div className="overflow-x-auto rounded-lg p-4">
        <div className='text-4xl font-extrabold'> Upload Media</div>
        <span className='text-lg'>Upload Images, Graphics and Videos</span>

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
        <form onSubmit={handleUpdate}>
          <div
            onClick={handleClick}
          className="bg-white rounded-2xl border-2 border-line p-10 text-center justify-center mt-3 items-center text-center cursor-pointer h-65">
            {/* hidden file Input */}
            <Input
              type='file'
              name='file_path'
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
                    />
            <div className='flex flex-col items-center space-y-3'>
              {
                preview ?
                  (file?.type.startsWith('image/') ?
                    (<img
                      src={preview}
                      alt="Preview"
                      className="h-52 object-contain mx-auto"
                    />
                    ) : file?.type.startsWith('video/') ? (
                      <video
                      src={preview}
                        controls
                        className='h-52 mx-auto'
                      />
                    ) : (
                      <p>preview not available</p>
                    )) : (
                    <div className='flex flex-col justify-center items-center space-y-3'>
                      <Upload className="w-10 h-10 text-gray-400" />
                      <p className="text-gray-600"> Drop files here or click to browse </p>
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
          <div className='bg-white mt-10 rounded-2xl border-2 border-line p-5  justify-center items-center cursor-pointer'>
            <div className='flex flex-row gap-50 items-center '>
              <div>
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
                  className="w-50 border-2 mt-6 border-line rounded-sm p-2"
                >
                  <option value="">Select Category</option>
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
                <Button variant="outline" className="mr-2">Cancel</Button>
                <Button variant="default" disabled={processing} type='submit'>Upload</Button>
                </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
