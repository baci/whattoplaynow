import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Recommendation } from '../types';

interface Props {
  recommendations: Recommendation[];
}

const RecommendationCarousel: React.FC<Props> = ({ recommendations }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="embla w-full max-w-lg mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {recommendations.map((rec) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0" key={rec.id}>
              <div className="p-4 bg-white rounded-lg shadow-md m-2">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${rec.youtubeVideoId}`}
                    title={rec.gameTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <h2 className="text-2xl font-bold mb-2">{rec.gameTitle}</h2>
                <p className="text-gray-700 mb-4">Tags: {rec.tags.join(', ')}</p>
                <a
                  href={`https://www.cdkeys.com/${rec.cdkeysId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors"
                >
                  Buy on CDKeys
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-l" onClick={scrollPrev}>
          Prev
        </button>
        <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-r" onClick={scrollNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RecommendationCarousel; 