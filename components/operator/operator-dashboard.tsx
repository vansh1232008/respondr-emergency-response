"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  Phone,
  User,
  MapPin,
  Clock,
  AlertTriangle,
  XCircle,
  Headphones,
  Volume2,
  VolumeX,
  Send,
  BarChart4,
  Activity,
  Radio,
  Shield,
  Zap,
} from "lucide-react"
import { LiveMap } from "@/components/operator/live-map"
import { AudioWaveform } from "@/components/operator/audio-waveform"
import { TranscriptionDisplay } from "@/components/operator/transcription-display"
import { UrgencyIndicator } from "@/components/operator/urgency-indicator"
import { DispatchPanel } from "@/components/operator/dispatch-panel"
import { useFirebaseData } from "@/hooks/useFirebaseData"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for charts
const callVolumeData = [
  { time: "00:00", calls: 12 },
  { time: "02:00", calls: 8 },
  { time: "04:00", calls: 5 },
  { time: "06:00", calls: 7 },
  { time: "08:00", calls: 15 },
  { time: "10:00", calls: 22 },
  { time: "12:00", calls: 28 },
  { time: "14:00", calls: 32 },
  { time: "16:00", calls: 38 },
  { time: "18:00", calls: 42 },
  { time: "20:00", calls: 30 },
  { time: "22:00", calls: 20 },
]

const responseTimeData = [
  { category: "Critical", time: 4.2 },
  { category: "High", time: 6.8 },
  { category: "Medium", time: 9.5 },
  { category: "Low", time: 12.3 },
]

const callTypeData = [
  { name: "Medical", value: 45 },
  { name: "Fire", value: 15 },
  { name: "Police", value: 30 },
  { name: "Other", value: 10 },
]

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"]

