"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Send, Video, Users, Building } from "lucide-react"

export function TrainingCTA() {
  return (
    <section className="py-20 bg-muted/50">
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
              Need Custom
              <span className="text-primary block">Training?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We offer personalized training sessions for individuals, teams, and organizations. Get hands-on
              instruction tailored to your specific equipment and project needs.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">On-Site Training</h3>
                  <p className="text-muted-foreground text-sm">
                    We come to your job site for hands-on equipment training with your team.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Group Sessions</h3>
                  <p className="text-muted-foreground text-sm">
                    Book group training for your crew at our facility with multiple equipment types.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Corporate Programs</h3>
                  <p className="text-muted-foreground text-sm">
                    Ongoing training partnerships for construction companies and contractors.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Request Training</h3>
            </div>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="train-name">Name</Label>
                  <Input id="train-name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="train-company">Company</Label>
                  <Input id="train-company" placeholder="Company name" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="train-email">Email</Label>
                  <Input id="train-email" type="email" placeholder="you@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="train-phone">Phone</Label>
                  <Input id="train-phone" type="tel" placeholder="(435) 555-1234" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="train-type">Training Type</Label>
                <Select>
                  <SelectTrigger id="train-type">
                    <SelectValue placeholder="Select training type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual Training</SelectItem>
                    <SelectItem value="onsite">On-Site Team Training</SelectItem>
                    <SelectItem value="group">Group Session at Facility</SelectItem>
                    <SelectItem value="corporate">Corporate Training Program</SelectItem>
                    <SelectItem value="certification">Equipment Certification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="train-equipment">Equipment of Interest</Label>
                <Select>
                  <SelectTrigger id="train-equipment">
                    <SelectValue placeholder="Select equipment category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excavators">Excavators & Earthmoving</SelectItem>
                    <SelectItem value="aerial">Aerial Lifts & Forklifts</SelectItem>
                    <SelectItem value="power">Power & Welding Equipment</SelectItem>
                    <SelectItem value="tools">Power Tools</SelectItem>
                    <SelectItem value="landscaping">Landscaping Equipment</SelectItem>
                    <SelectItem value="multiple">Multiple Categories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="train-message">Additional Details</Label>
                <Textarea
                  id="train-message"
                  placeholder="Tell us about your training needs, team size, preferred dates, etc."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12">
                <Send className="w-4 h-4 mr-2" />
                Submit Training Request
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
