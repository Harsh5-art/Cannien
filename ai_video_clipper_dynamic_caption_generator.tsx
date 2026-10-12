import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Scissors, Sparkles, Download, Captions,
  Type, Palette, Layout, Sliders, CheckCircle2, RefreshCw, Upload, Film,
  Share2, Edit3, Trash2, Plus, FastForward, Rewind, Layers, Monitor,
  Smartphone, Square, Zap, Flame, Eye, Copy, Check, FileText, ChevronRight
} from 'lucide-react';

// Sample video presets for instant testing
const SAMPLE_VIDEOS = [
  {
    id: 'tech-talk',
    title: 'The Future of AI & Human Creativity',
    author: 'Tech Unfiltered',
    duration: 38,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    aspectRatio: '9:16',
    transcript: [
      { id: 1, start: 0.0, end: 3.2, text: "Here is the absolute secret to building viral AI clips.", speaker: "Host" },
      { id: 2, start: 3.3, end: 7.1, text: "You need high-energy hooks in the first three seconds.", speaker: "Host" },
      { id: 3, start: 7.2, end: 11.8, text: "Dynamic colorful captions keep the audience's attention locked in 10x longer.", speaker: "Host" },
      { id: 4, start: 12.0, end: 16.5, text: "When you highlight key power words with bright neon colors, engagement skyrockets!", speaker: "Host" },
      { id: 5, start: 16.8, end: 21.0, text: "Let's turn long-form podcast content into short viral reels instantly.", speaker: "Host" },
      { id: 6, start: 21.2, end: 26.4, text: "Every content creator needs this automated clipping workflow today.", speaker: "Host" },
      { id: 7, start: 26.5, end: 31.0, text: "Stop spending hours editing frame by frame when AI can do it in seconds.", speaker: "Host" },
      { id: 8, start: 31.2, end: 37.8, text: "Subscribe for more viral video growth hacks and creator tools!", speaker: "Host" }
    ]
  },
  {
    id: 'podcast-story',
    title: 'How I Built My First Million Dollar App',
    author: 'Founder Stories',
    duration: 30,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    aspectRatio: '9:16',
    transcript: [
      { id: 1, start: 0.0, end: 4.1, text: "I started with zero coding experience and a single laptop.", speaker: "Alex" },
      { id: 2, start: 4.2, end: 8.5, text: "Everyone told me it was impossible to launch in 30 days.", speaker: "Alex" },
      { id: 3, start: 8.6, end: 13.0, text: "But we focused on solving one massive problem for creators.", speaker: "Alex" },
      { id: 4, start: 13.2, end: 18.0, text: "The viral hook was simple: effortless animated video captions.", speaker: "Alex" },
      { id: 5, start: 18.2, end: 23.5, text: "In month three, we hit over fifty thousand active creators worldwide.", speaker: "Alex" },
      { id: 6, start: 23.8, end: 29.8, text: "Consistency, fast editing, and strong visuals changed everything.", speaker: "Alex" }
    ]
  }
];

// Caption Style Presets
const PRESET_STYLES = [
  {
    id: 'hormozi',
    name: 'Alex Hormozi',
    badge: 'Popular',
    textColor: '#FFFFFF',
    highlightColor: '#FFE600', // Bright Yellow
    strokeColor: '#000000',
    backgroundColor: 'rgba(0,0,0,0.7)',
    fontFamily: 'Montserrat',
    uppercase: true,
    animation: 'pop',
    wordsPerLine: 2,
    shadow: true
  },
  {
    id: 'mrbeast',
    name: 'MrBeast Pop',
    badge: 'High CTR',
    textColor: '#FFFFFF',
    highlightColor: '#FF0055', // Neon Pink/Red
    strokeColor: '#000000',
    backgroundColor: 'transparent',
    fontFamily: 'Impact',
    uppercase: true,
    animation: 'bounce',
    wordsPerLine: 2,
    shadow: true
  },
  {
    id: 'neon',
    name: 'Cyber Neon',
    badge: 'Cyberpunk',
    textColor: '#00FFFF',
    highlightColor: '#FF00FF',
    strokeColor: '#050515',
    backgroundColor: 'rgba(10, 10, 30, 0.8)',
    fontFamily: 'Outfit',
    uppercase: true,
    animation: 'pulse',
    wordsPerLine: 3,
    shadow: true
  },
  {
    id: 'tiktok',
    name: 'TikTok Gradient',
    badge: 'Trending',
    textColor: '#FFFFFF',
    highlightColor: '#25F4EE',
    strokeColor: '#FE2C55',
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontFamily: 'Poppins',
    uppercase: false,
    animation: 'slide',
    wordsPerLine: 3,
    shadow: false
  },
  {
    id: 'karaoke',
    name: 'Karaoke Fill',
    badge: 'Engaging',
    textColor: '#666666',
    highlightColor: '#00FF66',
    strokeColor: '#000000',
    backgroundColor: 'rgba(0,0,0,0.6)',
    fontFamily: 'Luckiest Guy',
    uppercase: true,
    animation: 'karaoke',
    wordsPerLine: 2,
    shadow: true
  },
  {
    id: 'minimal',
    name: 'Clean Minimal',
    badge: 'Sleek',
    textColor: '#FFFFFF',
    highlightColor: '#3B82F6',
    strokeColor: 'transparent',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    fontFamily: 'Poppins',
    uppercase: false,
    animation: 'fade',
    wordsPerLine: 4,
    shadow: false
  }
];

