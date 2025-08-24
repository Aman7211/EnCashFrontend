import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Check, ArrowRight, Sparkles } from "lucide-react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Onboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    dateOfBirth: "",
    occupation: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const email = localStorage.getItem("email") || "user@example.com";

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const submit = async () => {
    if (!validateStep(2)) return;
    setIsSubmitting(true);

    try {
      const payload = { email, ...formData };

      // ✅ Call backend API (make sure backend route exists)
      const res = await API.post("/user/save-info", payload);

      if (res.data.success) {
        toast.success("Profile completed successfully!");
        navigate("/dashboard"); // redirect to dashboard
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save profile information");
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ icon: Icon, label, type = "text", placeholder, value, onChange, error, ...props }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Icon className="w-4 h-4 text-indigo-500" />
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} // ✅ bug fixed
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 
          ${
            error
              ? "border-red-300 bg-red-50 focus:border-red-500"
              : "border-gray-200 bg-white focus:border-indigo-500"
          } focus:outline-none focus:ring-4 focus:ring-indigo-100`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-left-2">
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-purple-300/20 to-pink-300/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-300/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-300/10 to-orange-300/10 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome aboard! ✨</h1>
            <p className="text-lg text-gray-600">Let's complete your profile to get started</p>
          </div>
          
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Form Card */}
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8">
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
                  <p className="text-gray-600">Tell us a bit about yourself</p>
                </div>
                
                <div className="grid gap-6">
                  <InputField
                    icon={User}
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                    error={errors.name}
                  />
                  
                  <InputField
                    icon={Mail}
                    label="Email Address"
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={() => {}}
                    disabled
                    className="bg-gray-50 cursor-not-allowed"
                  />
                  
                  <InputField
                    icon={Phone}
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    error={errors.phone}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      icon={Calendar}
                      label="Date of Birth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(value) => handleInputChange('dateOfBirth', value)}
                      error={errors.dateOfBirth}
                    />
                    
                    <InputField
                      icon={Briefcase}
                      label="Occupation"
                      placeholder="Your profession"
                      value={formData.occupation}
                      onChange={(value) => handleInputChange('occupation', value)}
                      error={errors.occupation}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Address Information</h2>
                  <p className="text-gray-600">Where can we reach you?</p>
                </div>
                
                <div className="grid gap-6">
                  <InputField
                    icon={MapPin}
                    label="Street Address"
                    placeholder="Enter your street address"
                    value={formData.address}
                    onChange={(value) => handleInputChange('address', value)}
                    error={errors.address}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      icon={MapPin}
                      label="City"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(value) => handleInputChange('city', value)}
                      error={errors.city}
                    />
                    
                    <InputField
                      icon={MapPin}
                      label="ZIP Code"
                      placeholder="Enter ZIP code"
                      value={formData.zipCode}
                      onChange={(value) => handleInputChange('zipCode', value)}
                      error={errors.zipCode}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h2>
                  <p className="text-gray-600">Please review your information before submitting</p>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <p className="text-gray-900">{formData.name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <p className="text-gray-900">{email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <p className="text-gray-900">{formData.phone}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Date of Birth:</span>
                      <p className="text-gray-900">{formData.dateOfBirth || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Occupation:</span>
                      <p className="text-gray-900">{formData.occupation || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Address:</span>
                      <p className="text-gray-900">{formData.address}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">City:</span>
                      <p className="text-gray-900">{formData.city}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">ZIP Code:</span>
                      <p className="text-gray-900">{formData.zipCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  ← Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      Complete Profile
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Need help? <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}