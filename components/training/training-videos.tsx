"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Clock, BarChart3, CheckCircle, Lock, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrainingVideo {
  id: string
  title: string
  description: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  thumbnail: string
  lessons: number
  completed?: boolean
  premium?: boolean
}

const trainingVideos: TrainingVideo[] = [
  {
    id: "excavator-basics",
    title: "Mini Excavator Operation Basics",
    description:
      "Learn the fundamentals of mini excavator operation including controls, safety checks, and basic digging techniques.",
    duration: "18 min",
    level: "Beginner",
    category: "Excavation",
    thumbnail: "/training-excavator-operation-basics.jpg",
    lessons: 5,
    completed: false,
  },
  {
    id: "excavator-advanced",
    title: "Advanced Excavator Techniques",
    description: "Master precision digging, trenching, and grading operations with professional tips and techniques.",
    duration: "32 min",
    level: "Advanced",
    category: "Excavation",
    thumbnail: "/training-excavator-advanced-techniques.jpg",
    lessons: 8,
    completed: false,
  },
  {
    id: "skid-steer-intro",
    title: "Skid Steer Loader Introduction",
    description: "Complete guide to skid steer operation including pre-operation inspection and basic controls.",
    duration: "22 min",
    level: "Beginner",
    category: "Excavation",
    thumbnail: "/training-skid-steer-introduction.jpg",
    lessons: 6,
    completed: true,
  },
  {
    id: "trencher-operation",
    title: "Trencher Operation & Safety",
    description: "Safe trenching practices for irrigation, electrical, and plumbing installations.",
    duration: "15 min",
    level: "Beginner",
    category: "Excavation",
    thumbnail: "/training-trencher-operation-safety.jpg",
    lessons: 4,
    completed: false,
  },
  {
    id: "scissor-lift-safety",
    title: "Scissor Lift Safety & Operation",
    description:
      "Essential safety training for scissor lift operation including fall protection and inspection procedures.",
    duration: "20 min",
    level: "Beginner",
    category: "Aerial Lifts",
    thumbnail: "/training-scissor-lift-safety.jpg",
    lessons: 5,
    completed: false,
  },
  {
    id: "boom-lift-certification",
    title: "Boom Lift Certification Training",
    description: "Comprehensive boom lift training covering articulating and telescopic models.",
    duration: "45 min",
    level: "Intermediate",
    category: "Aerial Lifts",
    thumbnail: "/training-boom-lift-certification.jpg",
    lessons: 10,
    completed: false,
    premium: true,
  },
  {
    id: "forklift-basics",
    title: "Forklift Operation Fundamentals",
    description: "Learn proper forklift operation including load handling, stacking, and pedestrian safety.",
    duration: "28 min",
    level: "Beginner",
    category: "Aerial Lifts",
    thumbnail: "/training-forklift-fundamentals.jpg",
    lessons: 7,
    completed: false,
  },
  {
    id: "generator-setup",
    title: "Generator Setup & Maintenance",
    description: "Proper generator deployment, load calculation, and routine maintenance procedures.",
    duration: "16 min",
    level: "Beginner",
    category: "Power Equipment",
    thumbnail: "/training-generator-setup-maintenance.jpg",
    lessons: 4,
    completed: false,
  },
  {
    id: "welder-safety",
    title: "Welding Safety & Techniques",
    description: "Essential welding safety practices and basic MIG/TIG welding techniques.",
    duration: "35 min",
    level: "Intermediate",
    category: "Power Equipment",
    thumbnail: "/training-welding-safety-techniques.jpg",
    lessons: 8,
    completed: false,
  },
  {
    id: "air-compressor",
    title: "Air Compressor Operation",
    description: "Safe operation of portable air compressors and common pneumatic tool connections.",
    duration: "12 min",
    level: "Beginner",
    category: "Power Equipment",
    thumbnail: "/training-air-compressor-operation.jpg",
    lessons: 3,
    completed: false,
  },
  {
    id: "concrete-saw",
    title: "Concrete Saw Safety & Cutting",
    description: "Safe concrete cutting practices including blade selection and dust control.",
    duration: "18 min",
    level: "Intermediate",
    category: "Power Tools",
    thumbnail: "/training-concrete-saw-safety.jpg",
    lessons: 5,
    completed: false,
  },
  {
    id: "demolition-hammer",
    title: "Demolition Hammer Techniques",
    description: "Proper use of electric jackhammers for concrete and asphalt removal.",
    duration: "14 min",
    level: "Beginner",
    category: "Power Tools",
    thumbnail: "/training-demolition-hammer.jpg",
    lessons: 4,
    completed: false,
  },
  {
    id: "rotary-hammer",
    title: "Rotary Hammer Drilling",
    description: "Mastering concrete drilling and anchoring with rotary hammers.",
    duration: "16 min",
    level: "Beginner",
    category: "Power Tools",
    thumbnail: "/training-rotary-hammer-drilling.jpg",
    lessons: 4,
    completed: false,
  },
  {
    id: "stump-grinder",
    title: "Stump Grinder Operation",
    description: "Safe and efficient tree stump removal techniques.",
    duration: "20 min",
    level: "Intermediate",
    category: "Landscaping",
    thumbnail: "/training-stump-grinder-operation.jpg",
    lessons: 5,
    completed: false,
  },
  {
    id: "brush-cutter",
    title: "Walk-Behind Brush Cutter",
    description: "Land clearing techniques with walk-behind brush cutters.",
    duration: "15 min",
    level: "Beginner",
    category: "Landscaping",
    thumbnail: "/training-brush-cutter-operation.jpg",
    lessons: 4,
    completed: false,
  },
  {
    id: "tent-setup",
    title: "Frame Tent Setup Guide",
    description: "Professional tent installation including anchoring and safety considerations.",
    duration: "25 min",
    level: "Intermediate",
    category: "Event Setup",
    thumbnail: "/training-tent-setup-guide.jpg",
    lessons: 6,
    completed: false,
  },
  {
    id: "excavator-attachments",
    title: "Excavator Attachments Guide",
    description: "Using buckets, breakers, augers, and other excavator attachments safely.",
    duration: "28 min",
    level: "Intermediate",
    category: "Excavation",
    thumbnail: "/training-excavator-attachments.jpg",
    lessons: 7,
    completed: false,
  },
  {
    id: "aerial-rescue",
    title: "Aerial Lift Emergency Rescue",
    description: "Emergency descent procedures and rescue operations for aerial equipment.",
    duration: "22 min",
    level: "Advanced",
    category: "Aerial Lifts",
    thumbnail: "/training-aerial-rescue-procedures.jpg",
    lessons: 5,
    completed: false,
    premium: true,
  },
]

const levelColors = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-orange-100 text-orange-700",
}

export function TrainingVideos() {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: hoveredVideo === video.id ? 1.1 : 1,
                    }}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg"
                  >
                    {video.premium ? (
                      <Lock className="w-6 h-6 text-primary-foreground" />
                    ) : (
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    )}
                  </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>

                {/* Completed Badge */}
                {video.completed && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Completed
                  </div>
                )}

                {/* Premium Badge */}
                {video.premium && (
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Premium
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary">{video.category}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", levelColors[video.level])}>
                    {video.level}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{video.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BarChart3 className="w-4 h-4" />
                    {video.lessons} lessons
                  </div>
                  <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {video.premium ? "Unlock" : "Start Learning"}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
