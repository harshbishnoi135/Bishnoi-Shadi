
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MessageCircle, X, Heart } from 'lucide-react';

const ProfileDescription: React.FC = () => {
  const { id } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  // Mock profile data - in real app, this would come from API
  const profile = {
    id: id,
    name: 'Priya Sharma',
    age: 26,
    city: 'Mumbai',
    country: 'India',
    fatherGotra: 'Bissa',
    motherGotra: 'Godara',
    occupation: 'Software Engineer',
    college: 'Indian Institute of Technology, Mumbai',
    photo: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    // Blurred fields (member feature required)
    income: '15-20 LPA',
    phoneNumber: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    grandmotherGotra: 'Panwar',
    motherMotherGotra: 'Rathi',
    fatherOccupation: 'Businessman',
    maritalStatus: 'Never Married'
  };

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const handleSendMessage = () => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/matches">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Matches
            </Button>
          </Link>
        </div>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              <div className="flex-shrink-0">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-56 h-56 object-cover rounded-lg shadow-lg"
                />
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{profile.age} years • {profile.occupation}</p>
                    <p className="text-lg text-gray-600 mb-6">{profile.city}, {profile.country}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={toggleFavourite}
                    className="p-2"
                  >
                    <Heart 
                      className={`w-8 h-8 ${isFavourite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button className="bg-bishnoi-orange hover:bg-orange-600 px-8">
                    Express Interest
                  </Button>
                  <Button 
                    variant="outline" 
                    className="px-8"
                    onClick={handleSendMessage}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Grid - Spread Out */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Basic Information - Visible */}
          <Card>
            <CardHeader>
              <CardTitle className="text-bishnoi-orange text-xl">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">Personal Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Age:</span>
                    <span className="text-gray-900">{profile.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Occupation:</span>
                    <span className="text-gray-900">{profile.occupation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Location:</span>
                    <span className="text-gray-900">{profile.city}, {profile.country}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">Family Heritage</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Father's Gotra:</span>
                    <span className="text-gray-900">{profile.fatherGotra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Mother's Gotra:</span>
                    <span className="text-gray-900">{profile.motherGotra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Education:</span>
                    <span className="text-gray-900">{profile.college}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information - Blurred Values Only */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-bishnoi-orange text-xl">Detailed Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Phone:</span>
                    <span className="filter blur-sm text-gray-900">{profile.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="filter blur-sm text-gray-900">{profile.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Annual Income:</span>
                    <span className="filter blur-sm text-gray-900">{profile.income}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">Extended Family Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Grandmother's Gotra:</span>
                    <span className="filter blur-sm text-gray-900">{profile.grandmotherGotra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Mother's Mother's Gotra:</span>
                    <span className="filter blur-sm text-gray-900">{profile.motherMotherGotra}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Father's Occupation:</span>
                    <span className="filter blur-sm text-gray-900">{profile.fatherOccupation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Marital Status:</span>
                    <span className="filter blur-sm text-gray-900">{profile.maritalStatus}</span>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Member Feature Overlay */}
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
              <div className="text-center p-8 max-w-md">
                <div className="w-16 h-16 bg-bishnoi-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-white">👑</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Member Feature Required</h3>
                <p className="text-gray-600 mb-6">
                  Upgrade to our membership plan to view detailed contact information and extended family details.
                </p>
                <Link to="/pricing">
                  <Button className="bg-bishnoi-orange hover:bg-orange-600">
                    View Membership Plans
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* More Pictures Section */}
        <Card className="mb-8 relative">
          <CardHeader>
            <CardTitle className="text-bishnoi-orange text-xl">More Pictures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="aspect-square bg-gray-200 rounded-lg filter blur-sm">
                  <img
                    src={`https://images.unsplash.com/photo-150700321${num}-0a1dd7228f2d?w=200&h=200&fit=crop`}
                    alt={`More photo ${num}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </CardContent>

          {/* Member Feature Overlay for More Pictures */}
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
            <div className="text-center p-8 max-w-md">
              <div className="w-16 h-16 bg-bishnoi-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-white">👑</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Member Feature Required</h3>
              <p className="text-gray-600 mb-6">
                Upgrade to our membership plan to view more pictures and get a complete profile view.
              </p>
              <Link to="/pricing">
                <Button className="bg-bishnoi-orange hover:bg-orange-600">
                  View Membership Plans
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button className="bg-bishnoi-orange hover:bg-orange-600 px-8">
            Express Interest
          </Button>
          <Button 
            variant="outline" 
            className="px-8"
            onClick={toggleFavourite}
          >
            {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
          </Button>
        </div>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-lg shadow-xl border w-80 h-96">
            <div className="flex items-center justify-between p-4 border-b bg-bishnoi-orange rounded-t-lg">
              <h3 className="text-white font-semibold">Chat with {profile.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-orange-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 h-72 flex items-center justify-center text-gray-500">
              <p>Chat feature coming soon...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDescription;
