"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wrench, Send, Phone, MapPin, Clock } from "lucide-react"

export function RepairCTA() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Request Service</h3>
            </div>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="repair-name">Name</Label>
                  <Input id="repair-name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repair-phone">Phone</Label>
                  <Input id="repair-phone" type="tel" placeholder="(435) 555-1234" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repair-email">Email</Label>
                <Input id="repair-email" type="email" placeholder="you@example.com" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="repair-equipment">Equipment Type</Label>
                  <Select>
                    <SelectTrigger id="repair-equipment">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excavator">Excavator</SelectItem>
                      <SelectItem value="skid-steer">Skid Steer</SelectItem>
                      <SelectItem value="generator">Generator</SelectItem>
                      <SelectItem value="aerial-lift">Aerial Lift</SelectItem>
                      <SelectItem value="welder">Welder</SelectItem>
                      <SelectItem value="compressor">Air Compressor</SelectItem>
                      <SelectItem value="mower">Lawn Equipment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repair-brand">Brand/Model</Label>
                  <Input id="repair-brand" placeholder="e.g. CAT 308" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repair-issue">Describe the Issue</Label>
                <Textarea
                  id="repair-issue"
                  placeholder="What's wrong with the equipment? Include any error codes or symptoms..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repair-urgency">Urgency</Label>
                <Select>
                  <SelectTrigger id="repair-urgency">
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency - Down on Job Site</SelectItem>
                    <SelectItem value="urgent">Urgent - Need within 48 hours</SelectItem>
                    <SelectItem value="standard">Standard - Within a week</SelectItem>
                    <SelectItem value="scheduled">Scheduled Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12">
                <Send className="w-4 h-4 mr-2" />
                Submit Service Request
              </Button>
            </form>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Need Repairs
                <span className="text-primary block">Now?</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Equipment down on a job site? We offer emergency repair services with priority scheduling for urgent
                situations. Call us directly for immediate assistance.
              </p>
            </div>

            {/* Emergency Call */}
            <div className="bg-accent text-accent-foreground rounded-xl p-6">
              <h3 className="font-semibold mb-2">Emergency Service Line</h3>
              <a href="tel:+14355551234" className="text-2xl font-bold hover:underline flex items-center gap-2">
                <Phone className="w-6 h-6" />
                (435) 555-1234
              </a>
              <p className="text-sm mt-2 opacity-90">Available Mon-Sat 7AM-6PM for emergency calls</p>
            </div>

            {/* Service Bay Info */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Service Department</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>1234 Industrial Way, St. George, UT 84770</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Service Hours: Mon-Fri 7AM-5PM, Sat 8AM-2PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>Service Direct: (435) 555-1235</span>
                </div>
              </div>
            </div>

            {/* Warranty Info */}
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <h3 className="font-semibold text-foreground mb-2">90-Day Repair Warranty</h3>
              <p className="text-muted-foreground text-sm">
                All repairs are backed by our 90-day parts and labor warranty. If the same issue recurs, we&apos;ll fix
                it at no additional charge.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
