'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Chrome } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-12" style={{ backgroundImage: 'url("/auth_bg.png")' }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      <Card className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-md shadow-2xl border-none">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              Quest<span className="text-gray-900">Tours</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Join us and start your next Indian adventure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="John" required className="bg-white/50 border-gray-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Doe" required className="bg-white/50 border-gray-200" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required className="bg-white/50 border-gray-200" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required className="bg-white/50 border-gray-200" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required className="bg-white/50 border-gray-200" />
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all">
            Sign Up
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/90 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-gray-200 hover:bg-gray-50">
            <Chrome className="w-4 h-4" />
            Google
          </Button>
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
