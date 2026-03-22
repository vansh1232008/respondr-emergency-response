"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LandingNavbar } from "@/components/landing/landing-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, AlertTriangle, RotateCw, Send, Clock, CheckCircle, XCircle, Radio } from "lucide-react"
import { UrgencyIndicator } from "@/components/operator/urgency-indicator"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FieldStationPortal() {
  const [emergencies, setEmergencies] = useState<any[]>([])
  const [selectedEmergency, setSelectedEmergency] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<any[]>([])
  const [messageInput, setMessageInput] = useState("")

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      const emergenciesData = [
        {
          id: "emergency-1",
          type: "Medical",
          location: "Mumbai, Maharashtra",
          coordinates: { lat: 19.076, lng: 72.877 },
          timestamp: new Date().toISOString(),
          status: "active",
          urgency: "high",
          details: "Car accident on Highway 8. Multiple injuries reported.",
          caller: "Unknown",
          assignedTo: "Ambulance #42",
          eta: "8 min",
          progress: 35,
          resources: [
            { type: "Ambulance", count: 2, status: "Dispatched" },
            { type: "Police", count: 1, status: "En Route" },
          ],
          vitalSigns: {
            patients: 3,
            critical: 1,
            stable: 2,
          },
        },
        {
          id: "emergency-2",
          type: "Fire",
          location: "Delhi, NCR",
          coordinates: { lat: 28.613, lng: 77.209 },
          timestamp: new Date(Date.now() - 600000).toISOString(),
          status: "active",
          urgency: "medium",
          details: "Apartment building fire on 3rd floor. Smoke visible.",
          caller: "Raj Patel",
          assignedTo: "Fire Engine #3",
          eta: "11 min",
          progress: 65,
          resources: [
            { type: "Fire Engine", count: 2, status: "On Scene" },
            { type: "Ambulance", count: 1, status: "Standby" },
          ],
          vitalSigns: {
            patients: 0,
            critical: 0,
            stable: 0,
          },
        },
        {
          id: "emergency-3",
          type: "Police",
          location: "Bangalore, Karnataka",
          coordinates: { lat: 12.972, lng: 77.594 },
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          status: "active",
          urgency: "low",
          details: "Suspicious activity reported near bank.",
          caller: "Priya Singh",
          assignedTo: "Police Unit #8",
          eta: "6 min",
          progress: 80,
          resources: [{ type: "Police", count: 2, status: "On Scene" }],
          vitalSigns: {
            patients: 0,
            critical: 0,
            stable: 0,
          },
        },
      ]

      setEmergencies(emergenciesData)
      setSelectedEmergency(emergenciesData[0])

      // Initialize messages
      setMessages([
        {
          id: 1,
          sender: "Operator",
          text: "Ambulance #42 has been dispatched to your location. ETA 8 minutes.",
          timestamp: new Date(Date.now() - 300000).toISOString(),
        },
        {
          id: 2,
          sender: "System",
          text: "Emergency status updated to ACTIVE.",
          timestamp: new Date(Date.now() - 240000).toISOString(),
        },
        {
          id: 3,
          sender: "Operator",
          text: "Police Unit #8 also dispatched for traffic control.",
          timestamp: new Date(Date.now() - 180000).toISOString(),
        },
      ])

      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleEmergencySelect = (emergency: any) => {
    setSelectedEmergency(emergency)
  }

  const handleStatusUpdate = (id: string, newStatus: string) => {
    setEmergencies((prev) =>
      prev.map((emergency) => (emergency.id === id ? { ...emergency, status: newStatus } : emergency)),
    )

    if (selectedEmergency?.id === id) {
      setSelectedEmergency((prev) => ({ ...prev, status: newStatus }))

      // Add status update message
      const newMessage = {
        id: Date.now(),
        sender: "System",
        text: `Emergency status updated to ${newStatus.toUpperCase()}.`,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, newMessage])
    }
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    const newMessage = {
      id: Date.now(),
      sender: "Field Unit",
      text: messageInput,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessageInput("")

    // Simulate operator response after 2 seconds
    setTimeout(() => {
      const responseMessage = {
        id: Date.now() + 1,
        sender: "Operator",
        text: "Message received. Keep us updated on the situation.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, responseMessage])
    }, 2000)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Simple map placeholder component
  const SimpleMap = ({ location }: { location: { lat: number; lng: number } }) => {
    return (
      <div className="h-full w-full bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full grid grid-cols-10 grid-rows-10">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="border border-slate-700/30" />
            ))}
          </div>

          {/* Main roads */}
          <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-700 transform -translate-y-1/2" />
          <div className="absolute top-0 bottom-0 left-1/2 w-4 bg-slate-700 transform -translate-x-1/2" />

          {/* Location marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse" />
            <div className="w-16 h-16 bg-red-500/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" />
          </div>

          {/* Emergency units */}
          <div className="absolute top-[60%] left-[40%]">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
          </div>
          <div className="absolute top-[30%] left-[60%]">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
          </div>
        </div>

        <div className="bg-slate-900/80 px-3 py-1 rounded text-xs z-10">
          Location: {location.lat.toFixed(3)}, {location.lng.toFixed(3)}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <LandingNavbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold">Field Station Portal</h1>
              <p className="text-muted-foreground">Manage emergency responses and update status</p>
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
              <Button variant="outline" size="sm">
                <RotateCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Emergencies Panel */}
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
                      <AlertTriangle className="mr-2 h-5 w-5 text-blue-500" />
                      Active Emergencies
                    </span>
                    <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">{emergencies.length}</Badge>
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
                      {emergencies.map((emergency) => (
                        <div
                          key={emergency.id}
                          onClick={() => handleEmergencySelect(emergency)}
                          className={`p-4 cursor-pointer transition-colors ${
                            selectedEmergency?.id === emergency.id
                              ? "bg-accent/50 border-l-4 border-l-blue-500"
                              : "hover:bg-accent/30"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <UrgencyIndicator level={emergency.urgency} />
                              <span className="font-medium">{emergency.type}</span>
                            </div>
                            <Badge variant={emergency.status === "resolved" ? "outline" : "default"}>
                              {emergency.status === "resolved" ? "Resolved" : "Active"}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">{emergency.location}</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>{emergency.progress}%</span>
                            </div>
                            <Progress value={emergency.progress} className="h-1.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Emergency Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="h-full border border-border/50 shadow-lg">
                {isLoading || !selectedEmergency ? (
                  <div className="h-full flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 animate-pulse"></div>
                      <h3 className="text-lg font-medium mb-2">Loading emergency data...</h3>
                      <p className="text-muted-foreground">Please wait while we retrieve the emergency information</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <CardHeader className="pb-3 border-b border-border/50">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                            <AlertTriangle className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle>{selectedEmergency.type} Emergency</CardTitle>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{selectedEmergency.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Assigned to: {selectedEmergency.assignedTo}</Badge>
                          <Badge
                            variant={
                              selectedEmergency.urgency === "high"
                                ? "destructive"
                                : selectedEmergency.urgency === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {selectedEmergency.urgency.charAt(0).toUpperCase() + selectedEmergency.urgency.slice(1)}{" "}
                            Priority
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Tabs defaultValue="details" className="w-full">
                        <TabsList className="w-full rounded-none border-b border-border/50">
                          <TabsTrigger value="details" className="flex-1">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Details
                          </TabsTrigger>
                          <TabsTrigger value="map" className="flex-1">
                            <MapPin className="mr-2 h-4 w-4" />
                            Location
                          </TabsTrigger>
                          <TabsTrigger value="communication" className="flex-1">
                            <Radio className="mr-2 h-4 w-4" />
                            Communication
                          </TabsTrigger>
                          <TabsTrigger value="status" className="flex-1">
                            <Clock className="mr-2 h-4 w-4" />
                            Status
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="p-4 space-y-4">
                          <div className="bg-muted/30 rounded-lg p-4">
                            <h3 className="text-lg font-medium mb-3">Emergency Details</h3>
                            <p className="text-foreground/80 mb-4">{selectedEmergency.details}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="bg-background/50 rounded-md p-3">
                                <div className="text-sm text-muted-foreground mb-1">Caller Information</div>
                                <div className="font-medium">{selectedEmergency.caller}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Reported at: {formatTimestamp(selectedEmergency.timestamp)}
                                </div>
                              </div>

                              <div className="bg-background/50 rounded-md p-3">
                                <div className="text-sm text-muted-foreground mb-1">Response Status</div>
                                <div className="font-medium">{selectedEmergency.assignedTo}</div>
                                <div className="text-xs text-muted-foreground mt-1">ETA: {selectedEmergency.eta}</div>
                              </div>
                            </div>

                            {selectedEmergency.vitalSigns.patients > 0 && (
                              <div className="mt-4">
                                <div className="text-sm font-medium mb-2">Patient Information</div>
                                <div className="grid grid-cols-3 gap-3">
                                  <div className="bg-background/50 rounded-md p-3 text-center">
                                    <div className="text-2xl font-bold">{selectedEmergency.vitalSigns.patients}</div>
                                    <div className="text-xs text-muted-foreground">Total Patients</div>
                                  </div>
                                  <div className="bg-background/50 rounded-md p-3 text-center">
                                    <div className="text-2xl font-bold text-red-500">
                                      {selectedEmergency.vitalSigns.critical}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Critical</div>
                                  </div>
                                  <div className="bg-background/50 rounded-md p-3 text-center">
                                    <div className="text-2xl font-bold text-green-500">
                                      {selectedEmergency.vitalSigns.stable}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Stable</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="bg-muted/30 rounded-lg p-4">
                            <h3 className="text-lg font-medium mb-3">Dispatched Resources</h3>
                            <div className="space-y-3">
                              {selectedEmergency.resources.map((resource: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center bg-background/50 rounded-md p-3"
                                >
                                  <div>
                                    <div className="font-medium">{resource.type}</div>
                                    <div className="text-xs text-muted-foreground">Units: {resource.count}</div>
                                  </div>
                                  <Badge variant="outline">{resource.status}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="map" className="p-4">
                          <div className="bg-muted/30 rounded-lg p-4 h-[400px]">
                            <SimpleMap location={selectedEmergency.coordinates} />
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <div>
                              <div className="text-sm text-muted-foreground">Emergency Location</div>
                              <div className="font-medium">{selectedEmergency.location}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Coordinates: {selectedEmergency.coordinates.lat.toFixed(6)},{" "}
                                {selectedEmergency.coordinates.lng.toFixed(6)}
                              </div>
                            </div>
                            <Button className="glow-effect">
                              <MapPin className="mr-2 h-4 w-4" />
                              Get Directions
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="communication" className="p-4">
                          <div className="bg-muted/30 rounded-lg p-4 h-[400px] flex flex-col">
                            <h3 className="text-lg font-medium mb-3">Communication Log</h3>

                            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                              {messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`flex ${message.sender === "Field Unit" ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                      message.sender === "Field Unit"
                                        ? "bg-blue-500/20 text-blue-50"
                                        : message.sender === "System"
                                          ? "bg-muted/50 text-foreground/80 italic"
                                          : "bg-background/50 text-foreground"
                                    }`}
                                  >
                                    <div className="text-xs text-foreground/60 mb-1">
                                      {message.sender} • {formatTimestamp(message.timestamp)}
                                    </div>
                                    <div>{message.text}</div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center">
                              <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-background rounded-l-md border border-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleSendMessage()
                                  }
                                }}
                              />
                              <Button
                                className="rounded-l-none"
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Send
                              </Button>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="status" className="p-4">
                          <div className="bg-muted/30 rounded-lg p-4">
                            <h3 className="text-lg font-medium mb-3">Emergency Status</h3>

                            <div className="mb-6">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progress</span>
                                <span>{selectedEmergency.progress}%</span>
                              </div>
                              <Progress value={selectedEmergency.progress} className="h-2" />
                            </div>

                            <div className="space-y-3">
                              <div className="bg-background/50 rounded-md p-3">
                                <div className="text-sm text-muted-foreground mb-1">Current Status</div>
                                <div className="font-medium">
                                  {selectedEmergency.status === "active" ? "Active" : "Resolved"}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Last updated: {formatTimestamp(selectedEmergency.timestamp)}
                                </div>
                              </div>

                              <div className="bg-background/50 rounded-md p-3">
                                <div className="text-sm text-muted-foreground mb-3">Update Status</div>
                                <div className="flex flex-wrap gap-2">
                                  <Button
                                    size="sm"
                                    variant={selectedEmergency.status === "active" ? "default" : "outline"}
                                    onClick={() => handleStatusUpdate(selectedEmergency.id, "active")}
                                  >
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Active
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleStatusUpdate(selectedEmergency.id, "in_progress")}
                                  >
                                    <Clock className="h-3 w-3 mr-1" />
                                    In Progress
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={selectedEmergency.status === "resolved" ? "default" : "outline"}
                                    onClick={() => handleStatusUpdate(selectedEmergency.id, "resolved")}
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Resolved
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive hover:text-destructive"
                                    onClick={() => handleStatusUpdate(selectedEmergency.id, "cancelled")}
                                  >
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Cancelled
                                  </Button>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <Button className="w-full glow-effect">
                                <Radio className="mr-2 h-4 w-4" />
                                Request Additional Resources
                              </Button>
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
      </main>
    </div>
  )
}
