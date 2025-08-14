import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
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
                <FileText className="inline-block mr-3 text-primary-500" size={36} />
                Terms of Service
              </h1>
              <p className="text-gray-300">
                Please read these terms and conditions carefully before using our services.
              </p>
              <p className="text-sm text-gray-400 mt-4">
                Last updated: Last updated: August 2025
              </p>
            </div>

            <div className="bg-dark-800 rounded-xl p-8 space-y-8">
              <div>
                <p className="text-gray-300 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of the FitByMi, LLC website and fitness coaching services 
                  operated by Michelle Oliveira ("we," "our," or "us"). By accessing or using our services, you agree to be bound by these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  By accessing and using our website and services, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Description of Services</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  FitByMi, LLC provides online fitness coaching services, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li>Personalized workout plans and training programs</li>
                  <li>Nutrition coaching and meal planning</li>
                  <li>Posing instruction for fitness competitions</li>
                  <li>Online coaching and support through various platforms</li>
                  <li>Educational content and resources</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Health and Safety</h3>
                    <p className="text-gray-300 leading-relaxed">
                      You acknowledge that participation in fitness programs involves inherent risks. You should consult with a physician 
                      before beginning any exercise program. You participate in our programs at your own risk and assume full responsibility 
                      for any injuries that may occur.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Accurate Information</h3>
                    <p className="text-gray-300 leading-relaxed">
                      You agree to provide accurate, complete, and up-to-date information when registering for our services and to update 
                      such information as necessary to maintain its accuracy.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Prohibited Uses</h3>
                    <p className="text-gray-300 leading-relaxed mb-3">You may not use our services:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-gray-300">
                      <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                      <li>To violate any international, federal, provincial, or state regulations or laws</li>
                      <li>To transmit or procure the sending of any advertising or promotional material without consent</li>
                      <li>To impersonate or attempt to impersonate the company, employees, or other users</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Pricing and Billing</h3>
                    <p className="text-gray-300 leading-relaxed">
                      All prices are listed in US dollars. Payment is required at the time of purchase for one-time services. 
                      For subscription services, you will be billed monthly or as specified in your selected plan.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Refund Policy</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Due to the personalized nature of our coaching services, all sales are final. However, we are committed to your 
                      satisfaction and will work with you to address any concerns. Refunds may be considered on a case-by-case basis 
                      within 7 days of purchase.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Subscription Cancellation</h3>
                    <p className="text-gray-300 leading-relaxed">
                      You may cancel your subscription at any time. Cancellations will take effect at the end of your current billing cycle. 
                      You will continue to have access to the service until the end of your paid period.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed">
                  All content provided through our services, including workout plans, nutrition guides, videos, and educational materials, 
                  is the intellectual property of FitByMi, LLC. You may not reproduce, distribute, or create derivative works without 
                  our express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Disclaimers and Limitations</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">No Medical Advice</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Our services are for educational and fitness purposes only. We are not medical professionals, and our advice 
                      should not be considered medical advice. Always consult with healthcare professionals before making significant 
                      changes to your diet or exercise routine.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Results Disclaimer</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Results may vary from person to person. We cannot guarantee specific results from our programs, as individual 
                      results depend on various factors including effort, consistency, genetics, and adherence to the program.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h3>
                    <p className="text-gray-300 leading-relaxed">
                      To the fullest extent permitted by law, FitByMi, LLC shall not be liable for any indirect, incidental, special, 
                      consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other 
                      intangible losses.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Privacy</h2>
                <p className="text-gray-300 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, 
                  to understand our practices.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, 
                  including without limitation if you breach the Terms. Upon termination, your right to use the services will cease immediately.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide 
                  at least 30 days notice prior to any new terms taking effect.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                <p className="text-gray-300 leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of the State of Indiana, without regard to conflict of law provisions.
                </p>
              </div>

              <div className="bg-dark-900 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-3">
                  If you have any questions about these Terms of Service, please contact us:
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

export default TermsOfServicePage;