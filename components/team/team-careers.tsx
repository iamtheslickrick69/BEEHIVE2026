"use client"

import { motion } from "framer-motion"
import { Briefcase, MapPin, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const openPositions = [
  {
    title: "Equipment Technician",
    location: "St. George, UT",
    type: "Full-time",
    description: "Join our service team to maintain and repair construction equipment.",
  },
  {
    title: "Delivery Driver",
    location: "St. George, UT",
    type: "Full-time",
    description: "CDL required. Deliver equipment to job sites throughout Southern Utah.",
  },
  {
    title: "Customer Service Representative",
    location: "St. George, UT",
    type: "Part-time",
    description: "Help customers find the right equipment and coordinate rentals.",
  },
]

export function TeamCareers() {
  return (
    <section id="careers" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our
              <span className="text-primary block">Growing Team</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              We&apos;re always looking for talented, hardworking individuals who share our passion for excellent
              service. Join the BeeHive family and build a rewarding career in the equipment rental industry.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">Competitive pay and benefits</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">Paid training and certifications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">Work in beautiful Southern Utah</span>
              </div>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="mailto:careers@beehiverental.com">
                Send Your Resume
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right - Open Positions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">Open Positions</h3>
            {openPositions.map((position, index) => (
              <div
                key={position.title}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {position.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {position.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{position.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}

            <p className="text-sm text-muted-foreground text-center pt-4">
              Don&apos;t see a position that fits? Send your resume to{" "}
              <a href="mailto:careers@beehiverental.com" className="text-primary hover:underline">
                careers@beehiverental.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
