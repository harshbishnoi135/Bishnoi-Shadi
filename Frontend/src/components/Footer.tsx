
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-900">29Tech</h3>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-600 mb-2">Need Help?</p>
            <a 
              href="mailto:support@bishnoishhadi.com" 
              className="text-bishnoi-orange hover:text-orange-600 transition-colors"
            >
              support@bishnoishhadi.com
            </a>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Bishnoi Shadi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
