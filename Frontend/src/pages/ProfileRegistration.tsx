
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ProfileRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    city: '',
    country: '',
    phoneNumber: '',
    otp: '',
    age: '',
    maritalStatus: '',
    occupation: '',
    income: '',
    college: '',
    study: '',
    fatherGotra: '',
    motherGotra: '',
    grandmotherGotra: '',
    motherMotherGotra: '',
    fatherOccupation: '',
    motherOccupation: '',
  });

  const [showOtp, setShowOtp] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const { completeProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const countries = ['India', 'USA', 'Canada', 'UK', 'Australia', 'UAE'];
  const gotras = ['Bissa', 'Godara', 'Jangid', 'Panwar', 'Rathi'];
  const maritalStatuses = ['Never Married', 'Divorced', 'Widowed'];
  const studyFields = ['Engineering', 'Medical', 'Commerce', 'Arts', 'Science', 'Law', 'Management', 'Other'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendOtp = () => {
    if (formData.phoneNumber.length >= 10) {
      setShowOtp(true);
      toast({
        title: "OTP Sent",
        description: "Verification code sent to your phone number.",
      });
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp.length === 6) {
      setIsPhoneVerified(true);
      toast({
        title: "Phone Verified",
        description: "Your phone number has been verified successfully.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.gender) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!isPhoneVerified) {
      toast({
        title: "Phone Verification Required",
        description: "Please verify your phone number before continuing.",
        variant: "destructive"
      });
      return;
    }

    completeProfile(formData);
    toast({
      title: "Profile Created",
      description: "Your profile has been successfully created!",
    });
    navigate('/matches');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help us find your perfect match by providing your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-bishnoi-orange">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo at top */}
              <div className="flex justify-center">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                    <label htmlFor="photo" className="cursor-pointer">
                      <div className="text-gray-400 text-sm">
                        <div className="text-2xl mb-2">📷</div>
                        Upload Photo
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="+91 9876543210"
                      className="flex-1"
                      disabled={isPhoneVerified}
                    />
                    {!isPhoneVerified && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSendOtp}
                        disabled={formData.phoneNumber.length < 10}
                      >
                        Send OTP
                      </Button>
                    )}
                    {isPhoneVerified && (
                      <div className="flex items-center px-3">
                        <span className="text-green-600 text-xl">✓</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty div to maintain grid layout */}
                <div></div>

                {showOtp && !isPhoneVerified && (
                  <div className="md:col-span-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="otp"
                        type="text"
                        value={formData.otp}
                        onChange={(e) => handleInputChange('otp', e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleVerifyOtp}
                        disabled={formData.otp.length !== 6}
                      >
                        Verify
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      {maritalStatuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    placeholder="Enter your occupation"
                  />
                </div>

                <div>
                  <Label htmlFor="income">Annual Income</Label>
                  <Input
                    id="income"
                    value={formData.income}
                    onChange={(e) => handleInputChange('income', e.target.value)}
                    placeholder="Enter your annual income"
                  />
                </div>

                <div>
                  <Label htmlFor="college">Last Graduating College</Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(e) => handleInputChange('college', e.target.value)}
                    placeholder="Enter your college name"
                  />
                </div>

                <div>
                  <Label htmlFor="study">Field of Study</Label>
                  <Select onValueChange={(value) => handleInputChange('study', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field of study" />
                    </SelectTrigger>
                    <SelectContent>
                      {studyFields.map(field => (
                        <SelectItem key={field} value={field}>{field}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-bishnoi-orange">Family Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fatherGotra">Father's Gotra</Label>
                <Select onValueChange={(value) => handleInputChange('fatherGotra', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select father's gotra" />
                  </SelectTrigger>
                  <SelectContent>
                    {gotras.map(gotra => (
                      <SelectItem key={gotra} value={gotra}>{gotra}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="motherGotra">Mother's Gotra</Label>
                <Select onValueChange={(value) => handleInputChange('motherGotra', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mother's gotra" />
                  </SelectTrigger>
                  <SelectContent>
                    {gotras.map(gotra => (
                      <SelectItem key={gotra} value={gotra}>{gotra}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="grandmotherGotra">Grandmother's Gotra</Label>
                <Select onValueChange={(value) => handleInputChange('grandmotherGotra', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grandmother's gotra" />
                  </SelectTrigger>
                  <SelectContent>
                    {gotras.map(gotra => (
                      <SelectItem key={gotra} value={gotra}>{gotra}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="motherMotherGotra">Mother's Mother's Gotra</Label>
                <Select onValueChange={(value) => handleInputChange('motherMotherGotra', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mother's mother's gotra" />
                  </SelectTrigger>
                  <SelectContent>
                    {gotras.map(gotra => (
                      <SelectItem key={gotra} value={gotra}>{gotra}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                <Input
                  id="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                  placeholder="Enter father's occupation"
                />
              </div>

              <div>
                <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                <Input
                  id="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                  placeholder="Enter mother's occupation"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              size="lg"
              className="bg-bishnoi-orange hover:bg-orange-600 px-8"
            >
              Complete Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileRegistration;
