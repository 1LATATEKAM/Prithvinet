import { useEffect } from 'react';

const PageBranding = ({ title }) => {
  useEffect(() => {
    // Standardized Title Format: [Context] | PrithviNet
    const baseTitle = 'PrithviNet';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} - Environmental Intelligence`;

    // Ensure Favicon is updated/present
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '/favicon.png';
  }, [title]);

  return null;
};

export default PageBranding;
