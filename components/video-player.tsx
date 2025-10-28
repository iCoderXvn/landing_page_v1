"use client";
import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
}

export function VideoPlayer({ 
  src, 
  poster, 
  title, 
  className = "", 
  autoPlay = false,
  controls = true,
  width = "100%",
  height = "auto"
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  const handleSeek = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleVideoClick = () => {
    if (controls) {
      togglePlay();
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  // Check if the src is a YouTube, Vimeo, or other embed URL
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
  const isVimeo = src.includes('vimeo.com');
  const isTwitch = src.includes('twitch.tv');

  // Handle external video embeds
  if (isYouTube) {
    const videoId = src.includes('youtu.be') 
      ? src.split('youtu.be/')[1]?.split('?')[0]
      : src.split('v=')[1]?.split('&')[0];
    
    return (
      <div className={`relative rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shadow-lg ${className}`}>
        {title && (
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <h3 className="text-white font-medium text-sm">{title}</h3>
          </div>
        )}
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0`}
            title={title || "YouTube video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    );
  }

  if (isVimeo) {
    const videoId = src.split('vimeo.com/')[1]?.split('?')[0];
    
    return (
      <div className={`relative rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shadow-lg ${className}`}>
        {title && (
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <h3 className="text-white font-medium text-sm">{title}</h3>
          </div>
        )}
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}`}
            title={title || "Vimeo video"}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    );
  }

  // Native video player for direct video files
  return (
    <div 
      ref={containerRef}
      className={`relative rounded-lg overflow-hidden bg-gray-900 border border-gray-700 shadow-lg group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width, height }}
    >
      {title && (
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
          <h3 className="text-white font-medium text-sm">{title}</h3>
        </div>
      )}
      
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-auto cursor-pointer"
          poster={poster}
          autoPlay={autoPlay}
          muted={autoPlay} // Auto-play videos should be muted by default
          playsInline
          onClick={handleVideoClick}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={src} type="video/mp4" />
          <source src={src} type="video/webm" />
          <source src={src} type="video/ogg" />
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls Overlay */}
        {controls && (
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
                }}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20 p-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  
                  {/* Volume Slider */}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Time Display */}
                <span className="text-white text-sm font-mono min-w-[100px]">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20 p-2"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        {/* Play button overlay when paused */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
            onClick={handleVideoClick}
          >
            <div className="bg-blue-600 hover:bg-blue-700 rounded-full p-4 transition-colors">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Utility function to detect video URLs in content
export function isVideoUrl(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
  const videoServices = ['youtube.com', 'youtu.be', 'vimeo.com', 'twitch.tv'];
  
  // Check if URL contains video extensions (with or without query params)
  const hasVideoExt = videoExtensions.some(ext => {
    const regex = new RegExp(`\\${ext}(\\?|$)`, 'i');
    return regex.test(url);
  });
  
  return hasVideoExt || videoServices.some(service => url.includes(service));
}

// Function to extract video info from markdown-style video syntax
export function parseVideoMarkdown(content: string) {
  // Match both video tags and link-style videos
  const videoRegex = /!\[video\]\(([^)]+)\s*(?:"([^"]*)")?\)|!\[([^\]]*)\]\(([^)]+)\s*(?:"([^"]*)")?\)/g;
  const matches = [];
  let match;

  while ((match = videoRegex.exec(content)) !== null) {
    const [fullMatch, url1, title1, altText, url2, title2] = match;
    const url = url1 || url2;
    const title = title1 || title2 || altText;
    
    if (url && isVideoUrl(url)) {
      matches.push({
        fullMatch,
        url,
        title,
        index: match.index
      });
    }
  }

  return matches;
}