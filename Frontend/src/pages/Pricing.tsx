
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const handleSelectPlan = (planName: string) => {
    // Handle plan selection logic here
    console.log(`Selected plan: ${planName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Member</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to unlock premium features and find your ideal life partner
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Essential Plan */}
          <Card className="relative border-2 border-gray-200 hover:border-bishnoi-orange transition-colors">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Essential Plan</CardTitle>
              <div className="text-4xl font-bold text-bishnoi-orange mb-2">₹2,999</div>
              <p className="text-gray-600">Perfect for getting started</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">View up to 50 profiles</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Send 10 interest requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Basic profile details</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Gotra compatibility matching</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Email support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">3 months validity</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-bishnoi-orange hover:bg-orange-600 py-3"
                onClick={() => handleSelectPlan('Essential')}
              >
                Choose Essential Plan
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-bishnoi-orange shadow-lg">
            {/* Popular Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-bishnoi-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Premium Plan</CardTitle>
              <div className="text-4xl font-bold text-bishnoi-orange mb-2">₹3,999</div>
              <p className="text-gray-600">For serious matrimonial seekers</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Unlimited profile views</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Unlimited interest requests</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Complete profile details & contact info</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Advanced matching algorithm</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Priority customer support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Direct messaging feature</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Profile highlighting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">6 months validity</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-bishnoi-orange hover:bg-orange-600 py-3"
                onClick={() => handleSelectPlan('Premium')}
              >
                Choose Premium Plan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include secure payment processing and money-back guarantee
          </p>
          <p className="text-sm text-gray-500">
            Need help choosing? <span className="text-bishnoi-orange cursor-pointer hover:underline">Contact our support team</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
