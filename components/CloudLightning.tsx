'use client'

import { motion } from 'framer-motion'

export default function CloudLightning() {
  return (
    <div className="relative inline-block">
      {/* Nuvem */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <svg
          width="100"
          height="60"
          viewBox="0 0 100 60"
          className="text-gray-400 drop-shadow-lg"
        >
          <path
            d="M15 45 Q5 35 15 30 Q10 20 20 25 Q25 15 35 20 Q45 10 55 20 Q65 15 70 25 Q80 20 90 30 Q95 35 85 40 Q90 45 80 45 Q70 50 60 45 Q50 50 40 45 Q30 50 20 45 Z"
            fill="currentColor"
            opacity="0.8"
          />
        </svg>
      </motion.div>

      {/* Raios animados */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0, 1, 0.8, 0],
            scale: [0.5, 1.3, 1, 0.5],
            y: [0, -20, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 1]
          }}
          className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20"
          style={{ marginLeft: `${(i - 1) * 20}px` }}
        >
          <svg
            width="25"
            height="35"
            viewBox="0 0 25 35"
            className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
          >
            <path
              d="M12.5 0 L18 12 L12.5 9 L15 18 L10 14 L12.5 24 L7 18 L10 22 L7 30 L12.5 24 L15 30 L12.5 35"
              fill="currentColor"
              stroke="white"
              strokeWidth="0.5"
              opacity="0.9"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

