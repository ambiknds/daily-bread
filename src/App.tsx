import React, { useState } from 'react';
import { ImagePreview } from './components/ImagePreview';
import { backgroundColors } from './data/colors';
import { Church } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&fit=crop',
    date: new Date().toLocaleDateString(),
    title: '',
    content: '',
    prayer: '',
    wallpaper: '',
    titleStyle: 'modern',
    contentStyle: 'default',
    prayerStyle: 'default'
  });

  const [selectedGradient] = useState(() => {
    const randomIndex = Math.floor(Math.random() * backgroundColors.length);
    return backgroundColors[randomIndex];
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWallpaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, wallpaper: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const textStyles = {
    default: 'Default',
    modern: 'Modern',
    elegant: 'Elegant',
    bold: 'Bold',
    creative: 'Creative'
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Image Generator</h1>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter title..."
                />
                <select
                  name="titleStyle"
                  value={formData.titleStyle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                >
                  {Object.entries(textStyles).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="space-y-2">
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter main content..."
                />
                <select
                  name="contentStyle"
                  value={formData.contentStyle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                >
                  {Object.entries(textStyles).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Prayer Points
              </label>
              <div className="space-y-2">
                <textarea
                  name="prayer"
                  value={formData.prayer}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter prayer points..."
                />
                <select
                  name="prayerStyle"
                  value={formData.prayerStyle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                >
                  {Object.entries(textStyles).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Wallpaper (Optional)
              </label>
              <div className="mt-1 flex items-center">
                <label className="block w-full">
                  <span className="sr-only">Choose wallpaper</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    accept="image/*"
                    onChange={handleWallpaperChange}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-center">
          <ImagePreview
            {...formData}
            counselling="Alex Watson (2939494944/1828384858)"
            gradientColors={selectedGradient}
          />
        </div>
      </div>
    </div>
  );
}

export default App;