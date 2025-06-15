import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { COUNTRIES, STATES_INDIA, STATES_USA, GOTRAS, MARITAL_STATUSES, STUDY_FIELDS, STATES_UK, STATES_CANADA } from '@/lib/constants';
import { useUpdateMyProfileMutation } from '@/slices/usersApiSlice';

const ProfileRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    city: '',
    state: '',
    country: '',
    phoneNumber: '',
    otp: '',
    dateOfBirth: null as Date | null,
    maritalStatus: '',
    occupation: '',
    annualIncome: '',
    lastGraduatingCollege: '',
    fieldOfStudy: '',
    fatherGotra: '',
    motherGotra: '',
    grandmotherGotra: '',
    motherMotherGotra: '',
    fatherOccupation: '',
    motherOccupation: '',
    heightFeet: '',
    heightInches: '',
  });

  const [showOtp, setShowOtp] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateMyProfile] = useUpdateMyProfileMutation();
  const { completeProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | Date | null) => {
    if (field === 'heightFeet' || field === 'heightInches') {
      // Ensure only numbers are entered
      if (value && !/^\d*$/.test(value as string)) {
        return;
      }
      // Limit feet to 2 digits and inches to 2 digits
      if (field === 'heightFeet' && (value as string).length > 2) return;
      if (field === 'heightInches' && (value as string).length > 2) return;
      // Ensure inches is between 0-11
      if (field === 'heightInches' && parseInt(value as string) > 11) return;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // const handleSendOtp = () => {
  //   if (formData.phoneNumber.length >= 10) {
  //     setShowOtp(true);
  //     toast({
  //       title: "OTP Sent",
  //       description: "Verification code sent to your phone number.",
  //     });
  //   }
  // };

  // const handleVerifyOtp = () => {
  //   if (formData.otp.length === 6) {
  //     setIsPhoneVerified(true);
  //     toast({
  //       title: "Phone Verified",
  //       description: "Your phone number has been verified successfully.",
  //     });
  //   }
  // };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if(isLoading) return;
    setIsLoading(true);
    if (!formData.firstName || !formData.lastName || !formData.gender) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // if (!isPhoneVerified) {
    //   toast({
    //     title: "Phone Verification Required",
    //     description: "Please verify your phone number before continuing.",
    //     variant: "destructive"
    //   });
    //   return;
    // }

    // Combine height into string format
    const height = formData.heightFeet && formData.heightInches 
      ? `${formData.heightFeet}'${formData.heightInches}`
      : '';

    const submitData = {
      ...formData,
      heightFeet: undefined,
      heightInches: undefined,
      height,
    };
    try {
      const res = await updateMyProfile(submitData).unwrap()
      await completeProfile(res);
      toast({
        title: "Profile Created",
        description: "Your profile has been successfully created!",
      });
      navigate('/discover');
    } catch (err) {
      toast({
        title: "Failed to Create Profile",
        description: "Try again later",
        variant: "destructive"
      });
    }
    setIsLoading(false);
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

              {/* Basic Information */}
              <div className="space-y-4 pb-8">
                <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
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
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col">
                    <Label htmlFor="dateOfBirth" className="mb-2">Date of Birth *</Label>
                    <DatePicker
                      selected={formData.dateOfBirth}
                      onChange={(date: Date | null) => handleInputChange('dateOfBirth', date)}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      maxDate={new Date()}
                      placeholderText="Select date of birth"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="height">Height</Label>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1">
                        <Select onValueChange={(value) => handleInputChange('heightFeet', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Feet" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 7 }, (_, i) => i + 1).map((feet) => (
                              <SelectItem key={feet} value={feet.toString()}>
                                {feet}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <span className="text-gray-500">ft</span>
                      <div className="flex-1">
                        <Select onValueChange={(value) => handleInputChange('heightInches', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Inches" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i).map((inches) => (
                              <SelectItem key={inches} value={inches.toString()}>
                                {inches}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <span className="text-gray-500">in</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pb-8">
                <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="+91 9876543210"
                        className="flex-1"
                        // disabled={isPhoneVerified}
                      />
                      {/* {!isPhoneVerified && (
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
                      )} */}
                    </div>
                  </div>

                  {/* {showOtp && !isPhoneVerified && (
                    <div>
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
                  )} */}
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4 pb-8">
                <h3 className="text-lg font-semibold text-gray-700">Location Information</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select onValueChange={(value) => {
                      handleInputChange('country', value);
                      handleInputChange('state', ''); // Reset state when country changes
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    {formData.country === 'India' ? (
                      <Select onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATES_INDIA.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : formData.country === 'USA' ? (
                      <Select onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATES_USA.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : formData.country === 'Canada' ? (
                      <Select onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATES_CANADA.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : formData.country === 'UK' ? (
                      <Select onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATES_UK.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="Enter your state/province"
                      />
                    )}
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
                </div>
              </div>

              {/* Education & Career */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Education & Career</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        {MARITAL_STATUSES.map(status => (
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
                    <Label htmlFor="annualIncome">Annual Income (Rs.)</Label>
                    <Input
                      id="annualIncome"
                      value={formData.annualIncome}
                      onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                      placeholder="Enter your annual income"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastGraduatingCollege">Last Graduating College</Label>
                    <Input
                      id="lastGraduatingCollege"
                      value={formData.lastGraduatingCollege}
                      onChange={(e) => handleInputChange('lastGraduatingCollege', e.target.value)}
                      placeholder="Enter your last graduating college name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Select onValueChange={(value) => handleInputChange('fieldOfStudy', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field of study" />
                      </SelectTrigger>
                      <SelectContent>
                        {STUDY_FIELDS.map(field => (
                          <SelectItem key={field} value={field}>{field}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                    {GOTRAS.map(gotra => (
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
                    {GOTRAS.map(gotra => (
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
                    {GOTRAS.map(gotra => (
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
                    {GOTRAS.map(gotra => (
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
}

export default ProfileRegistration;
