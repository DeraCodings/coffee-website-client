import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Car,
  Train,
  Bus,
  Wifi,
  CreditCard,
  Accessibility,
  Coffee,
} from "lucide-react";
import Image from "next/image";
import { fraunces, lato, playfairDisplay } from "@/utils/font-config";

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#443227] px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-[#bf935f]" />
          <h2 className={`mb-4 text-4xl font-bold tracking-tight md:text-5xl ${playfairDisplay.className}`}>
            Our Location
          </h2>
          <p className={`text-lg text-gray-200 ${lato.className}`}>
            Find us in the heart of Brewtown, where great coffee meets
            community.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Map and Address Section */}
          <div className="mb-16 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className={`mb-6 text-3xl font-bold text-[#443227] ${playfairDisplay.className}`}>
                Visit Our Roastery & Café
              </h2>
              <div className="space-y-6">
                <Card className="border-[#bf935f]/20 p-6">
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-6 w-6 shrink-0 text-[#bf935f]" />
                    <div>
                      <h3 className={`mb-2 text-lg font-semibold text-[#443227] ${fraunces.className}`}>
                        Address
                      </h3>
                      <p className={`text-[#171310] ${lato.className}`}>
                        123 Arabica Avenue
                        <br />
                        Brewtown, BT 12345
                        <br />
                        United States
                      </p>
                      <Button
                        className={`mt-3 bg-[#bf935f] hover:bg-[#bf935f]/90 ${fraunces.className}`}
                        size="sm"
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="border-[#bf935f]/20 p-6">
                  <div className="flex items-start">
                    <Clock className="mr-3 h-6 w-6 shrink-0 text-[#bf935f]" />
                    <div>
                      <h3 className={`mb-2 text-lg font-semibold text-[#443227] ${fraunces.className}`}>
                        Hours
                      </h3>
                      <div className={`space-y-1 text-[#171310] ${lato.className}`}>
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span className="font-medium">6:30am - 7:00pm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span className="font-medium">7:00am - 8:00pm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span className="font-medium">8:00am - 6:00pm</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        Extended hours during special events and holidays
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border-[#bf935f]/20 p-6">
                  <div className="flex items-start">
                    <Phone className="mr-3 h-6 w-6 shrink-0 text-[#bf935f]" />
                    <div>
                      <h3 className={`mb-2 text-lg font-semibold text-[#443227] ${fraunces.className}`}>
                        Contact
                      </h3>
                      <p className={`text-[#171310] ${lato.className}`}>
                        <strong>Phone:</strong> (555) 123-BREW
                        <br />
                        <strong>Email:</strong>{" "}
                        <a
                          href="mailto:hello@brewandbean.co"
                          className="text-[#bf935f] hover:underline"
                        >
                          hello@brewandbean.co
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="relative h-[400px] overflow-hidden rounded-xl lg:h-auto">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Interactive map showing Brew & Bean Co. location"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 p-3 backdrop-blur">
                <p className={`text-sm font-medium text-[#443227] ${lato.className}`}>
                  📍 Brew & Bean Co.
                </p>
                <p className={`text-xs text-gray-600 ${lato.className}`}>123 Arabica Avenue</p>
              </div>
            </div>
          </div>

          {/* Transportation Section */}
          <section className="mb-16">
            <h2 className={`mb-8 text-center text-3xl font-bold text-[#443227] ${fraunces.className}`}>
              Getting Here
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className={`border-[#bf935f]/20 p-6 text-center ${lato.className}`}>
                <Car className="mx-auto mb-4 h-10 w-10 text-[#bf935f]" />
                <h3 className={`mb-2 text-lg font-semibold text-[#443227] ${fraunces.className}`}>
                  By Car
                </h3>
                <p className={`text-[#171310] ${lato.className}`}>
                  Free parking available in our lot behind the building. Street
                  parking also available with 2-hour limits.
                </p>
              </Card>

              <Card className="border-[#bf935f]/20 p-6 text-center">
                <Train className="mx-auto mb-4 h-10 w-10 text-[#bf935f]" />
                <h3 className={`mb-2 text-lg font-semibold text-[#443227] ${fraunces.className}`}>
                  By Train
                </h3>
                <p className={`text-[#171310] ${lato.className}`}>
                  Brewtown Central Station is just a 5-minute walk away. Take
                  the Blue or Green line to Arabica Avenue stop.
                </p>
              </Card>

              <Card className="border-[#bf935f]/20 p-6 text-center">
                <Bus className="mx-auto mb-4 h-10 w-10 text-[#bf935f]" />
                <h3 className={`mb-2 text-lg font-semibold text-[#443227] ${fraunces.className}`}>
                  By Bus
                </h3>
                <p className={`text-[#171310] ${lato.className}`}>
                  Multiple bus routes stop nearby. Routes 15, 22, and 34 all
                  have stops within 2 blocks of our location.
                </p>
              </Card>
            </div>
          </section>

          {/* Amenities Section */}
          <section className="mb-16">
            <h2 className={`mb-8 text-center text-3xl font-bold text-[#443227] ${fraunces.className}`}>
              Amenities & Services
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center rounded-lg bg-gray-50 p-4">
                <Wifi className="mr-3 h-6 w-6 text-[#bf935f]" />
                <div>
                  <h3 className={`font-semibold text-[#443227] ${fraunces.className}`}>
                    Free WiFi
                  </h3>
                  <p className={`text-sm text-gray-600 ${lato.className}`}>
                    High-speed internet throughout
                  </p>
                </div>
              </div>

              <div className="flex items-center rounded-lg bg-gray-50 p-4">
                <CreditCard className="mr-3 h-6 w-6 text-[#bf935f]" />
                <div>
                  <h3 className={`font-semibold text-[#443227] ${fraunces.className}`}>
                    All Payment Methods
                  </h3>
                  <p className={`text-sm text-gray-600 ${lato.className}`}>
                    Cash, cards, and mobile payments
                  </p>
                </div>
              </div>

              <div className="flex items-center rounded-lg bg-gray-50 p-4">
                <Accessibility className="mr-3 h-6 w-6 text-[#bf935f]" />
                <div>
                  <h3 className={`font-semibold text-[#443227] ${fraunces.className}`}>
                    Fully Accessible
                  </h3>
                  <p className={`text-sm text-gray-600 ${lato.className}`}>
                    Wheelchair accessible entrance
                  </p>
                </div>
              </div>

              <div className="flex items-center rounded-lg bg-gray-50 p-4">
                <Coffee className="mr-3 h-6 w-6 text-[#bf935f]" />
                <div>
                  <h3 className={`font-semibold text-[#443227] ${fraunces.className}`}>
                    Outdoor Seating
                  </h3>
                  <p className={`text-sm text-gray-600 ${lato.className}`}>
                    Pet-friendly patio area
                  </p>
                </div>
              </div>

              <div className="flex items-center rounded-lg bg-gray-50 p-4">
                <Mail className="mr-3 h-6 w-6 text-[#bf935f]" />
                <div>
                  <h3 className={`font-semibold text-[#443227] ${fraunces.className}`}>
                    Private Events
                  </h3>
                  <p className={`text-sm text-gray-600 ${lato.className}`}>
                    Book our space for meetings
                  </p>
                </div>
              </div>

              <div className="flex items-center rounded-lg bg-gray-50 p-4">
                <Clock className="mr-3 h-6 w-6 text-[#bf935f]" />
                <div>
                  <h3 className={`font-semibold text-[#443227] ${fraunces.className}`}>
                    Extended Hours
                  </h3>
                  <p className={`text-sm text-gray-600 ${lato.className}`}>
                    Open early, stay late
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Neighborhood Section */}
          <section>
            <h2 className={`mb-8 text-center text-3xl font-bold text-[#443227] ${fraunces.className}`}>
              Explore the Neighborhood
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className={`mb-4 text-xl font-semibold text-[#443227] ${fraunces.className}`}>
                  What&apos;s Nearby
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="mr-3 h-2 w-2 rounded-full bg-[#bf935f]"></div>
                    <span className={`text-[#171310] ${lato.className}`}>
                      Brewtown Public Library - 2 blocks
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 h-2 w-2 rounded-full bg-[#bf935f]"></div>
                    <span className={`text-[#171310] ${lato.className}`}>
                      Central Park - 5 minute walk
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 h-2 w-2 rounded-full bg-[#bf935f]"></div>
                    <span className={`text-[#171310] ${lato.className}`}>
                      Artisan Market - Saturdays, 1 block
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 h-2 w-2 rounded-full bg-[#bf935f]"></div>
                    <span className={`text-[#171310] ${lato.className}`}>
                      Historic District - 10 minute walk
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative h-[250px] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Brewtown neighborhood street view"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
