'use client';

import ArtworkDetail from '@/app/components/ArtworkDetail';
import { useParams } from 'next/navigation';

export default function ArtworkDetailPage() {
  const params = useParams();
  const artworkId = parseInt(params.id as string);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-0">
      <ArtworkDetail artworkId={artworkId} />
    </div>
  );
}
