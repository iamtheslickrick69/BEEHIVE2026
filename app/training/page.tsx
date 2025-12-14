import { TrainingHeader } from "@/components/training/training-header"
import { TrainingCategories } from "@/components/training/training-categories"
import { TrainingVideos } from "@/components/training/training-videos"
import { TrainingCTA } from "@/components/training/training-cta"

export const metadata = {
  title: "Training Center | BeeHive Rental & Sales LLC",
  description:
    "Learn how to safely operate rental equipment with our free video training library. Excavators, skid steers, aerial lifts, and more.",
}

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      <TrainingHeader />
      <TrainingCategories />
      <TrainingVideos />
      <TrainingCTA />
    </div>
  )
}
