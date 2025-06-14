
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

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

const Matches: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedQuery, setDisplayedQuery] = useState('');
  const profilesPerPage = 15;

  // Mock data for profiles
  const [profiles, setProfiles] = useState<Profile[]>([
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
      isFavorited: false
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
      isFavorited: false
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
      isFavorited: false
    },
    // Add more mock profiles to demonstrate pagination
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 4}`,
      name: `Profile ${i + 4}`,
      age: 25 + (i % 8),
      city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'][i % 4],
      country: 'India',
      fatherGotra: ['Bissa', 'Godara', 'Jangid', 'Panwar', 'Rathi'][i % 5],
      motherGotra: ['Bissa', 'Godara', 'Jangid', 'Panwar', 'Rathi'][(i + 1) % 5],
      occupation: ['Engineer', 'Doctor', 'Teacher', 'Businessman'][i % 4],
      photo: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isFavorited: false
    }))
  ]);

  const toggleFavorite = (profileId: string) => {
    setProfiles(prevProfiles =>
      prevProfiles.map(profile =>
        profile.id === profileId
          ? { ...profile, isFavorited: !profile.isFavorited }
          : profile
      )
    );

    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      toast({
        title: profile.isFavorited ? "Removed from Favourites" : "Added to Favourites",
        description: profile.isFavorited 
          ? `${profile.name} removed from your favourites.`
          : `${profile.name} added to your favourites.`,
      });
    }
  };

  const handleSearch = () => {
    setDisplayedQuery(searchQuery);
    setCurrentPage(1);
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(displayedQuery.toLowerCase()) ||
    profile.city.toLowerCase().includes(displayedQuery.toLowerCase()) ||
    profile.fatherGotra.toLowerCase().includes(displayedQuery.toLowerCase()) ||
    profile.motherGotra.toLowerCase().includes(displayedQuery.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Find Your Perfect Match</h1>
          
          {/* Modern Search Container */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 max-w-md w-full">
              <div className="flex-1">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, city, or gotra..."
                  className="border-0 focus:ring-0 shadow-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button
                onClick={handleSearch}
                className="bg-bishnoi-orange hover:bg-orange-600 px-6"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            Showing {currentProfiles.length} of {filteredProfiles.length} profiles 
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>

        {/* Profiles Grid */}
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
                    onClick={() => toggleFavorite(profile.id)}
                    className="absolute bottom-1 right-1 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    {profile.isFavorited ? (
                      <span className="text-lg text-red-500">❤️</span>
                    ) : (
                      <span className="text-lg text-gray-400">🤍</span>
                    )}
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

        {/* No Results */}
        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No profiles found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
