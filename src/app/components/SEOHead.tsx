import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { skillElements, portfolioItems } from '../data/portfolio-data';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export function SEOHead({ 
  title, 
  description, 
  image = '/og-image.jpg',
  type = 'website'
}: SEOHeadProps) {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    const baseTitle = 'Stephen Howe Portfolio';
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description || 'Portfolio of Stephen Howe - Creative Lead');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title || baseTitle, true);
    updateMetaTag('og:description', description || 'Portfolio of Stephen Howe - Creative Lead', true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', window.location.href, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title || baseTitle);
    updateMetaTag('twitter:description', description || 'Portfolio of Stephen Howe - Creative Lead');
    updateMetaTag('twitter:image', image);
  }, [location, title, description, image, type]);

  // Generate dynamic meta based on route
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/about') {
      document.title = 'About Me | Stephen Howe Portfolio';
    } else if (path !== '/') {
      const category = path.slice(1);
      const element = skillElements.find(el => el.route === path);
      const items = portfolioItems[category] || [];
      
      if (element) {
        document.title = `${element.title} | Stephen Howe Portfolio`;
      }
    }
  }, [location]);

  return null;
}


