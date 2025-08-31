// schemas/index.js

import service from './service'
import teamMember from './teamMembers'
import caseStudy from './caseStudy'
import blog from './blog'
import testimonial from './testimonials'
import award from './award'
import tool from './tool'
import course from './course'
import freeCourse from './freeCourses'
import faq from './faq'

export const schemaTypes = [teamMember, service, caseStudy, blog, testimonial, award, tool, course, faq, freeCourse]