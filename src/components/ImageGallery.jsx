import { useState, useEffect } from 'react';
import './ImageGallery.css';

const images = [
  { id: 3, src: '/images/3-DJI_20251206143438_0178_D-HDR.jpg', alt: 'Photo 3' },
  { id: 4, src: '/images/4-DJI_20251206143511_0181_D-HDR.jpg', alt: 'Photo 4' },
  { id: 5, src: '/images/5-DJI_20251206143542_0184_D-HDR.jpg', alt: 'Photo 5' },
  { id: 6, src: '/images/6-DJI_20251206143622_0187_D-HDR.jpg', alt: 'Photo 6' },
  { id: 7, src: '/images/7-DJI_20251206143909_0208_D-HDR.jpg', alt: 'Photo 7' },
  { id: 8, src: '/images/8-DJI_20251206143934_0211_D-HDR.jpg', alt: 'Photo 8' },
  { id: 9, src: '/images/9-DJI_20251206144123_0216_D-HDR.jpg', alt: 'Photo 9' },
  { id: 10, src: '/images/10-DJI_20251206144225_0219_D-HDR.jpg', alt: 'Photo 10' },
  { id: 11, src: '/images/11-DJI_20251206144329_0222_D-HDR.jpg', alt: 'Photo 11' },
  { id: 12, src: '/images/12-DJI_20251206144410_0225_D-HDR.jpg', alt: 'Photo 12' },
  { id: 13, src: '/images/13-DJI_20251206144446_0228_D-HDR.jpg', alt: 'Photo 13' },
  { id: 14, src: '/images/14-DJI_20251206144503_0231_D-HDR.jpg', alt: 'Photo 14' },
  { id: 15, src: '/images/15-DJI_20251206144730_0236_D-HDR.jpg', alt: 'Photo 15' },
  { id: 16, src: '/images/16-DJI_20251206165008_0265_D-HDR.jpg', alt: 'Photo 16' },
  { id: 17, src: '/images/17-DJI_20251206165844_0284_D-HDR.jpg', alt: 'Photo 17' },
  { id: 18, src: '/images/18-DJI_20251206165920_0287_D-HDR.jpg', alt: 'Photo 18' },
  { id: 19, src: '/images/19-DJI_20251206170010_0290_D-HDR.jpg', alt: 'Photo 19' },
  { id: 20, src: '/images/20-DJI_20251206170041_0293_D-HDR.jpg', alt: 'Photo 20' },
  { id: 1, src: '/images/1-DJI_20251206143252_0169_D-HDR.jpg', alt: 'Photo 1' },
];

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious(e);
      if (e.key === 'ArrowRight') goToNext(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <a href="https://www.etsy.com/shop/Engine43ArtStore" target="_blank" rel="noopener noreferrer" className="logo-link">
          <img
            src="/images/logos/E43-Mia-Logo-final.png"
            alt="Engine 43 Logo"
            className="gallery-logo"
          />
          <span className="shop-text">SHOP</span>
        </a>
      </header>
      <h1 className="gallery-title">Engine 43 Holy Moly Market 25</h1>
      <p className="gallery-subtitle">Photo Gallery</p>

      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openLightbox(image, index)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            &times;
          </button>
          <button className="lightbox-nav lightbox-prev" onClick={goToPrevious}>
            &#10094;
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <p className="lightbox-caption">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
          <button className="lightbox-nav lightbox-next" onClick={goToNext}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
