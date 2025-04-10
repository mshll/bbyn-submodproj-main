'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useArtworks, getImageUrl } from '../../shared';
import { Artwork } from '../../shared/api';
import Loader from './Loader';

export default function ArtGrid() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: artworksData, isLoading: isArtworksLoading } = useArtworks(100);

  useEffect(() => {
    if (artworksData && !isArtworksLoading) {
      setArtworks(artworksData.data.filter((artwork) => artwork.image_id));
      setIsLoading(false);
    }
  }, [artworksData, isArtworksLoading]);

  if (isLoading || isArtworksLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {artworks.map((artwork) => {
        const imageUrl = getImageUrl(artworksData?.config.iiif_url || '', artwork.image_id, '800,');

        return (
          <Link
            href={`/artwork/${artwork.id}`}
            key={artwork.id}
            className="group flex flex-col overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative h-64 w-full overflow-hidden">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={artwork.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-all duration-500 ease-in-out group-hover:scale-105 opacity-0"
                  onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                />
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-medium text-gray-800 text-lg line-clamp-2">{artwork.title}</h3>
              {artwork.artist_display && <p className="text-gray-500 mt-1 line-clamp-1">{artwork.artist_display}</p>}
              <div className="mt-auto pt-3 flex flex-wrap gap-1">
                <p className="text-gray-400 text-xs">{artwork.department_title}</p>
                {artwork.date_display && <p className="text-gray-400 text-xs ml-auto">{artwork.date_display}</p>}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
