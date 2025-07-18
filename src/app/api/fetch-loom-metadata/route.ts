import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { videoUrl } = await request.json()
    
    if (!videoUrl || !videoUrl.includes('loom.com')) {
      return NextResponse.json(
        { error: 'Invalid Loom URL' },
        { status: 400 }
      )
    }

    // Extract video ID from Loom URL
    const videoIdMatch = videoUrl.match(/share\/([a-zA-Z0-9]+)/)
    if (!videoIdMatch) {
      return NextResponse.json(
        { error: 'Could not extract video ID from URL' },
        { status: 400 }
      )
    }

    // Try oEmbed endpoint first
    const oembedUrl = `https://www.loom.com/v1/oembed?url=${encodeURIComponent(videoUrl)}&format=json`
    
    try {
      const oembedResponse = await fetch(oembedUrl)
      if (oembedResponse.ok) {
        const oembedData = await oembedResponse.json()
        
        return NextResponse.json({
          title: oembedData.title,
          thumbnailUrl: oembedData.thumbnail_url,
          thumbnailWidth: oembedData.thumbnail_width,
          thumbnailHeight: oembedData.thumbnail_height,
          duration: oembedData.duration,
          html: oembedData.html,
        })
      }
    } catch (oembedError) {
      console.error('oEmbed fetch failed:', oembedError)
    }

    // Fallback: Try to construct thumbnail URL based on video ID
    // This is a common pattern for Loom videos
    const videoId = videoIdMatch[1]
    const fallbackThumbnailUrl = `https://cdn.loom.com/sessions/thumbnails/${videoId}-00001.jpg`

    return NextResponse.json({
      title: null,
      thumbnailUrl: fallbackThumbnailUrl,
      thumbnailWidth: null,
      thumbnailHeight: null,
      duration: null,
      html: null,
    })

  } catch (error) {
    console.error('Error fetching Loom metadata:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Loom metadata' },
      { status: 500 }
    )
  }
} 