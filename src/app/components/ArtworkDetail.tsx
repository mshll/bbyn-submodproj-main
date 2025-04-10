'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useArtwork, getImageUrl } from '../../shared';
import { Artwork } from '../../shared/api';
import Loader from './Loader';

interface ArtworkDetailProps {
  artworkId: number;
}

export default function ArtworkDetail({ artworkId }: ArtworkDetailProps) {
  const { data: artworkData, isLoading, error } = useArtwork(artworkId);
  const [artwork, setArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    if (artworkData && !isLoading) {
      setArtwork(artworkData.data);
    }
  }, [artworkData, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !artwork) {
    return <div>Artwork not found</div>;
  }

  const imageUrl = getImageUrl(artworkData?.config.iiif_url || '', artwork.image_id, '1800,');

  return (
    <div className="py-20">
      {imageUrl && (
        <div className="w-full mb-12">
          <div className="relative w-full h-[70vh] overflow-hidden">
            <Image
              src={imageUrl}
              alt={artwork.title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              className="transition-opacity opacity-0 duration-300"
              onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{artwork.title}</h1>
          {artwork.artist_display && <p className="text-xl text-gray-600">{artwork.artist_display}</p>}
          {artwork.date_display && <p className="text-gray-500 mt-1">{artwork.date_display}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Details</h2>
            <div className="space-y-4">
              {artwork.medium_display && (
                <div>
                  <span className="text-gray-500 block mb-1">Medium</span>
                  <span className="text-gray-800">{artwork.medium_display}</span>
                </div>
              )}
              {artwork.dimensions && (
                <div>
                  <span className="text-gray-500 block mb-1">Dimensions</span>
                  <span className="text-gray-800">{artwork.dimensions}</span>
                </div>
              )}
              {artwork.credit_line && (
                <div>
                  <span className="text-gray-500 block mb-1">Credit</span>
                  <span className="text-gray-800">{artwork.credit_line}</span>
                </div>
              )}
              {artwork.department_title && (
                <div>
                  <span className="text-gray-500 block mb-1">Department</span>
                  <span className="text-gray-800">{artwork.department_title}</span>
                </div>
              )}
            </div>
          </div>

          {artwork.description && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About this Artwork</h2>
              <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: artwork.description }} />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-20">
        <Link href="/" className=" text-blue-500 hover:text-blue-700 px-8 ">
          Back to Gallery
        </Link>
      </div>
    </div>
  );
}
