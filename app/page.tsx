'use client'

import { useState } from 'react'
import { Sparkles, Wand2, Image as ImageIcon, Zap, Download, Share2 } from 'lucide-react'

interface GeneratedImage {
  id: string
  prompt: string
  url: string
  timestamp: number
}

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null)

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isGenerating) return

    setIsGenerating(true)

    // Simulate image generation with random images
    await new Promise(resolve => setTimeout(resolve, 2000))

    const newImages = Array.from({ length: 4 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      prompt,
      url: `https://picsum.photos/seed/${Date.now() + i}/512/512`,
      timestamp: Date.now()
    }))

    setImages([...newImages, ...images])
    setIsGenerating(false)
  }

  const examplePrompts = [
    'A serene Japanese garden with cherry blossoms at sunset',
    'Cyberpunk city with neon lights and flying cars',
    'Ancient dragon perched on a mountain peak',
    'Mystical forest with glowing mushrooms and fireflies'
  ]

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 glass-effect sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <h1 className="text-2xl font-bold gradient-text">Midjourney</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <button className="text-gray-300 hover:text-white transition">Gallery</button>
              <button className="text-gray-300 hover:text-white transition">Community</button>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition">
                Upgrade
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Create <span className="gradient-text">Stunning Art</span> with AI
          </h2>
          <p className="text-gray-400 text-xl">
            Transform your imagination into reality with advanced AI image generation
          </p>
        </div>

        {/* Prompt Input */}
        <div className="max-w-4xl mx-auto mb-8">
          <form onSubmit={generateImage} className="relative">
            <div className="glass-effect rounded-2xl p-2">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your vision... (e.g., 'A majestic lion made of fire and lightning')"
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 px-4 py-3 resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between px-4 pb-2">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Wand2 className="w-4 h-4" />
                  <span>Press Enter to generate</span>
                </div>
                <button
                  type="submit"
                  disabled={isGenerating || !prompt.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-xl font-medium transition flex items-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Example Prompts */}
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Try these prompts:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(example)}
                  className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition text-gray-300"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isGenerating && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <Sparkles className="w-8 h-8 text-purple-500 absolute top-4 left-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Creating your masterpiece...</h3>
                  <p className="text-gray-400">This may take a few moments</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Images Grid */}
        {images.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <ImageIcon className="w-6 h-6 text-purple-500" />
              <span>Your Creations</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer glass-effect hover:scale-105 transition-transform"
                >
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm line-clamp-2">{image.prompt}</p>
                      <div className="flex space-x-2 mt-2">
                        <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {images.length === 0 && !isGenerating && (
          <div className="text-center py-20">
            <div className="inline-block p-6 rounded-full glass-effect mb-4">
              <ImageIcon className="w-16 h-16 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">No images yet</h3>
            <p className="text-gray-500">Start creating by entering a prompt above</p>
          </div>
        )}
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <div className="max-w-4xl w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.prompt}
              className="w-full rounded-2xl"
            />
            <div className="mt-4 glass-effect rounded-2xl p-6">
              <p className="text-lg mb-4">{selectedImage.prompt}</p>
              <div className="flex space-x-3">
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-xl transition flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-xl transition flex items-center justify-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">© 2024 Midjourney Clone. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Help</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
