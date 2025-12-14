"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, Clock, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { VideoModal } from "@/components/ui/video-modal"

const featuredCourses = [
  {
    id: "excavator-basics",
    title: "Mini Excavator Operation Basics",
    description:
      "Learn the fundamentals of mini excavator operation including controls, safety checks, and basic digging techniques.",
    duration: "18 min",
    level: "Beginner",
    category: "Excavation",
    thumbnail: "/mini-excavator-training-safety-operation-construct.jpg",
    lessons: 5,
  },
  {
    id: "scissor-lift-safety",
    title: "Scissor Lift Safety & Operation",
    description:
      "Essential safety training for scissor lift operation including fall protection and inspection procedures.",
    duration: "20 min",
    level: "Beginner",
    category: "Aerial Lifts",
    thumbnail: "/scissor-lift-safety-training-aerial-work-platform.jpg",
    lessons: 5,
  },
  {
    id: "skid-steer-intro",
    title: "Skid Steer Loader Introduction",
    description: "Complete guide to skid steer operation including pre-operation inspection and basic controls.",
    duration: "22 min",
    level: "Beginner",
    category: "Excavation",
    thumbnail: "/skid-steer-loader-training-operation-construction.jpg",
    lessons: 6,
  },
]

const levelColors = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-orange-100 text-orange-700",
}

export function TrainingPreview() {
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string }>({
    isOpen: false,
    title: "",
  })

  return (
    <section id="training" className="py-24 bg-muted/80">
      {" "}
      {/* Dark muted background */}
      <div className="max-w-7xl mx-auto px-4">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-primary font-semibold text-sm tracking-wider uppercase">Training Center</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Learn Before You Rent</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Free equipment operation videos to help you work safely and efficiently.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0 bg-transparent">
              <Link href="/training">
                View All Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <ScrollAnimation key={course.id} delay={index * 0.1}>
              <div
                onClick={() => setVideoModal({ isOpen: true, title: course.title })}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary">{course.category}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[course.level as keyof typeof levelColors]}`}
                    >
                      {course.level}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BarChart3 className="w-4 h-4" />
                      {course.lessons} lessons
                    </div>
                    <span className="text-primary text-sm font-medium">Watch Now</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, title: "" })}
        title={videoModal.title}
      />
    </section>
  )
}
