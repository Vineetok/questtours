'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/inputs/button';
import { Input } from '@/components/ui/inputs/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/display/card';
import { Label } from '@/components/ui/inputs/label';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import { setAuthToken, setUserData } from '@/lib/auth';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'customer' | 'agent'>('customer');

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'agent') {
      // Synchronize state using a microtask to avoid cascading renders warning
      Promise.resolve().then(() => setRole('agent'));
    }
  }, [searchParams]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setIsLoading(true);

    try {
      const data = await authService.register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: role,
      });

      toast.success('Registration successful!');
      setAuthToken(data.token);
      setUserData(data.user);
      
      // Redirect based on role
      router.push(`/dashboard/${role}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2042&auto=format&fit=crop")' }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <Card className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-md shadow-2xl border-none">
        
         <Link
          href="/"
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-full transition-all z-20"
        >
          <X size={20} />
        </Link><CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              Quest<span className="text-gray-900">Tours</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            {role === 'agent' ? 'Register as a QuestTours Partner' : 'Join us and start your next Indian adventure'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  required 
                  className="bg-white/50 border-gray-200" 
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  required 
                  className="bg-white/50 border-gray-200" 
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                className="bg-white/50 border-gray-200" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                className="bg-white/50 border-gray-200" 
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                required 
                className="bg-white/50 border-gray-200" 
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

   

          
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin" /></div>}>
      <SignupForm />
    </Suspense>
  );
}

