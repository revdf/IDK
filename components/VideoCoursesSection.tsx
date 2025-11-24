'use client'

import { VideoCourse } from '@/types'
import { videoCourses } from '@/data/videoCourses'
import { Star, Users, Clock, Play } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface VideoCoursesSectionProps {
  limit?: number
}

export default function VideoCoursesSection({ limit }: VideoCoursesSectionProps) {
  const courses = limit ? videoCourses.slice(0, limit) : videoCourses

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
        >
          <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <div className="text-6xl">{course.thumbnail}</div>
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
              <Play size={48} className="text-white opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute top-2 right-2 px-2 py-1 bg-white rounded text-xs font-semibold">
              {course.level}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{course.rating}</span>
              <span className="text-sm text-gray-500">
                ({course.students.toLocaleString()} alunos)
              </span>
            </div>
            
            <h3 className="font-bold text-lg mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {course.description}
            </p>
            
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>{course.modules} módulos</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary-600">
                R$ {course.price}
              </div>
              <Link
                href={`/courses/${course.id}`}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                Ver Curso
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

