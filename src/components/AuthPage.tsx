import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { UserRole } from '@/types';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password, role);
      } else {
        await signup(email, password, name, role);
      }
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Authentication Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{isLogin ? t('auth.login') : t('auth.signup')}</h1>
          <p className="text-muted-foreground">
            {isLogin ? t('auth.loginSubtitle') : t('auth.signupSubtitle')}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">{t('auth.name')}</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}
          <div>
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div>
            <Label>{t('auth.iAm')}</Label>
            <div className="flex gap-4 mt-2">
              <Button type="button" variant={role === 'citizen' ? 'default' : 'outline'} onClick={() => setRole('citizen')}>{t('auth.citizen')}</Button>
              <Button type="button" variant={role === 'authority' ? 'default' : 'outline'} onClick={() => setRole('authority')}>{t('auth.authority')}</Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('common.loading') : (isLogin ? t('auth.login') : t('auth.signup'))}
          </Button>
        </form>
        <div className="text-center">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? t('auth.dontHaveAccount') : t('auth.alreadyHaveAccount')}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;

