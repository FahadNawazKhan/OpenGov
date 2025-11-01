import { useAuth } from '@/contexts/AuthContext';
import CitizenDashboard from '@/components/CitizenDashboard';
import { AuthorityDashboard } from '@/components/AuthorityDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return user.role === 'citizen' ? <CitizenDashboard /> : <AuthorityDashboard />;
};

export default Index;
