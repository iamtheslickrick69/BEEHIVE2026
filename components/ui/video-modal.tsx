"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Play } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  videoUrl?: string
}

export function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-8 md:inset-16 lg:inset-24 bg-secondary rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-border"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-black">
              {videoUrl ? (
                <video src={videoUrl} controls autoPlay className="w-full h-full object-contain" />
              ) : (
                <div className="text-center text-white/60">
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 ml-1" />
                  </div>
                  <p className="text-lg">Video placeholder</p>
                  <p className="text-sm">Upload your training video here</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
