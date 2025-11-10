'use client';

import { useState } from 'react';

const CourseDescription = ({ description = '' }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  const isLong = description.length > 300;
  const preview = isLong ? `${description.substring(0, 300)}...` : description;

  return (
    <p className="text-lg text-gray-700 mb-4">
      {isLong ? (
        <>
          {showFullDesc ? description : preview}
          <button
            type="button"
            aria-expanded={showFullDesc}
            className="text-purple-600 text-sm cursor-pointer ml-2 font-medium hover:underline"
            onClick={() => setShowFullDesc((s) => !s)}
          >
            {showFullDesc ? ' Show Less' : ' Read More'}
          </button>
        </>
      ) : (
        description
      )}
    </p>
  );
};

export default CourseDescription;