export const OperatorDashboard = () => {
  const { cases: activeCalls, isLoading, error } = useFirebaseData()
  const [selectedCall, setSelectedCall] = useState<any | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [callVolume, setCallVolume] = useState(70)
  const [notifications, setNotifications] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationSound = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    notificationSound.current = new Audio("/notification.mp3")
    return () => {
      if (notificationSound.current) {
        notificationSound.current = null
      }
    }
  }, [])

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      const callsData = [
        {
          id: "call-1",
          caller: "Unknown",
          location: "Mumbai, Maharashtra",
          coordinates: { lat: 19.076, lng: 72.877 },
          timestamp: new Date().toISOString(),
          status: "active",
          urgency: "high",
          language: "Hindi",
          transcript: [
            { text: "Hello? I need help! There's been an accident on Highway 8.", time: "00:05" },
            { text: "A car crashed into a divider. I think people are injured.", time: "00:12" },
            { text: "Please send an ambulance quickly!", time: "00:18" },
          ],
          emotionAnalysis: {
            distress: 85,
            fear: 65,
            urgency: 90,
          },
          callQuality: 87,
          backgroundNoise: "Traffic sounds, moderate",
        },
        {
          id: "call-2",
          caller: "Raj Patel",
          location: "Delhi, NCR",
          coordinates: { lat: 28.613, lng: 77.209 },
          timestamp: new Date(Date.now() - 120000).toISOString(),
          status: "active",
          urgency: "medium",
          language: "English",
          transcript: [
            { text: "I'd like to report a fire in an apartment building.", time: "00:03" },
            { text: "It's on the 3rd floor. I can see smoke coming out.", time: "00:10" },
          ],
          emotionAnalysis: {
            distress: 70,
            fear: 55,
            urgency: 75,
          },
          callQuality: 92,
          backgroundNoise: "Indoor environment, low",
        },
        {
          id: "call-3",
          caller: "Priya Singh",
          location: "Bangalore, Karnataka",
          coordinates: { lat: 12.972, lng: 77.594 },
          timestamp: new Date(Date.now() - 300000).toISOString(),
          status: "active",
          urgency: "low",
          language: "Kannada",
          transcript: [
            { text: "I'm calling about a water main break on my street.", time: "00:07" },
            { text: "The road is getting flooded.", time: "00:15" },
          ],
          emotionAnalysis: {
            distress: 30,
            fear: 15,
            urgency: 45,
          },
          callQuality: 95,
          backgroundNoise: "Outdoor environment, water sounds",
        },
      ]

      setActiveCalls(callsData)
      setSelectedCall(callsData[0])
      setIsLoading(false)

      // Simulate incoming notification after 5 seconds
      setTimeout(() => {
        const newNotification = {
          id: Date.now(),
          type: "incoming-call",
          title: "New Emergency Call",
          message: "Incoming call from Chennai, Tamil Nadu",
          time: new Date().toISOString(),
          urgency: "high",
        }

        setNotifications((prev) => [newNotification, ...prev])

        // Play notification sound
        if (notificationSound.current && !isMuted) {
          notificationSound.current.play()
        }
      }, 5000)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isMuted])

  const handleCallSelect = (call: any) => {
    setSelectedCall(call)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "success"
      default:
        return "default"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const dismissNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col space-y-4">
          {/* Header with controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold">Operator Portal</h1>
              <p className="text-muted-foreground">Manage emergency calls and dispatch resources</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4 mt-4 md:mt-0"
            >
              <Badge variant="outline" className="px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                Online
              </Badge>

              {/* Notification bell */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Radio className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>

                {/* Notification dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg border border-border z-50"
                    >
                      <div className="p-3 border-b border-border">
                        <h3 className="font-medium">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-muted-foreground">No notifications</div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="p-3 border-b border-border hover:bg-accent/50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center">
                                    <UrgencyIndicator level={notification.urgency} />
                                    <span className="font-medium">{notification.title}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {formatTimestamp(notification.time)}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => dismissNotification(notification.id)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="hidden md:flex"
              >
                <BarChart4 className="mr-2 h-4 w-4" />
                {showAnalytics ? "Hide Analytics" : "Show Analytics"}
              </Button>

              <Button variant="outline" size="sm" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
            </motion.div>
          </div>

          {/* Analytics Dashboard */}
          <AnimatePresence>
            {showAnalytics && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-blue-500" />
                      Real-time Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Call Volume Chart */}
                      <div className="lg:col-span-2">
                        <h3 className="text-sm font-medium mb-2">Call Volume (24 Hours)</h3>
                        <div className="h-64 bg-muted/30 rounded-lg p-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={callVolumeData}>
                              <defs>
                                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis dataKey="time" stroke="#6b7280" />
                              <YAxis stroke="#6b7280" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#1f2937",
                                  borderColor: "#374151",
                                  color: "#f9fafb",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="calls"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#colorCalls)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Call Type Distribution */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Call Type Distribution</h3>
                        <div className="h-64 bg-muted/30 rounded-lg p-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={callTypeData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {callTypeData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#1f2937",
                                  borderColor: "#374151",
                                  color: "#f9fafb",
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Response Time by Category */}
                      <div className="lg:col-span-3">
                        <h3 className="text-sm font-medium mb-2">Average Response Time by Priority (minutes)</h3>
                        <div className="h-48 bg-muted/30 rounded-lg p-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={responseTimeData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis dataKey="category" stroke="#6b7280" />
                              <YAxis stroke="#6b7280" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#1f2937",
                                  borderColor: "#374151",
                                  color: "#f9fafb",
                                }}
                              />
                              <Bar dataKey="time" fill="#3b82f6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Calls Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="border border-border/50 shadow-lg">
                <CardHeader className="pb-3 border-b border-border/50">
                  <CardTitle className="flex justify-between items-center">
                    <span className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-blue-500" />
                      Active Calls
                    </span>
                    <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">{activeCalls.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="space-y-3 p-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3 rounded-lg bg-muted animate-pulse h-24"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="divide-y divide-border/50">
                      {activeCalls.map((call) => (
                        <div
                          key={call.id}
                          onClick={() => handleCallSelect(call)}
                          className={`p-4 cursor-pointer transition-colors ${
                            selectedCall?.id === call.id
                              ? "bg-accent/50 border-l-4 border-l-blue-500"
                              : "hover:bg-accent/30"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <UrgencyIndicator level={call.urgency} />
                              <span className="font-medium">{call.caller}</span>
                            </div>
                            <Badge variant={getUrgencyColor(call.urgency)} className="uppercase text-xs font-bold">
                              {call.urgency}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">{call.location}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Shield className="h-3 w-3 mr-1" />
                              {call.language}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimestamp(call.timestamp)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Call Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="h-full border border-border/50 shadow-lg">
                {isLoading || !selectedCall ? (
                  <div className="h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 animate-pulse"></div>
                      <h3 className="text-lg font-medium mb-2">Loading call data...</h3>
                      <p className="text-muted-foreground">Please wait while we retrieve the call information</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <CardHeader className="pb-3 border-b border-border/50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle>{selectedCall.caller}</CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{selectedCall.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{selectedCall.language}</Badge>
                          <Badge variant={getUrgencyColor(selectedCall.urgency)}>
                            {selectedCall.urgency.charAt(0).toUpperCase() + selectedCall.urgency.slice(1)} Priority
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Tabs defaultValue="live" className="w-full">
                        <TabsList className="w-full rounded-none border-b border-border/50">
                          <TabsTrigger value="live" className="flex-1">
                            <Phone className="mr-2 h-4 w-4" />
                            Live Call
                          </TabsTrigger>
                          <TabsTrigger value="map" className="flex-1">
                            <MapPin className="mr-2 h-4 w-4" />
                            Location
                          </TabsTrigger>
                          <TabsTrigger value="dispatch" className="flex-1">
                            <Radio className="mr-2 h-4 w-4" />
                            Dispatch
                          </TabsTrigger>
                          <TabsTrigger value="analysis" className="flex-1">
                            <Activity className="mr-2 h-4 w-4" />
                            Analysis
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="live" className="p-4 space-y-4">
                          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>Call in progress</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
                                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <XCircle className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>

                          <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <Headphones className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-medium">Live Audio</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-muted-foreground">Volume</span>
                                <Slider
                                  value={[callVolume]}
                                  max={100}
                                  step={1}
                                  className="w-32"
                                  onValueChange={(value) => setCallVolume(value[0])}
                                />
                              </div>
                            </div>
                            <AudioWaveform />
                            <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                              <span>Call Quality: {selectedCall.callQuality}%</span>
                              <span>Background: {selectedCall.backgroundNoise}</span>
                            </div>
                          </div>

                          <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center mb-3">
                              <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="font-medium">AI Analysis</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-background/50 rounded-md p-3">
                                <div className="text-sm text-muted-foreground mb-1">Distress Level</div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">{selectedCall.emotionAnalysis.distress}%</span>
                                  <UrgencyIndicator
                                    level={
                                      selectedCall.emotionAnalysis.distress > 70
                                        ? "high"
                                        : selectedCall.emotionAnalysis.distress > 40
                                          ? "medium"
                                          : "low"
                                    }
                                  />
                                </div>
                                <Progress value={selectedCall.emotionAnalysis.distress} className="h-2" />
                              </div>
                              <div className="bg-background/50 rounded-md p-3">
                                <div className="text-sm text-muted-foreground mb-1">Fear Level</div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">{selectedCall.emotionAnalysis.fear}%</span>
                                  <UrgencyIndicator
                                    level={
                                      selectedCall.emotionAnalysis.fear > 70
                                        ? "high"
                                        : selectedCall.emotionAnalysis.fear > 40
                                          ? "medium"
                                          : "low"
                                    }
                                  />
                                </div>
                                <Progress value={selectedCall.emotionAnalysis.fear} className="h-2" />
                              </div>
                              <div className="bg-background/50 rounded-md p-3">
                                <div className="text-sm text-muted-foreground mb-1">Urgency Level</div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">{selectedCall.emotionAnalysis.urgency}%</span>
                                  <UrgencyIndicator
                                    level={
                                      selectedCall.emotionAnalysis.urgency > 70
                                        ? "high"
                                        : selectedCall.emotionAnalysis.urgency > 40
                                          ? "medium"
                                          : "low"
                                    }
                                  />
                                </div>
                                <Progress value={selectedCall.emotionAnalysis.urgency} className="h-2" />
                              </div>
                            </div>
                          </div>

                          <div className="bg-muted/30 rounded-lg p-4">
                            <div className="flex items-center mb-3">
                              <span className="font-medium">Live Transcription</span>
                            </div>
                            <TranscriptionDisplay transcript={selectedCall.transcript} />

                            <div className="mt-4 flex items-center">
                              <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 bg-background rounded-l-md border border-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              />
                              <Button className="rounded-l-none">
                                <Send className="h-4 w-4 mr-2" />
                                Send
                              </Button>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="map" className="p-4">
                          <div className="bg-muted/30 rounded-lg p-4 h-[400px]">
                            <LiveMap location={selectedCall.coordinates} />
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div>
                              <div className="text-sm text-muted-foreground">Caller Location</div>
                              <div className="font-medium">{selectedCall.location}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Coordinates: {selectedCall.coordinates.lat.toFixed(6)},{" "}
                                {selectedCall.coordinates.lng.toFixed(6)}
                              </div>
                            </div>
                            <Button className="glow-effect">
                              <MapPin className="mr-2 h-4 w-4" />
                              Get Directions
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="dispatch" className="p-4">
                          <DispatchPanel location={selectedCall.coordinates} />
                        </TabsContent>

                        <TabsContent value="analysis" className="p-4">
                          <div className="space-y-4">
                            <div className="bg-muted/30 rounded-lg p-4">
                              <h3 className="text-lg font-medium mb-3">Call Analysis</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Language Detection</div>
                                    <div className="font-medium">{selectedCall.language}</div>
                                    <div className="text-xs text-muted-foreground mt-1">Confidence: 98%</div>
                                  </div>

                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Call Quality</div>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{selectedCall.callQuality}%</span>
                                    </div>
                                    <Progress value={selectedCall.callQuality} className="h-2" />
                                  </div>

                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Background Environment</div>
                                    <div className="font-medium">{selectedCall.backgroundNoise}</div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Emotion Analysis</div>
                                    <div className="space-y-2">
                                      <div>
                                        <div className="flex justify-between text-xs">
                                          <span>Distress</span>
                                          <span>{selectedCall.emotionAnalysis.distress}%</span>
                                        </div>
                                        <Progress value={selectedCall.emotionAnalysis.distress} className="h-1.5" />
                                      </div>
                                      <div>
                                        <div className="flex justify-between text-xs">
                                          <span>Fear</span>
                                          <span>{selectedCall.emotionAnalysis.fear}%</span>
                                        </div>
                                        <Progress value={selectedCall.emotionAnalysis.fear} className="h-1.5" />
                                      </div>
                                      <div>
                                        <div className="flex justify-between text-xs">
                                          <span>Urgency</span>
                                          <span>{selectedCall.emotionAnalysis.urgency}%</span>
                                        </div>
                                        <Progress value={selectedCall.emotionAnalysis.urgency} className="h-1.5" />
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="text-sm text-muted-foreground mb-1">Key Entities Detected</div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      <Badge variant="outline">Accident</Badge>
                                      <Badge variant="outline">Highway 8</Badge>
                                      <Badge variant="outline">Injuries</Badge>
                                      <Badge variant="outline">Ambulance</Badge>
                                      <Badge variant="outline">Car</Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-muted/30 rounded-lg p-4">
                              <h3 className="text-lg font-medium mb-3">AI Recommendations</h3>
                              <div className="space-y-3">
                                <div className="flex items-start p-3 bg-background/50 rounded-lg">
                                  <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium">Dispatch ambulance immediately</div>
                                    <div className="text-sm text-muted-foreground">
                                      High urgency detected. Multiple injuries reported. Recommend dispatching nearest
                                      available ambulance.
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-start p-3 bg-background/50 rounded-lg">
                                  <Shield className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium">Notify traffic control</div>
                                    <div className="text-sm text-muted-foreground">
                                      Accident on Highway 8 may cause traffic congestion. Recommend notifying traffic
                                      control for possible diversion.
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-start p-3 bg-background/50 rounded-lg">
                                  <Zap className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium">Caller reassurance needed</div>
                                    <div className="text-sm text-muted-foreground">
                                      Caller showing high distress levels. Recommend providing reassurance that help is
                                      on the way.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
