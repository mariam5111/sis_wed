import { useState, useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import EnvelopeView from './components/EnvelopeView'
import InvitationCard from './components/InvitationCard'

type Stage = 'idle' | 'opening' | 'done'

export default function App() {
  const [stage, setStage] = useState<Stage>('idle')
  const [musicOn, setMusicOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // 💡 مسار ملف الصوت الموجود داخل مجلد public
    audioRef.current = new Audio('/public/محمود العسيلي وصابرين - وأخيراً (بدون موسيقى) جديد 2026.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.28

    return () => { audioRef.current?.pause() }
  }, [])

  // دالة إيقاف/تشغيل الصوت
  const toggleMusic = () => {
    if (!audioRef.current) return
    if (musicOn) {
      audioRef.current.pause()
      setMusicOn(false)
    } else {
      audioRef.current.play().catch(() => {})
      setMusicOn(true)
    }
  }

  // دالة إطلاق مؤثرات Confetti (الورود والألوان)
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#b89040', '#d4a090', '#fdf8f1', '#c9927a']
    })
  }

  // دالة فتح الدعوة
  const handleOpen = () => {
    if (stage !== 'idle') return
    setStage('opening')

    // 1. تشغيل الصوت فوراً عند التفاعل
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setMusicOn(true)
      }).catch(() => {})
    }

    // 2. إطلاق الـ Confetti
    triggerConfetti()

    // 3. الانتقال لكارت الدعوة بعد انتهاء أنيميشن الفتح
    setTimeout(() => setStage('done'), 2000)
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 90% at 30% 20%, #f5ead8 0%, #fdf8f1 55%, #eeddd0 100%)',
      }}
    >
      {/* Ambient petal shapes */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none select-none" aria-hidden="true"
        style={{ opacity: 0.07 }} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="100" cy="120" rx="180" ry="80" fill="#c9927a" transform="rotate(-30 100 120)" />
        <ellipse cx="1100" cy="680" rx="220" ry="90" fill="#b89040" transform="rotate(20 1100 680)" />
        <ellipse cx="950" cy="100" rx="140" ry="60" fill="#c9927a" transform="rotate(15 950 100)" />
        <ellipse cx="200" cy="700" rx="160" ry="70" fill="#b89040" transform="rotate(-15 200 700)" />
        <ellipse cx="600" cy="400" rx="300" ry="120" fill="#f2e0d5" transform="rotate(-5 600 400)" />
      </svg>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }} />

      <div className="relative z-10 w-full flex items-center justify-center py-8 px-4">
        {stage !== 'done' ? (
          <EnvelopeView stage={stage} onOpen={handleOpen} />
        ) : (
          <InvitationCard musicOn={musicOn} onToggleMusic={toggleMusic} />
        )}
      </div>
    </div>
  )
}