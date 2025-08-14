import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Shield, Mail } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-16 bg-dark-900">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <Shield className="inline-block mr-3 text-primary-500" size={36} />
                Privacy Policy
              </h1>
              <p className="text-gray-300">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
              <p className="text-sm text-gray-400 mt-4">
                Last updated: August 2025
              </p>
            </div>

            <div className="bg-dark-800 rounded-xl p-8 space-y-8">
              <div>
                <p className="text-gray-300 leading-relaxed">
                  At FitByMi, LLC, we are committed to protecting your privacy and personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our fitness coaching services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
                    <p className="text-gray-300 leading-relaxed mb-3">
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                      <li>Name and contact information (email address, phone number)</li>
                      <li>Payment and billing information</li>
                      <li>Fitness goals, health information, and dietary preferences</li>
                      <li>Progress photos and measurements (when provided)</li>
                      <li>Communication preferences</li>
                      <li>Testimonials & Stories</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li>Provide personalized fitness and nutrition coaching services</li>
                  <li>Process payments and manage your account</li>
                  <li>Communicate with you about our services and respond to inquiries</li>
                  <li>Send newsletters and promotional materials (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li><strong className="text-white">Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing services (e.g., payment processors, email marketing platforms)</li>
                  <li><strong className="text-white">Legal Requirements:</strong> We may disclose your information when required by law or to protect our rights and safety</li>
                  <li><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
                  or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights and Choices</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li><strong className="text-white">Access:</strong> You can request access to the personal information we hold about you</li>
                  <li><strong className="text-white">Correction:</strong> You can request that we correct any inaccurate information</li>
                  <li><strong className="text-white">Deletion:</strong> You can request that we delete your personal information</li>
                  <li><strong className="text-white">Opt-out:</strong> You can unsubscribe from our newsletters and promotional communications at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie 
                  settings through your browser preferences. We may use analytics tools to understand how visitors interact with our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  We may use third-party services to provide our services, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li><strong className="text-white">Stripe:</strong> For payment processing (subject to Stripe's privacy policy)</li>
                  <li><strong className="text-white">Email Marketing Platforms:</strong> For newsletter and communication services</li>
                  <li><strong className="text-white">Analytics Services:</strong> To understand website usage and improve our services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
                <p className="text-gray-300 leading-relaxed">
                  We retain your personal information only as long as necessary to fulfill the purposes outlined in this privacy policy, 
                  unless a longer retention period is required or permitted by law. When we no longer need your information, we will 
                  securely delete or anonymize it.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our services are intended for individuals who are at least 18 years old. We do not knowingly collect personal 
                  information from children under 18. If we become aware that we have collected information from a child under 18, 
                  we will take steps to delete such information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">International Users</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you are accessing our services from outside the United States, please be aware that your information may be 
                  transferred to, stored, and processed in the United States where our servers are located and our central database 
                  is operated.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
                  Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically 
                  for any changes.
                </p>
              </div>

              <div className="bg-dark-900 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="text-primary-500" size={18} />
                  <span>Michelle2.0fit@gmail.com</span>
                </div>
                <p className="text-gray-300 mt-2">
                  FitByMi, LLC<br />
                  Indianapolis, IN
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default PrivacyPolicyPage;