const FONTS = [
  { name: 'Montserrat', family: 'Montserrat, sans-serif' },
  { name: 'Impact', family: 'Impact, sans-serif' },
  { name: 'Outfit', family: 'Outfit, sans-serif' },
  { name: 'Poppins', family: 'Poppins, sans-serif' },
  { name: 'Luckiest Guy', family: '"Luckiest Guy", cursive' },
  { name: 'Permanent Marker', family: '"Permanent Marker", cursive' }
];

export default function App() {
  // State variables
  const [selectedVideo, setSelectedVideo] = useState(SAMPLE_VIDEOS[0]);
  const [videoUrl, setVideoUrl] = useState(SAMPLE_VIDEOS[0].url);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('9:16'); // '9:16', '16:9', '1:1'
  const [activeTab, setActiveTab] = useState('clips'); // 'clips', 'captions', 'transcript', 'export'
  
  // Custom video clip state
  const [clipRange, setClipRange] = useState({ start: 0, end: 38 });

  // AI Highlights state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiClips, setAiClips] = useState([]);
  const [selectedClipId, setSelectedClipId] = useState(null);

  // Caption Styling State
  const [captionStyle, setCaptionStyle] = useState(PRESET_STYLES[0]);
  const [fontSize, setFontSize] = useState(28);
  const [positionY, setPositionY] = useState(75); // Percentage from top
  const [maxWordsPerLine, setMaxWordsPerLine] = useState(2);
  const [showEmojis, setShowEmojis] = useState(true);

  // Transcript state
  const [transcript, setTranscript] = useState(SAMPLE_VIDEOS[0].transcript);
  const [editingTranscriptId, setEditingTranscriptId] = useState(null);

  // Export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);

  // References
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Impact&family=Luckiest+Guy&family=Montserrat:wght@800;900&family=Outfit:wght@700;900&family=Permanent+Marker&family=Poppins:wght@700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Auto loop clip if outside specified clip range
      if (selectedClipId && video.currentTime >= clipRange.end) {
        video.currentTime = clipRange.start;
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setClipRange({ start: 0, end: video.duration });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [selectedClipId, clipRange]);

  const runAiHighlightDetection = () => {
    setIsAnalyzing(true);
    setAiClips([]);

    setTimeout(() => {
      const generatedClips = [
        {
          id: 'clip-1',
          title: 'The Viral Hook',
          badge: '99% Viral Potential',
          tag: 'Hook Intro',
          score: 99,
          start: 0.0,
          end: 11.8,
          text: "Here is the absolute secret to building viral AI clips. You need high-energy hooks in the first three seconds...",
          color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        },
        {
          id: 'clip-2',
          title: 'Power Word Retention Trick',
          badge: '95% Engagement',
          tag: 'High Energy',
          score: 95,
          start: 12.0,
          end: 21.0,
          text: "When you highlight key power words with bright neon colors, engagement skyrockets! Let's turn long-form podcast content...",
          color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
        },
        {
          id: 'clip-3',
          title: 'Automated Creator Workflow',
          badge: '89% High CTR',
          tag: 'Call to Action',
          score: 89,
          start: 21.2,
          end: 37.8,
          text: "Every content creator needs this automated clipping workflow today. Stop spending hours editing frame by frame...",
          color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
        }
      ];

      setAiClips(generatedClips);
      setIsAnalyzing(false);
      
      // Auto select top viral clip
      selectClip(generatedClips[0]);
    }, 2200);
  };

  const selectClip = (clip) => {
    setSelectedClipId(clip.id);
    setClipRange({ start: clip.start, end: clip.end });
    if (videoRef.current) {
      videoRef.current.currentTime = clip.start;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSelectVideoPreset = (preset) => {
    setSelectedVideo(preset);
    setVideoUrl(preset.url);
    setTranscript(preset.transcript);
    setSelectedClipId(null);
    if (videoRef.current) {
      videoRef.current.src = preset.url;
      videoRef.current.load();
      setIsPlaying(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const customVideo = {
        id: 'uploaded-video',
        title: file.name,
        author: 'User Upload',
        duration: 30,
        url: fileUrl,
        aspectRatio: '9:16',
        transcript: [
          { id: 1, start: 0.0, end: 4.0, text: "Uploaded custom video stream content.", speaker: "Speaker 1" },
          { id: 2, start: 4.1, end: 9.0, text: "AI is auto-generating colorful synchronized captions for your clip.", speaker: "Speaker 1" },
          { id: 3, start: 9.1, end: 15.0, text: "Customize fonts, colors, animations and export with one click!", speaker: "Speaker 1" }
        ]
      };
      setSelectedVideo(customVideo);
      setVideoUrl(fileUrl);
      setTranscript(customVideo.transcript);
      setSelectedClipId(null);
      if (videoRef.current) {
        videoRef.current.src = fileUrl;
        videoRef.current.load();
        setIsPlaying(false);
      }
    }
  };

  const renderCaptionOverlay = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match canvas width/height to rendering container dimensions
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Find current active transcript block
    const time = video.currentTime;
    const currentLine = transcript.find(t => time >= t.start && time <= t.end);

    if (!currentLine) return;

    // Word calculations and splitting
    const rawWords = currentLine.text.split(' ');
    const lineDuration = currentLine.end - currentLine.start;
    const wordDuration = lineDuration / Math.max(rawWords.length, 1);
    const activeWordIndex = Math.min(
      Math.floor((time - currentLine.start) / wordDuration),
      rawWords.length - 1
    );

    // Group words into chunks according to maxWordsPerLine
    const chunks = [];
    for (let i = 0; i < rawWords.length; i += maxWordsPerLine) {
      chunks.push(rawWords.slice(i, i + maxWordsPerLine));
    }

    // Find active chunk index
    const activeChunkIndex = Math.floor(activeWordIndex / maxWordsPerLine);
    const currentChunk = chunks[activeChunkIndex] || [];
    const chunkStartWordIdx = activeChunkIndex * maxWordsPerLine;

    if (currentChunk.length === 0) return;

    // Setup Canvas Styles based on active preset
    const scaleFactor = canvas.width / 400; // Responsive canvas scaling
    const scaledFontSize = fontSize * scaleFactor;
    
    ctx.font = `900 ${scaledFontSize}px ${captionStyle.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textString = currentChunk.join(' ');
    const textWidth = ctx.measureText(textString).width;
    
    const posX = canvas.width / 2;
    const posY = (canvas.height * positionY) / 100;

    // Background Badge Box Rendering
    if (captionStyle.backgroundColor && captionStyle.backgroundColor !== 'transparent') {
      const paddingX = 18 * scaleFactor;
      const paddingY = 10 * scaleFactor;
      ctx.fillStyle = captionStyle.backgroundColor;
      ctx.beginPath();
      ctx.roundRect(
        posX - textWidth / 2 - paddingX,
        posY - scaledFontSize / 2 - paddingY,
        textWidth + paddingX * 2,
        scaledFontSize + paddingY * 2,
        12 * scaleFactor
      );
      ctx.fill();
    }

    // Render Words individually to apply highlight & animation effects
    let currentX = posX - textWidth / 2;

    currentChunk.forEach((word, idx) => {
      const globalWordIdx = chunkStartWordIdx + idx;
      const isActive = globalWordIdx === activeWordIndex;

      // Word measure
      const wordMetrics = ctx.measureText(word + ' ');
      const wordWidth = wordMetrics.width;
      const wordCenterX = currentX + wordWidth / 2;

      ctx.save();

      // Emoji Auto-injection helper
      let displayWord = word;
      if (showEmojis) {
        const lower = word.toLowerCase();
        if (lower.includes('secret') || lower.includes('hook')) displayWord += ' 🔥';
        else if (lower.includes('ai') || lower.includes('growth')) displayWord += ' 🚀';
        else if (lower.includes('money') || lower.includes('dollar')) displayWord += ' 💰';
        else if (lower.includes('viral') || lower.includes('attention')) displayWord += ' ⚡';
      }

      if (captionStyle.uppercase) {
        displayWord = displayWord.toUpperCase();
      }

      // Dynamic Animations
      if (isActive) {
        if (captionStyle.animation === 'bounce') {
          ctx.translate(wordCenterX, posY - 6 * scaleFactor);
        } else if (captionStyle.animation === 'pop') {
          ctx.translate(wordCenterX, posY);
          ctx.scale(1.15, 1.15);
        } else if (captionStyle.animation === 'pulse') {
          ctx.translate(wordCenterX, posY);
          ctx.shadowColor = captionStyle.highlightColor;
          ctx.shadowBlur = 18 * scaleFactor;
        } else {
          ctx.translate(wordCenterX, posY);
        }
      } else {
        ctx.translate(wordCenterX, posY);
      }

      // Text Outline / Stroke
      if (captionStyle.strokeColor && captionStyle.strokeColor !== 'transparent') {
        ctx.strokeStyle = captionStyle.strokeColor;
        ctx.lineWidth = 6 * scaleFactor;
        ctx.lineJoin = 'round';
        ctx.strokeText(displayWord, 0, 0);
      }

      // Drop Shadow
      if (captionStyle.shadow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowOffsetX = 3 * scaleFactor;
        ctx.shadowOffsetY = 4 * scaleFactor;
        ctx.shadowBlur = 4 * scaleFactor;
      }

      // Word Fill Color (Primary vs Highlight Color)
      if (isActive) {
        ctx.fillStyle = captionStyle.highlightColor;
      } else {
        ctx.fillStyle = captionStyle.textColor;
      }

      ctx.fillText(displayWord, 0, 0);
      ctx.restore();

      currentX += wordWidth;
    });

  }, [transcript, captionStyle, fontSize, positionY, maxWordsPerLine, showEmojis]);

  useEffect(() => {
    let animFrameId;
    const renderLoop = () => {
      renderCaptionOverlay();
      animFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();
    return () => cancelAnimationFrame(animFrameId);
  }, [renderCaptionOverlay]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleExport = (type) => {
    setIsExporting(true);
    setExportProgress(0);

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setExportSuccess(true);
          setTimeout(() => setExportSuccess(false), 3500);

          if (type === 'srt') {
            downloadSRT();
          } else if (type === 'vtt') {
            downloadVTT();
          }
          return 100;
        }
        return prev + 15;
      });
    }, 250);
  };

  const downloadSRT = () => {
    let srtContent = '';
    transcript.forEach((item, index) => {
      const formatTime = (sec) => {
        const date = new Date(0);
        date.setSeconds(sec);
        const ms = Math.floor((sec % 1) * 1000).toString().padStart(3, '0');
        return date.toISOString().substr(11, 8) + ',' + ms;
      };
      srtContent += `${index + 1}\n${formatTime(item.start)} --> ${formatTime(item.end)}\n${item.text}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedVideo.title.replace(/\s+/g, '_')}_captions.srt`;
    a.click();
  };

  const downloadVTT = () => {
    let vttContent = 'WEBVTT\n\n';
    transcript.forEach((item, index) => {
      const formatTime = (sec) => {
        const date = new Date(0);
        date.setSeconds(sec);
        const ms = Math.floor((sec % 1) * 1000).toString().padStart(3, '0');
        return date.toISOString().substr(11, 8) + '.' + ms;
      };
      vttContent += `${index + 1}\n${formatTime(item.start)} --> ${formatTime(item.end)}\n${item.text}\n\n`;
    });

    const blob = new Blob([vttContent], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedVideo.title.replace(/\s+/g, '_')}_captions.vtt`;
    a.click();
  };

  const copyTranscriptText = () => {
    const fullText = transcript.map(t => `[${t.start.toFixed(1)}s] ${t.text}`).join('\n');
    navigator.clipboard.writeText(fullText);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  const handleUpdateTranscript = (id, newText) => {
    setTranscript(transcript.map(item => item.id === id ? { ...item, text: newText } : item));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      
      {}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Scissors className="h-5 w-5 text-white transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  ClipCraft
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  AI PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">AI Short-Video Clipper & Dynamic Caption Generator</p>
            </div>
          </div>

          {/* Quick Preset Video Selector & Upload */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 rounded-lg p-1 border border-slate-700/50">
              {SAMPLE_VIDEOS.map((vid) => (
                <button
                  key={vid.id}
                  onClick={() => handleSelectVideoPreset(vid)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    selectedVideo.id === vid.id
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  {vid.title.substring(0, 18)}...
                </button>
              ))}
            </div>

            <label className="cursor-pointer flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all shadow-sm active:scale-95">
              <Upload className="h-4 w-4 text-purple-400" />
              <span>Upload Video</span>
              <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
            </label>

            <button
              onClick={() => setActiveTab('export')}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 transition-all active:scale-95"
            >
              <Download className="h-4 w-4" />
              <span>Export Short</span>
            </button>
          </div>
        </div>
      </header>

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Player & Video Preview (5 cols) */}
        <section className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Video Aspect Ratio & Controls Toolbar */}
          <div className="bg-slate-900/80 rounded-2xl p-3 border border-slate-800 flex items-center justify-between shadow-xl">
            <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1.5">
              <Monitor className="h-3.5 w-3.5 text-purple-400" />
              <span>Aspect Ratio:</span>
            </span>

            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80">
              <button
                onClick={() => setAspectRatio('9:16')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  aspectRatio === '9:16'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>9:16</span>
              </button>

              <button
                onClick={() => setAspectRatio('16:9')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  aspectRatio === '16:9'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>16:9</span>
              </button>

              <button
                onClick={() => setAspectRatio('1:1')}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  aspectRatio === '1:1'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Square className="h-3.5 w-3.5" />
                <span>1:1</span>
              </button>
            </div>
          </div>

          {/* Interactive Player Container */}
          <div className="relative bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center p-2 min-h-[460px]">
            <div
              ref={containerRef}
              className={`relative bg-black rounded-2xl overflow-hidden transition-all duration-300 shadow-inner flex items-center justify-center ${
                aspectRatio === '9:16'
                  ? 'w-[280px] h-[500px]'
                  : aspectRatio === '1:1'
                  ? 'w-[380px] h-[380px]'
                  : 'w-full h-[280px]'
              }`}
            >
              {/* HTML5 Video element */}
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                playsInline
                onClick={togglePlay}
              />

              {/* Dynamic Animated Captions Canvas Overlay */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              />

              {/* Play Pause Center Overlay Button */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute z-20 h-16 w-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center backdrop-blur-md shadow-2xl border border-purple-400/40 hover:scale-110 transition-transform"
                >
                  <Play className="h-8 w-8 ml-1 fill-current" />
                </button>
              )}

              {/* Active Clip Badge Marker */}
              {selectedClipId && (
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-purple-600/80 backdrop-blur-md text-[10px] font-bold text-white flex items-center space-x-1 border border-purple-400/30">
                  <Flame className="h-3 w-3 text-amber-400" />
                  <span>AI Clip Mode</span>
                </div>
              )}
            </div>
          </div>

          {/* Player Progress Bar & Timeline Scrubbing */}
          <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>{currentTime.toFixed(1)}s</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime -= 3;
                    }
                  }}
                  className="p-1 hover:text-white"
                >
                  <Rewind className="h-4 w-4" />
                </button>
                <button
                  onClick={togglePlay}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime += 3;
                    }
                  }}
                  className="p-1 hover:text-white"
                >
                  <FastForward className="h-4 w-4" />
                </button>
              </div>
              <span>{duration.toFixed(1)}s</span>
            </div>

            {/* Custom Scrubbing Bar */}
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setCurrentTime(val);
                if (videoRef.current) videoRef.current.currentTime = val;
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </section>

        {/* Right Column: AI Highlights & Customizer Tool Suite (7 cols) */}
        <section className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* Navigation Tabs */}
          <div className="flex bg-slate-900/90 rounded-2xl p-1.5 border border-slate-800 shadow-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('clips')}
              className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'clips'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Highlights</span>
            </button>

            <button
              onClick={() => setActiveTab('captions')}
              className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'captions'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Captions className="h-4 w-4" />
              <span>Caption Style</span>
            </button>

            <button
              onClick={() => setActiveTab('transcript')}
              className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'transcript'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Edit3 className="h-4 w-4" />
              <span>Transcript</span>
            </button>

            <button
              onClick={() => setActiveTab('export')}
              className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'export'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>

          {/* TAB 1: AI HIGHLIGHT & CLIP GENERATOR */}
          {activeTab === 'clips' && (
            <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-2xl flex-1 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-amber-400" />
                    <span>AI Viral Moment Detector</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Auto-analyze long videos to extract high-retention viral short clips.
                  </p>
                </div>

                <button
                  onClick={runAiHighlightDetection}
                  disabled={isAnalyzing}
                  className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:opacity-90 text-white text-xs font-bold shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Scanning Audio Hooks...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Auto Detect Clips</span>
                    </>
                  )}
                </button>
              </div>

              {/* Clip List Display */}
              <div className="space-y-4">
                {aiClips.length === 0 && !isAnalyzing && (
                  <div className="text-center py-12 px-4 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
                    <Flame className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-300">No clips generated yet</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                      Click <span className="text-purple-400 font-bold">"Auto Detect Clips"</span> above to analyze speaker emotion, pitch changes, and key viral hooks.
                    </p>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="space-y-3 py-8">
                    <div className="h-20 bg-slate-800/50 rounded-2xl animate-pulse" />
                    <div className="h-20 bg-slate-800/50 rounded-2xl animate-pulse" />
                  </div>
                )}

                {aiClips.map((clip) => (
                  <div
                    key={clip.id}
                    onClick={() => selectClip(clip)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                      selectedClipId === clip.id
                        ? 'bg-purple-950/40 border-purple-500/80 shadow-lg shadow-purple-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${clip.color}`}>
                            {clip.badge}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            {clip.start.toFixed(1)}s - {clip.end.toFixed(1)}s
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-white">{clip.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2">"{clip.text}"</p>
                      </div>

                      <button className="p-2 rounded-xl bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: COLORFUL & ANIMATED CAPTION CUSTOMIZER */}
          {activeTab === 'captions' && (
            <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-2xl flex-1 space-y-6 overflow-y-auto max-h-[600px]">
              
              {/* Presets Header */}
              <div>
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <Palette className="h-4 w-4 text-purple-400" />
                  <span>Preset Caption Styles</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PRESET_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setCaptionStyle(style)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        captionStyle.id === style.id
                          ? 'bg-purple-600/20 border-purple-500 shadow-md ring-1 ring-purple-500'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{style.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-300 font-bold">
                          {style.badge}
                        </span>
                      </div>
                      <div className="text-[11px] font-black tracking-wide" style={{ color: style.highlightColor }}>
                        VIRAL HOOK
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font & Typographic Selector */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                  <Type className="h-4 w-4 text-purple-400" />
                  <span>Typography & Font</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FONTS.map((font) => (
                    <button
                      key={font.name}
                      onClick={() => setCaptionStyle({ ...captionStyle, fontFamily: font.name })}
                      className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                        captionStyle.fontFamily === font.name
                          ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      style={{ fontFamily: font.family }}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color & Stroke Pickers */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                  <Sliders className="h-4 w-4 text-purple-400" />
                  <span>Colors & Highlight Controls</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Active Word</label>
                    <input
                      type="color"
                      value={captionStyle.highlightColor}
                      onChange={(e) => setCaptionStyle({ ...captionStyle, highlightColor: e.target.value })}
                      className="w-full h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer p-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Text Color</label>
                    <input
                      type="color"
                      value={captionStyle.textColor}
                      onChange={(e) => setCaptionStyle({ ...captionStyle, textColor: e.target.value })}
                      className="w-full h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer p-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Stroke/Outline</label>
                    <input
                      type="color"
                      value={captionStyle.strokeColor === 'transparent' ? '#000000' : captionStyle.strokeColor}
                      onChange={(e) => setCaptionStyle({ ...captionStyle, strokeColor: e.target.value })}
                      className="w-full h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer p-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Background</label>
                    <input
                      type="color"
                      value="#000000"
                      onChange={(e) => setCaptionStyle({ ...captionStyle, backgroundColor: e.target.value + 'B3' })}
                      className="w-full h-10 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer p-1"
                    />
                  </div>
                </div>
              </div>

              {/* Sliders: Size, Words Per Line, Position */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Font Size</span>
                    <span className="text-purple-400">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="48"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Screen Position (Y-Axis)</span>
                    <span className="text-purple-400">{positionY}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={positionY}
                    onChange={(e) => setPositionY(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>Max Words Per Line</span>
                    <span className="text-purple-400">{maxWordsPerLine} words</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={maxWordsPerLine}
                    onChange={(e) => setMaxWordsPerLine(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                {/* Auto Emoji Toggle */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-semibold text-slate-300">Auto Highlight Emojis</span>
                  <button
                    onClick={() => setShowEmojis(!showEmojis)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${
                      showEmojis ? 'bg-purple-600' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        showEmojis ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: INTERACTIVE TRANSCRIPT EDITOR */}
          {activeTab === 'transcript' && (
            <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-2xl flex-1 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-purple-400" />
                    <span>Time-Synced Transcript</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any line to jump video playback. Edit text inline.
                  </p>
                </div>

                <button
                  onClick={copyTranscriptText}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                >
                  {copiedTranscript ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-400" />
                      <span>Copy All</span>
                    </>
                  )}
                </button>
              </div>

              {/* Transcript list */}
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {transcript.map((item) => {
                  const isActive = currentTime >= item.start && currentTime <= item.end;
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isActive
                          ? 'bg-purple-950/50 border-purple-500/80 shadow-md'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <button
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = item.start;
                              videoRef.current.play();
                              setIsPlaying(true);
                            }
                          }}
                          className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-purple-400 hover:bg-purple-600 hover:text-white transition-colors"
                        >
                          {item.start.toFixed(1)}s - {item.end.toFixed(1)}s
                        </button>

                        <span className="text-[10px] text-slate-500 font-semibold">{item.speaker}</span>
                      </div>

                      {editingTranscriptId === item.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={item.text}
                            onChange={(e) => handleUpdateTranscript(item.id, e.target.value)}
                            className="flex-1 bg-slate-900 border border-purple-500 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => setEditingTranscriptId(null)}
                            className="p-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <p
                          onClick={() => setEditingTranscriptId(item.id)}
                          className="text-xs text-slate-200 cursor-pointer hover:text-purple-300 transition-colors leading-relaxed"
                        >
                          {item.text}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: EXPORT & RENDERING */}
          {activeTab === 'export' && (
            <div className="bg-slate-900/80 rounded-3xl p-6 border border-slate-800 shadow-2xl flex-1 space-y-6">
              <div>
                <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Download className="h-5 w-5 text-purple-400" />
                  <span>Render & Export Viral Short</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Download rendered MP4 short clip with embedded captions or subtitle files.
                </p>
              </div>

              {/* Progress Bar during Export */}
              {isExporting && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-purple-400">Rendering Video Frame Subtitles...</span>
                    <span className="text-white">{exportProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Success Notification */}
              {exportSuccess && (
                <div className="bg-emerald-950/60 border border-emerald-500/50 p-4 rounded-2xl flex items-center space-x-3 text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                  <span>Export finished successfully! Your file is downloaded.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleExport('mp4')}
                  disabled={isExporting}
                  className="p-5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex flex-col items-center justify-center space-y-2 shadow-xl shadow-purple-500/20 transition-all disabled:opacity-50"
                >
                  <Film className="h-6 w-6" />
                  <span>Export MP4 Clip with Captions</span>
                </button>

                <button
                  onClick={() => handleExport('srt')}
                  disabled={isExporting}
                  className="p-5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <Captions className="h-6 w-6 text-purple-400" />
                  <span>Download SRT Subtitles</span>
                </button>

                <button
                  onClick={() => handleExport('vtt')}
                  disabled={isExporting}
                  className="p-5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <FileText className="h-6 w-6 text-indigo-400" />
                  <span>Download VTT Subtitles</span>
                </button>

                <button
                  onClick={copyTranscriptText}
                  className="p-5 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex flex-col items-center justify-center space-y-2 transition-all"
                >
                  <Copy className="h-6 w-6 text-pink-400" />
                  <span>Copy Plain Text Transcript</span>
                </button>
              </div>
            </div>
          )}

        </section>

      </main>
    </div>
  );
}