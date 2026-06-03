import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { toast } from 'sonner';
import { GraduationCap } from 'lucide-react';
const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, sendVerificationEmail } = useAuth();
  const [loading, setLoading] =
    useState(false);
  // SUCCESS POPUP STATE
  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: 'student',
      phone: '',
      address: '',
    });

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    // PASSWORD CHECK
    if (
      formData.password !==
      formData.passwordConfirm
    ) {

      toast.error(
        'Passwords do not match'
      );

      return;
    }

    setLoading(true);

    try {

      // CREATE ACCOUNT
      await signup(formData);

      // SEND VERIFICATION EMAIL
      await sendVerificationEmail(
        formData.email
      );

      // SHOW SUCCESS POPUP
      setShowSuccessPopup(true);

    } catch (error) {

      toast.error(
        error.message ||
        'Signup failed. Please try again.'
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <>

      <Helmet>
        <title>
          Sign up - Sversity
        </title>

        <meta
          name="description"
          content="Create your Sversity account and start your academic journey with us."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-12">

        <Card className="w-full max-w-md">

          <CardHeader className="space-y-1 text-center">

            <div className="flex justify-center mb-4">

              <GraduationCap className="h-12 w-12 text-primary" />

            </div>

            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>

            <CardDescription>
              Enter your details to get started
            </CardDescription>

          </CardHeader>

          <CardContent>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME */}
              <div className="space-y-2">

                <Label htmlFor="name">
                  Full name
                </Label>

                <Input
                  id="name"
                  type="text"
                  placeholder="Maya Chen"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* EMAIL */}
              <div className="space-y-2">

                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="maya@sversity.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* ROLE */}
              <div className="space-y-2">

                <Label htmlFor="role">
                  Role
                </Label>

                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      role: value,
                    })
                  }
                >

                  <SelectTrigger>

                    <SelectValue />

                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="student">
                      Student
                    </SelectItem>

                    <SelectItem value="faculty">
                      Faculty
                    </SelectItem>

                    <SelectItem value="admin">
                      Admin
                    </SelectItem>

                  </SelectContent>

                </Select>

              </div>

              {/* PHONE */}
              <div className="space-y-2">

                <Label htmlFor="phone">
                  Phone
                </Label>

                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />

              </div>

              {/* ADDRESS */}
              <div className="space-y-2">

                <Label htmlFor="address">
                  Address
                </Label>

                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    })
                  }
                />

              </div>

              {/* PASSWORD */}
              <div className="space-y-2">

                <Label htmlFor="password">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  required
                  minLength={8}
                />

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-2">

                <Label htmlFor="passwordConfirm">
                  Confirm password
                </Label>

                <Input
                  id="passwordConfirm"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.passwordConfirm}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passwordConfirm:
                        e.target.value,
                    })
                  }
                  required
                  minLength={8}
                />

              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >

                {loading
                  ? 'Creating account...'
                  : 'Create account'}

              </Button>

            </form>

            {/* LOGIN LINK */}
            <div className="mt-6 text-center text-sm">

              <span className="text-muted-foreground">
                Already have an account?
              </span>{' '}

              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Login
              </Link>

            </div>

          </CardContent>

        </Card>

      </div>

      {/* SUCCESS POPUP */}
      <Dialog
        open={showSuccessPopup}
        onOpenChange={setShowSuccessPopup}
      >

        <DialogContent className="sm:max-w-md">

          <DialogHeader>

            <DialogTitle className="text-2xl text-center text-green-600">

              Account Created Successfully

            </DialogTitle>

            <DialogDescription className="text-center pt-2">

              Your account has been created successfully.
              Please login to continue.

            </DialogDescription>

          </DialogHeader>

          <div className="flex justify-center pt-4">

            <Button
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Go To Login
            </Button>

          </div>

        </DialogContent>

      </Dialog>

    </>
  );
};

export default SignupPage;