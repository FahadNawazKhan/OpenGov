import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';
import { User, Shield, ArrowLeft } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password, role);
        toast({
          title: 'Welcome back!',
          description: `Logged in as ${role}`,
        });
      } else {
        if (!name) {
          throw new Error('Name is required');
        }
        await signup(email, password, name, role);
        toast({
          title: 'Account created!',
          description: `Welcome to OpenGov, ${name}!`,
        });
      }
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Authentication failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber/20 via-electric/10 to-neon/20 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyber/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="w-full max-w-md relative z-10">
        <Button
          variant="ghost"
          className="mb-4 hover-scale"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8 shadow-2xl border-2 glass-card backdrop-blur-xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 gradient-text">
              OpenGov
            </h1>
            <p className="text-muted-foreground text-lg">
              {isLogin ? 'Welcome back! 👋' : 'Create your account 🚀'}
            </p>
          </div>

          <Tabs value={isLogin ? 'login' : 'signup'} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" onClick={() => setIsLogin(false)}>
                Sign Up
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="mb-3 block font-semibold">I am a:</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={role === 'citizen' ? 'default' : 'outline'}
                className={`h-24 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                  role === 'citizen' ? 'bg-gradient-to-br from-cyber to-electric text-white shadow-lg scale-105' : 'hover-scale'
                }`}
                onClick={() => setRole('citizen')}
              >
                <User className="w-7 h-7" />
                <span className="font-semibold">Citizen</span>
              </Button>
              <Button
                type="button"
                variant={role === 'authority' ? 'default' : 'outline'}
                className={`h-24 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                  role === 'authority' ? 'bg-gradient-to-br from-neon to-electric text-white shadow-lg scale-105' : 'hover-scale'
                }`}
                onClick={() => setRole('authority')}
              >
                <Shield className="w-7 h-7" />
                <span className="font-semibold">Authority</span>
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              className={`w-full ${
                role === 'citizen' ? 'bg-gradient-to-r from-cyber to-electric' : 'bg-gradient-to-r from-neon to-electric'
              } text-white shadow-lg hover-scale font-semibold`}
              disabled={loading}
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
