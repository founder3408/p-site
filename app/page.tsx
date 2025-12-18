"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function StreamingPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("")
  const [streamName, setStreamName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      platform: selectedPlatform,
      streamName,
      email,
      phone,
      timestamp: new Date().toISOString(),
    }

    localStorage.setItem("streamingData", JSON.stringify(data))

    alert("Dados salvos com sucesso! 💖")
    console.log("Dados armazenados:", data)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-rose-300" />

      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              fontSize: `${1.5 + Math.random() * 2}rem`,
              opacity: 0.6,
            }}
          >
            {["🌸", "🌺", "🌷", "🌹", "💐", "🦋", "✨", "💫", "🎀"][Math.floor(Math.random() * 9)]}
          </div>
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl space-y-8">
          <Card className="bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 border-none shadow-[0_20px_50px_rgba(236,72,153,0.3)] hover:shadow-[0_25px_60px_rgba(236,72,153,0.4)] transition-all duration-300 animate-float-slow backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-4xl animate-pulse">👑</span>
                <h1
                  className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Suporte das Princesinhas
                </h1>
                <span className="text-4xl animate-pulse">👑</span>
              </div>
              <p className="text-pink-100 text-sm mt-2 flex items-center justify-center gap-2">
                <span>✨</span>
                <span>Seu streaming com todo cuidado e carinho</span>
                <span>✨</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border-2 border-pink-200 shadow-[0_15px_40px_rgba(236,72,153,0.2)] hover:shadow-[0_20px_50px_rgba(236,72,153,0.25)] transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                  <span className="text-3xl">🔍</span>
                  Como Solicitar seu Código
                </h2>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-5 border-2 border-pink-200">
                  <p className="text-gray-700 font-medium mb-3">Para pedir seu código:</p>
                  <ol className="list-decimal list-inside space-y-2 pl-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">💕</span>
                      <span>Preencha as informações necessárias abaixo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">💕</span>
                      <span>Aguarde a verificação do acesso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">💕</span>
                      <span>Solicite o código em seu dispositivo ou site</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                  <span className="text-3xl">📱</span>
                  Plataformas Aceitas
                </h3>
                <p className="text-gray-600">Esta plataforma aceita códigos para as seguintes plataformas:</p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button
                    onClick={() => handlePlatformSelect("Max")}
                    className={`group relative rounded-full px-8 py-6 font-bold transition-all duration-300 transform hover:scale-110 ${
                      selectedPlatform === "Max"
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(236,72,153,0.5)] scale-105"
                        : "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white shadow-[0_8px_25px_rgba(236,72,153,0.3)]"
                    } hover:shadow-[0_15px_40px_rgba(236,72,153,0.4)]`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-xl">🎬</span>
                      Max
                      {selectedPlatform === "Max" && <span className="animate-bounce">✓</span>}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-xl group-hover:bg-white/30 transition-all" />
                  </Button>

                  <Button
                    onClick={() => handlePlatformSelect("Globoplay")}
                    className={`group relative rounded-full px-8 py-6 font-bold transition-all duration-300 transform hover:scale-110 ${
                      selectedPlatform === "Globoplay"
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(236,72,153,0.5)] scale-105"
                        : "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white shadow-[0_8px_25px_rgba(236,72,153,0.3)]"
                    } hover:shadow-[0_15px_40px_rgba(236,72,153,0.4)]`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-xl">📺</span>
                      Globoplay
                      {selectedPlatform === "Globoplay" && <span className="animate-bounce">✓</span>}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-xl group-hover:bg-white/30 transition-all" />
                  </Button>

                  <Button
                    onClick={() => handlePlatformSelect("Disney+")}
                    className={`group relative rounded-full px-8 py-6 font-bold transition-all duration-300 transform hover:scale-110 ${
                      selectedPlatform === "Disney+"
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(236,72,153,0.5)] scale-105"
                        : "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white shadow-[0_8px_25px_rgba(236,72,153,0.3)]"
                    } hover:shadow-[0_15px_40px_rgba(236,72,153,0.4)]`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-xl">🏰</span>
                      Disney+
                      {selectedPlatform === "Disney+" && <span className="animate-bounce">✓</span>}
                    </span>
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-xl group-hover:bg-white/30 transition-all" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border-2 border-pink-200 shadow-[0_15px_40px_rgba(236,72,153,0.2)] hover:shadow-[0_20px_50px_rgba(236,72,153,0.25)] transition-all duration-300">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                <span className="text-3xl">📝</span>
                Acesso ao Código
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold text-lg">
                    <span className="text-2xl">👤</span>
                    Nome Do Stream
                  </label>
                  <Input
                    type="text"
                    placeholder="Digite o Nome do Stream. Exemp: Globo Canais"
                    value={streamName}
                    onChange={(e) => setStreamName(e.target.value)}
                    required
                    className="w-full p-4 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all bg-white/70 backdrop-blur-sm text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold text-lg">
                    <span className="text-2xl">✉️</span>
                    Seu Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-4 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all bg-white/70 backdrop-blur-sm text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-gray-700 font-semibold text-lg">
                    <span className="text-2xl">📞</span>
                    WhatsApp ou Telegram (Obrigatório)
                  </label>
                  <Input
                    type="tel"
                    placeholder="Digite seu WhatsApp ou Telegram"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-4 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all bg-white/70 backdrop-blur-sm text-lg"
                  />
                </div>

                {selectedPlatform && (
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl p-4 shadow-lg animate-pulse-slow">
                    <p className="text-purple-800 font-bold text-center flex items-center justify-center gap-2">
                      <span className="text-xl">✨</span>
                      Plataforma selecionada: {selectedPlatform}
                      <span className="text-xl">✨</span>
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!selectedPlatform}
                  className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 text-white font-bold py-6 rounded-xl text-xl shadow-[0_10px_30px_rgba(236,72,153,0.4)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-2xl">🔐</span>
                    Verificar Acesso
                    <span className="text-2xl">💖</span>
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-md border-2 border-pink-200 shadow-[0_15px_40px_rgba(236,72,153,0.2)] hover:shadow-[0_20px_50px_rgba(236,72,153,0.25)] transition-all duration-300">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center gap-3">
                <span className="text-3xl">📺</span>
                Como Usar a Plataforma
              </h2>
              <div className="aspect-video bg-gradient-to-br from-pink-200 via-purple-200 to-rose-200 rounded-2xl flex items-center justify-center shadow-inner border-4 border-pink-300/50">
                <div className="text-center">
                  <div className="text-7xl mb-4 animate-pulse">▶️</div>
                  <p className="font-bold text-gray-700 text-lg">Tutorial em vídeo</p>
                  <p className="text-pink-600 text-sm mt-2">Clique para assistir</p>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4 flex items-center justify-center gap-2">
                <span>🌸</span>
                <span>Assista ao vídeo tutorial para entender como solicitar e receber seus códigos</span>
                <span>🌸</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-3xl">🎀</span>
                  <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text">
                    Créditos
                  </h3>
                  <span className="text-3xl">🎀</span>
                </div>

                <div className="space-y-3 text-white">
                  <div className="flex items-center justify-center gap-3 text-lg">
                    <span className="text-pink-300">✨</span>
                    <span className="text-gray-300">Criado por:</span>
                    <a
                      href="https://t.me/neyjrs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text hover:from-pink-300 hover:to-rose-300 transition-all underline decoration-pink-400 hover:decoration-pink-300"
                    >
                      neyjrs
                    </a>
                    <span className="text-pink-300">✨</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-lg">
                    <span className="text-pink-300">💫</span>
                    <span className="text-gray-300">Desenvolvido por:</span>
                    <a
                      href="https://t.me/neyjrs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text hover:from-pink-300 hover:to-rose-300 transition-all underline decoration-pink-400 hover:decoration-pink-300"
                    >
                      neyjrs
                    </a>
                    <span className="text-pink-300">💫</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-pink-900/50">
                  <p className="text-gray-400 flex items-center justify-center gap-2">
                    <span>🌸</span>
                    <span>© 2025 Caixa das Princesinhas - Todos os direitos reservados</span>
                    <span>🌸</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateY(-40px) translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-float {
          animation: float infinite ease-in-out;
        }

        .animate-float-slow {
          animation: float-slow 3s infinite ease-in-out;
        }

        .animate-sparkle {
          animation: sparkle infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
