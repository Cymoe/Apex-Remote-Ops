'use client';

import { useEffect, useState } from 'react';

interface VideoData {
  videoAsset: any;
  url: string;
  progress: any;
}

export function useVideo(videoAssetId: string | null) {
  const [data, setData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!videoAssetId) {
      setLoading(false);
      return;
    }

    const fetchVideo = async () => {
      try {
        const response = await fetch(`/api/video/${videoAssetId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch video');
        }
        const videoData = await response.json();
        setData(videoData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoAssetId]);

  return { data, loading, error };
}