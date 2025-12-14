"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Phone, ClipboardCheck, Wrench, Truck } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: Phone,
    title: "Contact Us",
    description: "Call or submit a service request online. Describe the issue and we'll provide an initial assessment.",
  },
  {
    step: 2,
    icon: ClipboardCheck,
    title: "Diagnosis & Quote",
    description: "Our technicians diagnose the problem and provide a detailed repair estimate before any work begins.",
  },
  {
    step: 3,
    icon: Wrench,
    title: "Expert Repair",
    description: "Factory-trained technicians complete the repair using genuine or OEM-quality parts.",
  },
  {
    step: 4,
    icon: Truck,
    title: "Pickup or Delivery",
    description: "Pick up your equipment or schedule delivery. Every repair backed by our 90-day warranty.",
  },
]

function ProcessStep({ step, index }: { step: typeof steps[0], index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    margin: "-40% 0px -40% 0px",
    once: false
  })

  const StepIcon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.3 }}
      animate={{
        opacity: isInView ? 1 : 0.3,
        scale: isInView ? 1 : 0.95,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      {/* Connecting Line */}
      {index < steps.length - 1 && (
        <div className="absolute left-[29px] top-20 bottom-0 w-0.5 bg-white/10">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full bg-gradient-to-b from-[#E8C24A] to-transparent origin-top"
            style={{ transformOrigin: "top" }}
          />
        </div>
      )}

      <div
        className={`
          relative bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border transition-all duration-500
          ${isInView
            ? 'border-[#E8C24A] shadow-xl shadow-[#E8C24A]/20'
            : 'border-white/10'
          }
        `}
      >
        <div className="flex items-start gap-6">
          {/* Step Number */}
          <motion.div
            animate={{
              scale: isInView ? 1.1 : 1,
              backgroundColor: isInView ? 'rgba(232, 194, 74, 0.3)' : 'rgba(232, 194, 74, 0.1)'
            }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl backdrop-blur-sm flex items-center justify-center flex-shrink-0 relative z-10"
          >
            <span className={`font-bold text-2xl sm:text-3xl transition-colors duration-500 ${isInView ? 'text-[#E8C24A]' : 'text-white/40'}`}>
              {step.step}
            </span>
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{
                  backgroundColor: isInView ? 'rgba(232, 194, 74, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-lg flex items-center justify-center"
              >
                <StepIcon className={`w-5 h-5 transition-colors duration-500 ${isInView ? 'text-[#E8C24A]' : 'text-white/40'}`} />
              </motion.div>
              <h3 className={`text-lg sm:text-xl font-bold transition-colors duration-500 ${isInView ? 'text-white' : 'text-white/50'}`}>
                {step.title}
              </h3>
            </div>
            <motion.p
              animate={{
                opacity: isInView ? 1 : 0.4
              }}
              transition={{ duration: 0.3 }}
              className="text-white/70 text-sm sm:text-base leading-relaxed"
            >
              {step.description}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function RepairProcess() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black via-black/95 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">How It Works</h2>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
            Getting your equipment repaired is simple. Here&apos;s our streamlined process.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <ProcessStep key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
