import { Card } from "@/components/ui/card";
import { fraunces, lato, playfairDisplay } from "@/utils/font-config";
import { Scale, AlertTriangle, CreditCard, Truck } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#443227] px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <Scale className="mx-auto mb-4 h-12 w-12 text-[#bf935f]" />
          <h1 className={`${playfairDisplay.className} mb-4 text-4xl font-bold tracking-tight md:text-5xl`}>
            Terms & Conditions
          </h1>
          <p className={`${lato.className} text-lg text-gray-200`}>
            Please read these terms carefully before using our services.
          </p>
          <p className={`${lato.className} mt-2 text-sm text-gray-300`}>
            Last updated: January 15, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="mb-8 border-[#bf935f]/20 bg-[#bf935f]/5 p-6">
            <div className="flex items-start">
              <AlertTriangle className="mr-3 h-6 w-6 shrink-0 text-[#bf935f]" />
              <div>
                <h3 className={`${lato.className} mb-2 text-lg font-semibold text-[#443227]`}>
                  Important Notice
                </h3>
                <p className={`${lato.className} text-[#171310]`}>
                  By accessing and using Brew & Bean Co.&apos;s services, you

                  agree to be bound by these Terms and Conditions. If you do not
                  agree with any part of these terms, please do not use our
                  services.
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className={`${fraunces.className} mb-4 text-2xl font-bold text-[#443227]`}>
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-[#171310]">
                <p className={lato.className}>
                  These Terms and Conditions (&quot;Terms&quot;) govern your use
                  of Brew & Bean Co.&apos;s website, mobile applications, and
                  services (collectively, the &quot;Service&quot;). By accessing
                  or using our Service, you agree to be bound by these Terms.
                </p>
                <p>
                  We reserve the right to modify these Terms at any time.
                  Changes will be effective immediately upon posting on our
                  website. Your continued use of the Service after changes are
                  posted constitutes acceptance of the modified Terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className={`${fraunces.className} mb-4 text-2xl font-bold text-[#443227]`}>
                2. Use of Service
              </h2>
              <div className="space-y-4 text-[#171310]">
                <h3 className={`${lato.className} text-lg font-semibold`}>Permitted Use</h3>
                <p className={`${lato.className}`}>
                  You may use our Service for lawful purposes only. You agree
                  not to:
                </p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful or malicious content</li>
                  <li>Interfere with the Service&apos;s operation</li>
                  <li>Attempt unauthorized access to our systems</li>
                </ul>

                <h3 className={`${fraunces.className} mt-6 text-lg font-semibold`}>
                  Account Responsibility
                </h3>
                <p className={`${lato.className}`}>
                  If you create an account, you are responsible for maintaining
                  its confidentiality and all activities under your account. You
                  must notify us immediately of any unauthorized use.
                </p>
              </div>
            </section>

            <section>
              <h2 className={`${fraunces.className} mb-4 text-2xl font-bold text-[#443227]`}>
                3. Products and Services
              </h2>
              <div className="space-y-4 text-[#171310]">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-[#bf935f]/20 p-4">
                    <div className="mb-3 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-[#bf935f]" />
                      <h3 className={`${fraunces.className} font-semibold`}>Pricing & Payment</h3>
                    </div>
                    <ul className={`${lato.className} space-y-1 text-sm`}>
                      <li>• Prices are subject to change without notice</li>
                      <li>• Payment is due at time of purchase</li>
                      <li>
                        • We accept major credit cards and digital payments
                      </li>
                      <li>• All sales are final unless otherwise stated</li>
                    </ul>
                  </Card>

                  <Card className="border-[#bf935f]/20 p-4">
                    <div className="mb-3 flex items-center">
                      <Truck className="mr-2 h-5 w-5 text-[#bf935f]" />
                      <h3 className={`${fraunces.className} font-semibold`}>Delivery & Pickup</h3>
                    </div>
                    <ul className={`${lato.className} space-y-1 text-sm`}>
                      <li>• Delivery times are estimates, not guarantees</li>
                      <li>• Risk of loss passes to you upon delivery</li>
                      <li>• Special handling may incur additional fees</li>
                      <li>• Pickup orders must be claimed within 24 hours</li>
                    </ul>
                  </Card>
                </div>

                <h3 className={`${fraunces.className} text-lg font-semibold`}>Product Quality</h3>
                <p className={`${lato.className}`}>
                  We strive to provide accurate product descriptions and
                  high-quality coffee. However, natural variations in coffee
                  beans may result in slight differences in taste, aroma, and
                  appearance.
                </p>
              </div>
            </section>

            <section>
              <h2 className={`${fraunces.className} mb-4 text-2xl font-bold text-[#443227]`}>
                4. Workshops and Events
              </h2>
              <div className="space-y-4 text-[#171310]">
                <h3 className={`${fraunces.className} text-lg font-semibold`}>
                  Registration and Attendance
                </h3>
                <ul className={`${lato.className} ml-6 list-disc space-y-2`}>
                  <li>Workshop registration requires advance payment</li>
                  <li>
                    Cancellations must be made at least 24 hours in advance for
                    a full refund
                  </li>
                  <li>
                    We reserve the right to cancel workshops due to insufficient
                    enrollment
                  </li>
                  <li>
                    Participants must follow all safety guidelines and
                    instructions
                  </li>
                </ul>

                <h3 className={`${fraunces.className} text-lg font-semibold`}>Liability</h3>
                <p className={`${lato.className}`}>
                  Participation in workshops and events is at your own risk. We
                  are not liable for injuries or accidents that may occur during
                  activities.
                </p>
              </div>
            </section>

            <section>
              <h2 className={`${fraunces.className} mb-4 text-2xl font-bold text-[#443227]`}>
                5. Intellectual Property
              </h2>
              <div className="space-y-4 text-[#171310]">
                <p className={`${lato.className}`}>
                  All content on our Service, including text, graphics, logos,
                  images, and software, is owned by Brew & Bean Co. or our
                  licensors and is protected by copyright and other intellectual
                  property laws.
                </p>
                <p className={`${lato.className}`}>
                  You may not reproduce, distribute, modify, or create
                  derivative works from our content without express written
                  permission.
                </p>
              </div>
            </section>

            <section>
              <h2 className={`${fraunces.className} mb-4 text-2xl font-bold text-[#443227]`}>
                6. Privacy
              </h2>
              <div className="space-y-4 text-[#171310]">
                <p className={`${lato.className}`}>
                  Your privacy is important to us. Please review our Privacy
                  Policy, which explains how we collect, use, and protect your
                  information when you use our Service.
                </p>
              </div>
            </section>

            <section>
              <h2 className={`${fraunces.className} mb-4 text-2xl font-bold text-[#443227]`}>
                7. Limitation of Liability
              </h2>
              <div className="space-y-4 text-[#171310]">
                <p className={`${lato.className}`}>
                  To the fullest extent permitted by law, Brew & Bean Co. shall
                  not be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including but not limited
                  to loss of profits, data, or use.
                </p>
                <p className={`${lato.className}`}>
                  Our total liability for any claim arising from these Terms or
                  your use of the Service shall not exceed the amount you paid
                  for the specific product or service giving rise to the claim.
                </p>
              </div>
            </section>

            <section>
              <h2 className={`${fraunces.className} mb-4 text-2xl font-bold text-[#443227]`}>
                8. Governing Law
              </h2>
              <div className="space-y-4 text-[#171310]">
                <p className={`${lato.className}`}>
                  These Terms are governed by and construed in accordance with
                  the laws of [Your State/Country], without regard to conflict
                  of law principles.
                </p>
                <p className={`${lato.className}`}>
                  Any disputes arising from these Terms or your use of the
                  Service shall be resolved through binding arbitration in
                  accordance with the rules of the American Arbitration
                  Association.
                </p>
              </div>
            </section>

            <section>
              <h2 className={`${fraunces.className} mb-4 text-2xl font-bold text-[#443227]`}>
                9. Contact Information
              </h2>
              <div className="space-y-4 text-[#171310]">
                <p className={`${lato.className}`}>
                  If you have questions about these Terms, please contact us:
                </p>
                <p className={`${lato.className}`}>
                  Email:{" "}
                  <a
                    href="mailto:legal@brewandbean.co"
                    className="text-[#bf935f] hover:underline"
                  >
                    legal@brewandbean.co
                  </a>
                </p>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:legal@brewandbean.co"
                      className="text-[#bf935f] hover:underline"
                    >
                      legal@brewandbean.co
                    </a>
                  </p>
                  <p>
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
  );
}
