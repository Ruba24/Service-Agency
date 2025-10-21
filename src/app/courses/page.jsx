import { Suspense } from 'react'
import AllCoursesPage from './AllCoursesPage'

export default function Page() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <AllCoursesPage />
    </Suspense>
  )
}
