import React from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ImagePreviewProps {
  logo: string;
  date: string;
  title: string;
  content: string;
  prayer: string;
  counselling: string;
  wallpaper?: string;
  titleStyle: string;
  contentStyle: string;
  prayerStyle: string;
  gradientColors: {
    from: string;
    to: string;
  };
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  logo,
  date,
  title,
  content,
  prayer,
  counselling,
  wallpaper,
  titleStyle,
  contentStyle,
  prayerStyle,
  gradientColors,
}) => {
  const handleDownload = async () => {
    const element = document.getElementById('preview-container');
    if (!element) return;
    
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'generated-image.png';
    link.href = url;
    link.click();
  };

  const backgroundStyle = wallpaper 
    ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }
    : { background: `linear-gradient(to bottom right, var(--${gradientColors.from}), var(--${gradientColors.to}))` };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate().toString().padStart(2, '0')
    };
  };

  const getTextStyle = (style: string) => {
    switch (style) {
      case 'modern':
        return 'font-sans tracking-tight leading-snug';
      case 'elegant':
        return 'font-serif italic leading-relaxed';
      case 'bold':
        return 'font-bold tracking-wide uppercase';
      case 'creative':
        return 'font-mono tracking-wide leading-loose';
      default:
        return 'font-normal leading-normal';
    }
  };

  const { month, day } = formatDate(date);

  return (
    <div className="relative">
      <div
        id="preview-container"
        className="w-[360px] h-[640px] rounded-lg overflow-hidden shadow-xl flex flex-col"
        style={backgroundStyle}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center bg-black/30">
          <img 
            src={logo} 
            alt="Logo" 
            className="h-8 w-auto object-contain"
            crossOrigin="anonymous"
          />
          <div className="bg-white/90 rounded-lg overflow-hidden w-16 text-center">
            <div className="bg-blue-600 text-white text-sm py-1">{month}</div>
            <div className="text-blue-600 font-bold py-1">{day}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 flex flex-col gap-4 overflow-auto">
          <div className="bg-white/90 rounded-lg p-4 flex-1">
            <h2 className={`text-xl font-bold mb-3 text-blue-900 ${getTextStyle(titleStyle)}`}>
              {title}
            </h2>
            <div className={`text-sm mb-4 text-gray-700 whitespace-pre-wrap overflow-auto max-h-[200px] ${getTextStyle(contentStyle)}`}>
              {content}
            </div>
          </div>
          
          <div className="bg-white/90 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-blue-900">Prayer Points</h3>
            <div className={`text-sm text-gray-700 whitespace-pre-wrap overflow-auto max-h-[150px] ${getTextStyle(prayerStyle)}`}>
              {prayer}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/30">
          <p className="text-white text-sm text-center">
            For counselling: {counselling}
          </p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Download size={20} />
        Download Image
      </button>
    </div>
  );
};