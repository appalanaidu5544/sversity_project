import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';
import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const AdmissionFormPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    program: '',
    gpa: '',
  });
  const [documents, setDocuments] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('student_id', currentUser.id);
      
      data.append('full_name', formData.full_name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('program', formData.program);
      data.append('gpa', parseFloat(formData.gpa));
      data.append('status', 'Pending');

      if (documents) {
        for (let i = 0; i < documents.length; i++) {
          data.append('documents', documents[i]);
        }
      }

      await pb.collection('admissions').create(data, { $autoCancel: false });
      toast.success('Application submitted successfully');
      navigate('/admissions');
    } catch (error) {
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Apply for admission - Sversity</title>
        <meta name="description" content="Submit your admission application to Sversity." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Logout />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1
              lg:ml-64
              p-6 lg:p-8
              overflow-y-auto
              h-[calc(100vh-73px)] ">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Admission application</CardTitle>
                  <CardDescription>Fill out the form below to apply for admission</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full name</Label>
                      <Input
                        id="full_name"
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        required
                        className="text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="program">Desired program</Label>
                      <Select value={formData.program} onValueChange={(value) => setFormData({ ...formData, program: value })}>
                        <SelectTrigger className="text-foreground">
                          <SelectValue placeholder="Select a program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Business Administration">Business Administration</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gpa">High school GPA</Label>
                      <Input
                        id="gpa"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        value={formData.gpa}
                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                        required
                        className="text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="documents">Documents (optional)</Label>
                      <Input
                        id="documents"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setDocuments(e.target.files)}
                        className="text-foreground"
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload transcripts, certificates, or other supporting documents (PDF, JPEG, PNG)
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? 'Submitting...' : 'Submit application'}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => navigate('/admissions')}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdmissionFormPage;