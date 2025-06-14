
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  country: string;
  fatherGotra: string;
  motherGotra: string;
  occupation: string;
  photo: string;
  isFavorited: boolean;
}

const Favourites: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 15;

  // Mock data for favourited profiles
  const [favouriteProfiles, setFavouriteProfiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      age: 26,
      city: 'Mumbai',
      country: 'India',
      fatherGotra: 'Bissa',
      motherGotra: 'Godara',
      occupation: 'Software Engineer',
      photo: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isFavorited: true
    },
    {
      id: '2',
      name: 'Neha Bishnoi',
      age: 24,
      city: 'Delhi',
      country: 'India',
      fatherGotra: 'Jangid',
      motherGotra: 'Panwar',
      occupation: 'Doctor',
      photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isFavorited: true
    },
    {
      id: '3',
      name: 'Anjali Rathi',
      age: 28,
      city: 'Bangalore',
      country: 'India',
      fatherGotra: 'Rathi',
      motherGotra: 'Bissa',
      occupation: 'Teacher',
      photo: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isFavorited: true
    }
  ]);

  const removeFavorite = (profileId: string) => {
    setFavouriteProfiles(prevProfiles =>
      prevProfiles.filter(profile => profile.id !== profileId)
    );

    toast({
      title: "Removed from Favourites",
      description: "Profile removed from your favourites.",
    });
  };

  const filteredProfiles = favouriteProfiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.fatherGotra.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.motherGotra.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);
  const startIndex = (currentPage - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const currentProfiles = filteredProfiles.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Favourite Profiles</h1>
          <p className="text-gray-600">Profiles you've marked as favourites</p>
          
          {/* Search Bar */}
          <div className="max-w-md mt-6">
            <Label htmlFor="search">Search Your Favourites</Label>
            <Input
              id="search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, city, or gotra..."
              className="mt-1"
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProfiles.length > 0 
              ? `Showing ${currentProfiles.length} of ${filteredProfiles.length} favourite profiles${totalPages > 1 ? ` (Page ${currentPage} of ${totalPages})` : ''}`
              : 'No favourite profiles found'
            }
          </p>
        </div>

        {/* Profiles Grid */}
        {currentProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {currentProfiles.map(profile => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative">
                    <Link to={`/profile-description/${profile.id}`}>
                      <img
                        src={profile.photo}
                        alt={profile.name}
                        className="w-full h-32 object-cover rounded-lg mb-3 cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </Link>
                    <button
                      onClick={() => removeFavorite(profile.id)}
                      className="absolute bottom-1 right-1 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                    >
                      <span className="text-lg text-red-500">❤️</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <Link to={`/profile-description/${profile.id}`}>
                      <h3 className="font-semibold text-base text-gray-900 hover:text-bishnoi-orange cursor-pointer">
                        {profile.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm">{profile.age} years, {profile.occupation}</p>
                    <p className="text-gray-600 text-sm">{profile.city}, {profile.country}</p>
                    
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Father's Gotra: {profile.fatherGotra}</p>
                      <p className="text-xs text-gray-500">Mother's Gotra: {profile.motherGotra}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl text-gray-400">❤️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Favourite Profiles Yet</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery 
                ? 'No profiles match your search criteria.' 
                : 'Start exploring profiles and add your favourites here!'
              }
            </p>
            {!searchQuery && (
              <Button 
                className="bg-bishnoi-orange hover:bg-orange-600"
                onClick={() => window.location.href = '/matches'}
              >
                Browse Profiles
              </Button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
