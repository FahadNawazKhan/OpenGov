import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { compressImage, fileToBase64 } from '@/utils/imageCompression';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload = ({ onImagesChange, maxImages = 5 }: ImageUploadProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + images.length > maxImages) {
      toast({
        title: 'Too many images',
        description: `Maximum ${maxImages} images allowed`,
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    try {
      const compressedImages = await Promise.all(
        files.map(async (file) => {
          const compressed = await compressImage(file);
          return await fileToBase64(compressed);
        })
      );

      const newImages = [...images, ...compressedImages];
      setImages(newImages);
      onImagesChange(newImages);
      
      toast({
        title: 'Images uploaded',
        description: `${files.length} image(s) added successfully`,
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload images',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading || images.length >= maxImages}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={loading || images.length >= maxImages}
        >
          <Upload className="w-4 h-4 mr-2" />
          {loading ? 'Uploading...' : 'Upload Images'}
        </Button>
        <span className="text-sm text-muted-foreground">
          {images.length}/{maxImages}
        </span>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
