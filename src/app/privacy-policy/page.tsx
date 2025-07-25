import { Card } from "@/components/ui/card";
import { fraunces, lato, playfairDisplay } from "@/utils/font-config";
import { Shield, Eye, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#443227] px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <Shield className="mx-auto mb-4 h-12 w-12 text-[#bf935f]" />
          <h1 className={`mb-4 text-4xl font-bold tracking-tight md:text-5xl ${playfairDisplay.className}`}>
            Privacy Policy
          </h1>
          <p className={`text-lg text-gray-200 ${lato.className}`}>
            Your privacy matters to us. Learn how we protect and handle your
            information.
          </p>
          <p className={`mt-2 text-sm text-gray-300 ${lato.className}`}>
            Last updated: January 15, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <Card className="mb-8 border-[#bf935f]/20 bg-[#bf935f]/5 p-6">
              <div className="flex items-start">
                <Eye className="mr-3 h-6 w-6 shrink-0 text-[#bf935f]" />
                <div>
                  <h3 className={`mb-2 text-lg font-semibold text-[#443227] ${fraunces.className}`}>
                    At a Glance
                  </h3>
                  <p className={`text-[#171310] ${lato.className}`}>
                    Brew & Bean Co. collects minimal personal information
                    necessary to provide our services. We never sell your data
                    and only share information as outlined in this policy.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              <section>
                <h2 className={`mb-4 text-2xl font-bold text-[#443227] ${fraunces.className}`}>
                  Information We Collect
                </h2>
                <div className="space-y-4 text-[#171310]">
                  <h3 className={`text-lg font-semibold ${fraunces.className}`}>
                    Personal Information
                  </h3>
                  <p className={`${lato.className}`}>When you interact with our services, we may collect:</p>
                  <ul className={`ml-6 list-disc space-y-2 ${lato.className}`}>
                    <li>
                      Name and contact information when you sign up for our
                      newsletter or loyalty program
                    </li>
                    <li>
                      Email address for workshop registrations and event
                      notifications
                    </li>
                    <li>
                      Phone number for order confirmations and delivery updates
                    </li>
                    <li>
                      Payment information when you make purchases (processed
                      securely through our payment partners)
                    </li>
                    <li>
                      Preferences and feedback you provide about our products
                      and services
                    </li>
                  </ul>

                  <h3 className={`mt-6 text-lg font-semibold ${fraunces.className}`}>
                    Automatically Collected Information
                  </h3>
                  <p className={`${lato.className}`}>Our website automatically collects certain information:</p>
                  <ul className={`ml-6 list-disc space-y-2 ${lato.className}`}>
                    <li>IP address and browser information</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Device type and operating system</li>
                    <li>
                      Cookies and similar tracking technologies (see our Cookie
                      Policy)
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className={`mb-4 text-2xl font-bold text-[#443227] ${fraunces.className}`}>
                  How We Use Your Information
                </h2>
                <div className="space-y-4 text-[#171310]">
                  <p>We use your information to:</p>
                  <ul className={`ml-6 list-disc space-y-2 ${lato.className}`}>
                    <li>Process orders and deliver products and services</li>
                    <li>
                      Send you newsletters, workshop updates, and promotional
                      offers (with your consent)
                    </li>
                    <li>
                      Improve our website, products, and customer experience
                    </li>
                    <li>
                      Respond to your inquiries and provide customer support
                    </li>
                    <li>
                      Comply with legal obligations and protect our business
                      interests
                    </li>
                    <li>
                      Analyze website usage to enhance functionality and content
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className={`mb-4 text-2xl font-bold text-[#443227] ${fraunces.className}`}>
                  Information Sharing
                </h2>
                <div className="space-y-4 text-[#171310]">
                  <p>We may share your information with:</p>
                  <ul className={`ml-6 list-disc space-y-2 ${lato.className}`}>
                    <li>
                      <strong>Service Providers:</strong> Third-party companies
                      that help us operate our business (payment processors,
                      email services, delivery partners)
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law
                      or to protect our rights and safety
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In connection with a
                      merger, acquisition, or sale of assets
                    </li>
                  </ul>
                  <p className={`${lato.className} mt-4 font-medium`}>
                    We never sell your personal information to third parties.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={`mb-4 text-2xl font-bold text-[#443227] ${fraunces.className}`}>
                  Data Security
                </h2>
                <div className="space-y-4 text-[#171310]">
                  <p className={`${lato.className}`}>
                    We implement appropriate technical and organizational
                    measures to protect your personal information against
                    unauthorized access, alteration, disclosure, or destruction.
                    This includes:
                  </p>
                  <ul className={`ml-6 list-disc space-y-2 ${lato.className}`}>
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and regular security updates</li>
                    <li>
                      Limited access to personal information on a need-to-know
                      basis
                    </li>
                    <li>Regular security audits and monitoring</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className={`mb-4 text-2xl font-bold text-[#443227] ${fraunces.className}`}>
                  Your Rights
                </h2>
                <div className="space-y-4 text-[#171310]">
                  <p>You have the right to:</p>
                  <ul className={`ml-6 list-disc space-y-2 ${lato.className}`}>
                    <li>Access the personal information we hold about you</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information</li>
                    <li>
                      Object to or restrict processing of your information
                    </li>
                    <li>Withdraw consent for marketing communications</li>
                    <li>Request a copy of your data in a portable format</li>
                  </ul>
                  <p className={`${lato.className} mt-4`}>
                    To exercise these rights, please contact us at{" "}
                    <a
                      href="mailto:privacy@brewandbean.co"
                      className={`text-[#bf935f] hover:underline ${lato.className}`}
                    >
                      privacy@brewandbean.co
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className={`mb-4 text-2xl font-bold text-[#443227] ${fraunces.className}`}>
                  Cookies and Tracking
                </h2>
                <div className={`space-y-4 text-[#171310] ${lato.className}`}>
                  <p>
                    We use cookies and similar technologies to enhance your
                    browsing experience. For detailed information about our
                    cookie usage, please see our Cookie Policy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className={`mb-4 text-2xl font-bold text-[#443227] ${fraunces.className}`}>
                  Contact Us
                </h2>
                <div className={`space-y-4 text-[#171310] ${lato.className}`}>
                  <p>
                    If you have questions about this Privacy Policy or our data
                    practices, please contact us:
                  </p>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-[#bf935f]" />
                      <span className="font-medium">Email:</span>
                      <a
                        href="mailto:privacy@brewandbean.co"
                        className={`ml-2 text-[#bf935f] hover:underline ${lato.className}`}
                      >
                        privacy@terraandbrews.co
                      </a>
                    </div>
                    <p className={`mt-2 ${lato.className}`}>
                      <strong>Address:</strong> 123 Arabica Avenue, Brewtown, BT
                      12345
                    </p>
                    <p>
                      <strong>Phone:</strong> (555) 123-BREW
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
