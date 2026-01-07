import { useState, useEffect, ImgHTMLAttributes } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  eager?: boolean;
}

/**
 * Simple cross-browser compatible image component with error handling
 * Automatically handles HEIC images (not supported by browsers)
 */
export default function LazyImage({ 
  src, 
  alt, 
  fallbackSrc = "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
  eager = false,
  className = "",
  onError,
  ...props 
}: LazyImageProps) {
  // Check if image is HEIC format (not supported by browsers)
  const isHEIC = src?.toUpperCase().includes('.HEIC');
  
  // Use fallback immediately for HEIC images
  const [currentSrc, setCurrentSrc] = useState(isHEIC ? fallbackSrc : src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isHEIC) {
      console.warn(`HEIC image detected (not supported by browsers): ${src}, using fallback`);
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else {
      setCurrentSrc(src);
      setHasError(false);
    }
  }, [src, isHEIC, fallbackSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      console.warn(`Image failed to load: ${currentSrc}, using fallback`);
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
    
    // Call original onError if provided
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
