"use client"

import { motion } from "framer-motion"
import { Mail, Phone } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    id: "jenny-baker",
    name: "Jenny Baker",
    role: "Customer Service & Sales",
    department: "Sales",
    image: "/team-jennybaker.jpg",
  },
  {
    id: "rickelle-limb",
    name: "Rickelle Limb",
    role: "Equipment Repair Coordinator",
    department: "Service",
    image: "/team-rickellelimb.jpg",
  },
  {
    id: "nicole-souders",
    name: "Nicole Souders",
    role: "Counter",
    department: "Customer Service",
    image: "/team-nicolesouders.jpg",
  },
  {
    id: "taunya-somerville",
    name: "Taunya Somerville",
    role: "Counter",
    department: "Customer Service",
    image: "/team-taunyasomerville.jpg",
  },
  {
    id: "ben-campbell",
    name: "Ben Campbell",
    role: "Mechanic",
    department: "Service",
    image: "/team-bencampbell.jpg",
  },
  {
    id: "terry-lee",
    name: "Terry Lee",
    role: "Mechanic",
    department: "Service",
    image: "/team-terrylee.jpg",
  },
  {
    id: "jody-brinkerhoff",
    name: "Jody Brinkerhoff",
    role: "Mechanic",
    department: "Service",
    image: "/team-jodybrinkerhoff.jpg",
  },
  {
    id: "jeremy-stratman",
    name: "Jeremy Stratman",
    role: "Delivery Driver",
    department: "Operations",
    image: "/team-jeremystratman.jpg",
  },
  {
    id: "delano-gonzales",
    name: "Delano Gonzales",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-delanogonzales.jpg",
  },
  {
    id: "hunter-jones",
    name: "Hunter Jones",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-hunterjones.jpg",
  },
  {
    id: "jake-ryan",
    name: "Jake Ryan",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-jakeryan.jpg",
  },
  {
    id: "terron-meadows",
    name: "Terron Meadows",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-terronmeadows.jpg",
  },
  {
    id: "brayden-jensen",
    name: "Brayden Jensen",
    role: "Yard Tech",
    department: "Operations",
    image: "/team-braydenjensen.jpg",
  },
  {
    id: "julie-campbell",
    name: "Julie Campbell",
    role: "Member",
    department: "Leadership",
    image: "/team-juliecampbell.jpg",
  },
]

export function TeamGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all"
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`${member.image}?v=${Date.now()}`}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Contact Links on Hover */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href="mailto:beehiverental@infowest.com"
                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href="tel:+14356286663"
                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={`Call ${member.name}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {member.department}
                </span>
                <h3 className="font-semibold text-foreground mt-2">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
