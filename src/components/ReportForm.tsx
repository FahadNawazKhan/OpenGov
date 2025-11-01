
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ReportCategory, Report } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Send, Camera, Map, Save } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import LocationPicker from '@/components/LocationPicker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReportFormProps {
  onSuccess: () => void;
  reportToEdit?: Report;
}

const ReportForm = ({ onSuccess, reportToEdit }: ReportFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ReportCategory>('infrastructure');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [images, setImages] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const isEditMode = !!reportToEdit;

  useEffect(() => {
    if (isEditMode) {
      setTitle(reportToEdit.title);
      setDescription(reportToEdit.description);
      setCategory(reportToEdit.category);
      setLocation(reportToEdit.location);
      setLatitude(reportToEdit.latitude);
      setLongitude(reportToEdit.longitude);
      setImages(reportToEdit.images || []);
      setIsPublic(reportToEdit.isPublic || true);
    }
  }, [reportToEdit, isEditMode]);

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocation(address);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingReports = JSON.parse(localStorage.getItem('opengov_reports') || '[]') as Report[];

      if (isEditMode) {
        const updatedReports = existingReports.map(report => 
          report.id === reportToEdit.id 
            ? { ...report, title, description, category, location, latitude, longitude, images, isPublic, updatedAt: new Date().toISOString() } 
            : report
        );
        localStorage.setItem('opengov_reports', JSON.stringify(updatedReports));
        toast({
          title: t('reportForm.updateSuccessTitle'),
          description: t('reportForm.updateSuccessDescription'),
        });
      } else {
        const newReport: Report = {
          id: Math.random().toString(36).substring(7),
          title,
          description,
          category,
          status: 'pending',
          location,
          latitude,
          longitude,
          images: images.length > 0 ? images : undefined,
          citizenId: user!.id,
          citizenName: user!.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isPublic,
        };
        existingReports.push(newReport);
        localStorage.setItem('opengov_reports', JSON.stringify(existingReports));
        toast({
          title: t('reportForm.submitSuccessTitle'),
          description: t('reportForm.submitSuccessDescription'),
        });
      }

      onSuccess();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t(isEditMode ? 'reportForm.updateError' : 'reportForm.submitError'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{isEditMode ? t('reportForm.editTitle') : t('reportForm.newTitle')}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">{t('report.title')}</Label>
          <Input
            id="title"
            placeholder={t('reportForm.titlePlaceholder')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="category">{t('report.category')}</Label>
          <Select value={category} onValueChange={(value) => setCategory(value as ReportCategory)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="infrastructure">{t('category.infrastructure')}</SelectItem>
              <SelectItem value="safety">{t('category.safety')}</SelectItem>
              <SelectItem value="environment">{t('category.environment')}</SelectItem>
              <SelectItem value="utilities">{t('category.utilities')}</SelectItem>
              <SelectItem value="other">{t('category.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">{t('report.description')}</Label>
          <Textarea
            id="description"
            placeholder={t('reportForm.descriptionPlaceholder')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-2 min-h-32"
          />
        </div>

        <div>
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t('report.location')}
          </Label>
          <Tabs defaultValue="text" className="mt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" className="gap-2">
                <MapPin className="w-4 h-4" />
                {t('reportForm.enterAddress')}
              </TabsTrigger>
              <TabsTrigger value="map" className="gap-2">
                <Map className="w-4 h-4" />
                {t('reportForm.pickOnMap')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="space-y-2">
              <Input
                id="location"
                placeholder={t('reportForm.locationPlaceholder')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                {t('reportForm.locationHelpText')}
              </p>
            </TabsContent>
            <TabsContent value="map">
              <LocationPicker onLocationSelect={handleLocationSelect} initialPosition={latitude && longitude ? [latitude, longitude] : undefined} />
              {location && (
                <p className="text-sm text-muted-foreground mt-2">
                  {t('reportForm.selectedLocation', { location })}
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Label htmlFor="images" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            {t('reportForm.uploadPhotos')}
          </Label>
          <p className="text-sm text-muted-foreground mb-3">
            {t('reportForm.uploadPhotosHelpText')}
          </p>
          <ImageUpload onImagesChange={setImages} maxImages={5} existingImages={images} />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="is-public" checked={isPublic} onCheckedChange={setIsPublic} />
          <Label htmlFor="is-public">{t('reportForm.makePublic')}</Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-secondary text-secondary-foreground hover:opacity-90"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            isEditMode ? t('reportForm.saving') : t('reportForm.submitting')
          ) : (
            <>
              {isEditMode ? <Save className="w-5 h-5 mr-2" /> : <Send className="w-5 h-5 mr-2" />}
              {isEditMode ? t('reportForm.saveChanges') : t('report.submit')}
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ReportForm;

