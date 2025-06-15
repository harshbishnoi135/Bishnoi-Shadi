
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Bishnoi Marriage?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connecting hearts within our sacred community, preserving traditions while embracing modern values
            </p>
            <Link to="/login">
              <Button 
                size="lg" 
                className="bg-bishnoi-orange hover:bg-orange-600 text-white px-8 py-3 text-lg"
              >
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Our Motive Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Motive</h2>
            <div className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
              <p className="mb-6">
                At Bishnoi Shaadi, our primary motive is to strengthen the bonds within our sacred Bishnoi community 
                by facilitating meaningful matrimonial connections that honor our ancestral values while embracing 
                modern sensibilities. We believe that marriage is not just a union of two individuals, but a sacred 
                bond that connects families, preserves traditions, and builds a stronger community for future generations.
              </p>
              <p>
                Our platform is dedicated to helping Bishnoi individuals find life partners who share their values, 
                understand their cultural heritage, and are committed to upholding the principles that make our 
                community unique. We strive to create an environment where authentic connections can flourish, 
                ensuring compatibility not just in personal preferences but in spiritual and cultural alignment.
              </p>
            </div>
          </div>

          {/* Rajasthani Women Photos */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Rajasthani Woman in Traditional Attire"
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
              />
              <p className="text-gray-600 text-sm">Traditional Rajasthani Elegance</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Rajasthani Bride"
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
              />
              <p className="text-gray-600 text-sm">Cultural Heritage</p>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1609221995045-7c3c7e3c8e7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Rajasthani Woman with Traditional Jewelry"
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
              />
              <p className="text-gray-600 text-sm">Timeless Beauty</p>
            </div>
          </div>
        </div>
      </div>

      {/* How We're Different Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How Bishnoi Shaadi is Different from Other Platforms
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              Unlike generic matrimonial platforms, we are specifically designed for the Bishnoi community, 
              ensuring cultural compatibility and shared values in every match.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-bishnoi-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl text-white">🏛️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Specific</h3>
              <p className="text-gray-600 text-sm">
                Exclusively for Bishnoi families, ensuring deep cultural understanding and shared values.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-bishnoi-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl text-white">🧬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Gotra Compatibility</h3>
              <p className="text-gray-600 text-sm">
                Advanced matching based on traditional gotra systems and family lineages for perfect compatibility.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-bishnoi-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Verified Profiles</h3>
              <p className="text-gray-600 text-sm">
                Strict verification process ensures authentic profiles and genuine matrimonial intentions.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-bishnoi-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Precise Matching</h3>
              <p className="text-gray-600 text-sm">
                AI-powered matching algorithm considering cultural, educational, and family preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Preserving Our Heritage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform is designed specifically for the Bishnoi community, 
              honoring our traditions while making meaningful connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
              <div className="w-16 h-16 bg-bishnoi-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl text-white">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Community Focused
              </h3>
              <p className="text-gray-600">
                Exclusively for Bishnoi families, ensuring cultural compatibility and shared values.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
              <div className="w-16 h-16 bg-bishnoi-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl text-white">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Traditional Values
              </h3>
              <p className="text-gray-600">
                Respecting our ancestral wisdom while embracing modern approaches to finding life partners.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
              <div className="w-16 h-16 bg-bishnoi-orange rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                Verified profiles and secure communication channels for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-bishnoi-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Life Partner?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of Bishnoi families who have found happiness through our platform.
          </p>
          <Link to="/login">
            <Button 
              size="lg" 
              className="bg-white text-bishnoi-orange hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
