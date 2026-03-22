// @ts-nocheck
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const steps = ['Account', 'Store Details', 'License', 'Location']

export default function VendorRegister() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    storeName: '',
    phone: '',
    whatsapp: '',
    storeEmail: '',
    licenseFile: null,
    licenseNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  })

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(5)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateField('licenseFile', e.target.files[0])
    }
  }

  const inputClass =
    'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 rounded-md px-4 py-2.5 text-sm w-full'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-8">
          {/* Logo */}
          <div className="flex justify-center">
            <img alt="Logo" src="/logo-desktop-light.png" className="h-10 w-auto dark:hidden" />
            <img alt="Logo" src="/logo-desktop-dark.png" className="hidden h-10 w-auto dark:block" />
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Vendor Registration
          </h2>

          {currentStep <= 4 && (
            <>
              {/* Progress Bar */}
              <div className="mt-8 flex items-center justify-between">
                {steps.map((label, index) => {
                  const stepNum = index + 1
                  const isCompleted = stepNum < currentStep
                  const isCurrent = stepNum === currentStep
                  const isFuture = stepNum > currentStep

                  return (
                    <div key={label} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                            isCompleted
                              ? 'bg-primary-600 text-white'
                              : isCurrent
                                ? 'border-2 border-primary-600 bg-primary-600/20 text-primary-600'
                                : 'border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-400 dark:text-gray-500'
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            stepNum
                          )}
                        </div>
                        <span
                          className={`mt-2 text-xs ${
                            isCompleted || isCurrent ? 'text-primary-600 font-medium' : 'text-gray-400 dark:text-gray-500'
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`mx-2 h-0.5 flex-1 ${
                            stepNum < currentStep ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Step 1 — Account */}
              {currentStep === 1 && (
                <div className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Full name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                </div>
              )}

              {/* Step 2 — Store Details */}
              {currentStep === 2 && (
                <div className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Store name
                    </label>
                    <input
                      id="storeName"
                      type="text"
                      placeholder="My Awesome Store"
                      value={formData.storeName}
                      onChange={(e) => updateField('storeName', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      WhatsApp number
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.whatsapp}
                      onChange={(e) => updateField('whatsapp', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Store email
                    </label>
                    <input
                      id="storeEmail"
                      type="email"
                      placeholder="store@example.com"
                      value={formData.storeEmail}
                      onChange={(e) => updateField('storeEmail', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                </div>
              )}

              {/* Step 3 — Business License */}
              {currentStep === 3 && (
                <div className="mt-8 space-y-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Upload your business license (optional). This helps us verify your store faster.
                  </p>
                  <div>
                    <label
                      htmlFor="licenseFile"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-8 transition hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      <svg className="mb-3 h-10 w-10 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Click to upload or drag and drop</span>
                      <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">PDF, JPG, PNG up to 10MB</span>
                      {formData.licenseFile && (
                        <span className="mt-2 text-xs text-primary-600">{formData.licenseFile.name}</span>
                      )}
                      <input
                        id="licenseFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      License number <span className="text-gray-400 dark:text-gray-500">(optional)</span>
                    </label>
                    <input
                      id="licenseNumber"
                      type="text"
                      placeholder="e.g. BL-123456"
                      value={formData.licenseNumber}
                      onChange={(e) => updateField('licenseNumber', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                </div>
              )}

              {/* Step 4 — Location */}
              {currentStep === 4 && (
                <div className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        className={`mt-1 ${inputClass}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        State / Province
                      </label>
                      <input
                        id="state"
                        type="text"
                        placeholder="NY"
                        value={formData.state}
                        onChange={(e) => updateField('state', e.target.value)}
                        className={`mt-1 ${inputClass}`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        Country
                      </label>
                      <input
                        id="country"
                        type="text"
                        placeholder="United States"
                        value={formData.country}
                        onChange={(e) => updateField('country', e.target.value)}
                        className={`mt-1 ${inputClass}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        Postal code
                      </label>
                      <input
                        id="postalCode"
                        type="text"
                        placeholder="10001"
                        value={formData.postalCode}
                        onChange={(e) => updateField('postalCode', e.target.value)}
                        className={`mt-1 ${inputClass}`}
                      />
                    </div>
                  </div>
                  <div className="flex h-48 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-400 dark:text-gray-500">
                    Map integration coming soon
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="rounded-md border border-gray-200 dark:border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                    >
                      Back
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {currentStep === 3 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      Skip
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                  >
                    {currentStep === 4 ? 'Submit Application' : 'Next'}
                  </button>
                </div>
              </div>

              {/* Sign in link */}
              <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign in
                </Link>
              </p>
            </>
          )}

          {/* Step 5 — Success */}
          {currentStep === 5 && (
            <div className="mt-8 flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">Application Submitted!</h3>
              <p className="mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400">
                Your vendor application has been submitted successfully. We'll review your information and get back to you within 24-48 hours. You'll receive an email once your application is approved.
              </p>
              <button
                type="button"
                onClick={() => navigate('/vendor/status')}
                className="mt-8 inline-block rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
              >
                View Application Status
              </button>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <Link to="/" className="font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white">
                  Back to Home
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
