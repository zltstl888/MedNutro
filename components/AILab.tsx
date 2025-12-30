import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload, Scan, MessageSquare, Loader2, Image as ImageIcon } from 'lucide-react';
import { editImageWithGemini, askGemini, fileToGenerativePart } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

type Tab = 'chat' | 'vision';

export const AILab: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('vision');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Vision/Edit State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visionPrompt, setVisionPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chat State
  const [chatPrompt, setChatPrompt] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToGenerativePart(file);
        // Add data prefix for preview
        setSelectedImage(`data:${file.type};base64,${base64}`);
        setResult(null); // Clear previous results
      } catch (err) {
        setError('Failed to process image');
      }
    }
  };

  const handleVisionAction = async () => {
    if (!selectedImage || !visionPrompt) return;
    
    setIsLoading(true);
    setError(null);
    try {
      // Remove header from base64 string for API
      const base64Data = selectedImage.split(',')[1];
      const editedImage = await editImageWithGemini(base64Data, visionPrompt);
      setResult(editedImage);
    } catch (err) {
      setError('Failed to edit image. Ensure your prompt is clear.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatAction = async () => {
    if (!chatPrompt) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await askGemini(chatPrompt);
      setResult(response);
    } catch (err) {
      setError('Failed to get answer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="py-24 bg-white text-black relative">
       <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              {t('ai.badge')}
            </span>
            <h2 className="text-4xl font-serif text-brand-purple mb-4">{t('ai.title')}</h2>
            <p className="text-gray-500">{t('ai.subtitle')}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => { setActiveTab('vision'); setResult(null); setError(null); }}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${activeTab === 'vision' ? 'bg-white text-brand-purple border-b-2 border-brand-purple' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <ImageIcon className="w-4 h-4" /> {t('ai.tab.editor')}
              </button>
              <button
                onClick={() => { setActiveTab('chat'); setResult(null); setError(null); }}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${activeTab === 'chat' ? 'bg-white text-brand-purple border-b-2 border-brand-purple' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <MessageSquare className="w-4 h-4" /> {t('ai.tab.chat')}
              </button>
            </div>

            <div className="p-8 min-h-[400px]">
              {/* VISION TAB */}
              {activeTab === 'vision' && (
                <div className="flex flex-col gap-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Input Area */}
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors relative overflow-hidden group"
                      onClick={() => fileInputRef.current?.click()}
                    >
                       {selectedImage ? (
                         <img src={selectedImage} alt="Upload" className="w-full h-full object-cover" />
                       ) : (
                         <>
                           <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:scale-110 transition-transform" />
                           <p className="text-sm text-gray-500">{t('ai.upload')}</p>
                         </>
                       )}
                       <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        accept="image/*"
                      />
                    </div>

                    {/* Output Area */}
                    <div className="border border-gray-200 rounded-xl h-64 bg-white flex items-center justify-center relative overflow-hidden">
                       {isLoading ? (
                         <Loader2 className="w-8 h-8 text-brand-purple animate-spin" />
                       ) : result && result.startsWith('data:image') ? (
                         <img src={result} alt="Edited" className="w-full h-full object-cover" />
                       ) : (
                         <p className="text-sm text-gray-400">{t('ai.result_wait')}</p>
                       )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={visionPrompt}
                      onChange={(e) => setVisionPrompt(e.target.value)}
                      placeholder={t('ai.vision_placeholder')}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                    />
                    <button
                      onClick={handleVisionAction}
                      disabled={!selectedImage || !visionPrompt || isLoading}
                      className="px-6 py-3 bg-brand-purple text-white rounded-lg font-bold hover:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? t('ai.processing') : t('ai.generate')}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 italic text-center">
                    {t('ai.disclaimer')}
                  </p>
                </div>
              )}

              {/* CHAT TAB */}
              {activeTab === 'chat' && (
                <div className="flex flex-col h-full justify-between gap-6">
                   <div className="flex-1 bg-white border border-gray-100 rounded-xl p-6 overflow-y-auto max-h-[300px]">
                      {result && !result.startsWith('data:image') ? (
                        <div className="prose prose-purple">
                          <p>{result}</p>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 mt-10">
                          {t('ai.chat_intro')}
                        </div>
                      )}
                      {isLoading && <div className="flex justify-center mt-4"><Loader2 className="animate-spin text-brand-purple"/></div>}
                   </div>

                   <div className="flex gap-4">
                    <input
                      type="text"
                      value={chatPrompt}
                      onChange={(e) => setChatPrompt(e.target.value)}
                      placeholder={t('ai.chat_placeholder')}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                    />
                    <button
                      onClick={handleChatAction}
                      disabled={!chatPrompt || isLoading}
                      className="px-6 py-3 bg-brand-blue text-brand-purple rounded-lg font-bold hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {t('ai.ask')}
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          </div>
       </div>
    </section>
  );
};