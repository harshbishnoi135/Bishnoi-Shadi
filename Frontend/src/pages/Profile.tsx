
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [additionalImages, setAdditionalImages] = useState<string[]>(['', '', '']);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    age: '28',
    city: 'Mumbai',
    country: 'India',
    occupation: 'Software Engineer',
    income: '₹15,00,000',
    fatherGotra: 'Bissa',
    motherGotra: 'Godara',
    grandmotherGotra: 'Panwar',
    motherMotherGotra: 'Rathi',
    fatherOccupation: 'Businessman',
    motherOccupation: 'Teacher',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleImageUpload = (index: number) => {
    // Mock image upload - in real app, this would handle file upload
    const newImages = [...additionalImages];
    newImages[index] = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop';
    setAdditionalImages(newImages);
    toast({
      title: "Image Uploaded",
      description: `Additional image ${index + 1} has been uploaded successfully.`,
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...additionalImages];
    newImages[index] = '';
    setAdditionalImages(newImages);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your profile information</p>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-bishnoi-orange hover:bg-orange-600"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        {/* Profile Photo Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-6">
              {/* Main Profile Photo */}
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-gray-600">👤</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-600">{profileData.occupation}</p>
                  {isEditing && (
                    <Button variant="outline" className="mt-2" size="sm">
                      Change Photo
                    </Button>
                  )}
                </div>
              </div>

              {/* Additional Images */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Additional Photos</h4>
                <div className="grid grid-cols-3 gap-4">
                  {additionalImages.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        {image ? (
                          <>
                            <img 
                              src={image} 
                              alt={`Additional ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {isEditing && (
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </>
                        ) : (
                          isEditing && (
                            <button
                              onClick={() => handleImageUpload(index)}
                              className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-600"
                            >
                              <Upload className="w-6 h-6 mb-1" />
                              <span className="text-xs">Upload</span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-bishnoi-orange">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={profileData.age}
                  onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profileData.city}
                  onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={profileData.country}
                  onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={profileData.occupation}
                  onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="income">Annual Income</Label>
                <Input
                  id="income"
                  value={profileData.income}
                  onChange={(e) => setProfileData({...profileData, income: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Family Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-bishnoi-orange">Family Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fatherGotra">Father's Gotra</Label>
                <Input
                  id="fatherGotra"
                  value={profileData.fatherGotra}
                  onChange={(e) => setProfileData({...profileData, fatherGotra: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="motherGotra">Mother's Gotra</Label>
                <Input
                  id="motherGotra"
                  value={profileData.motherGotra}
                  onChange={(e) => setProfileData({...profileData, motherGotra: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="grandmotherGotra">Grandmother's Gotra</Label>
                <Input
                  id="grandmotherGotra"
                  value={profileData.grandmotherGotra}
                  onChange={(e) => setProfileData({...profileData, grandmotherGotra: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="motherMotherGotra">Mother's Mother's Gotra</Label>
                <Input
                  id="motherMotherGotra"
                  value={profileData.motherMotherGotra}
                  onChange={(e) => setProfileData({...profileData, motherMotherGotra: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                <Input
                  id="fatherOccupation"
                  value={profileData.fatherOccupation}
                  onChange={(e) => setProfileData({...profileData, fatherOccupation: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                <Input
                  id="motherOccupation"
                  value={profileData.motherOccupation}
                  onChange={(e) => setProfileData({...profileData, motherOccupation: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
