import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { logout } = useAuthContext();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Dashboard
        </h2>

        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </div>
    </div>
  );
}
