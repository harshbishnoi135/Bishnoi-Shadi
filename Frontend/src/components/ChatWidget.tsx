
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, LogIn, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChatWidget: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Mock membership status - in real app, this would come from user context
  const isMember = false;

  const handleLoginRedirect = () => {
    navigate('/login');
    setIsChatOpen(false);
  };

  const handlePricingRedirect = () => {
    navigate('/pricing');
    setIsChatOpen(false);
  };

  const renderChatContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="p-6 h-72 flex flex-col items-center justify-center text-center">
          <LogIn className="w-12 h-12 text-bishnoi-orange mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Login Required</h3>
          <p className="text-gray-600 mb-4">
            Please login to access the chat feature and connect with other members.
          </p>
          <Button 
            onClick={handleLoginRedirect}
            className="bg-bishnoi-orange hover:bg-orange-600"
          >
            Go to Login
          </Button>
        </div>
      );
    }

    if (!isMember) {
      return (
        <div className="p-6 h-72 flex flex-col items-center justify-center text-center">
          <Crown className="w-12 h-12 text-bishnoi-orange mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Membership Required</h3>
          <p className="text-gray-600 mb-4">
            Upgrade to our membership plan to access the chat feature and connect with other members.
          </p>
          <Button 
            onClick={handlePricingRedirect}
            className="bg-bishnoi-orange hover:bg-orange-600"
          >
            View Membership Plans
          </Button>
        </div>
      );
    }

    return (
      <div className="p-4 h-72 flex items-center justify-center text-gray-500">
        <p>Chat feature coming soon...</p>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isChatOpen ? (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 rounded-full bg-bishnoi-orange hover:bg-orange-600 shadow-lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl border w-80 h-96">
          <div className="flex items-center justify-between p-4 border-b bg-bishnoi-orange rounded-t-lg">
            <h3 className="text-white font-semibold">Chat Support</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:bg-orange-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {renderChatContent()}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
