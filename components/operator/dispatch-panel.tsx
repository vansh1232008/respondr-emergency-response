"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Ambulance, CarIcon as PoliceCar, Flame, MapPin, CheckCircle, AlertTriangle, Radio, Shield } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useFirebaseData } from "@/hooks/useFirebaseData"

interface DispatchPanelProps {
      caseId: string
  location: {
    lat: number
    lng: number
  }
}

const emergencyServices = [
  {
    id: "ambulance-1",
    type: "ambulance",
    name: "Ambulance #42",
    icon: Ambulance,
    distance: "3.2 km",
    eta: "8 min",
    status: "available",
    crew: 3,
    equipment: "Advanced Life Support",
    fuelLevel: 85,
  },
  {
    id: "ambulance-2",
    type: "ambulance",
    name: "Ambulance #17",
    icon: Ambulance,
    distance: "5.7 km",
    eta: "14 min",
    status: "available",
    crew: 2,
    equipment: "Basic Life Support",
    fuelLevel: 92,
  },
  {
    id: "police-1",
    type: "police",
    name: "Police Unit #8",
    icon: PoliceCar,
    distance: "2.1 km",
    eta: "6 min",
    status: "available",
    crew: 2,
    equipment: "Standard Patrol",
    fuelLevel: 78,
  },
  {
    id: "fire-1",
    type: "fire",
    name: "Fire Engine #3",
    icon: Flame,
    distance: "4.5 km",
    eta: "11 min",
    status: "available",
    crew: 5,
    equipment: "Full Fire Response",
    fuelLevel: 90,
  },
]

export const DispatchPanel = ({ location }: DispatchPanelProps) => {
      const { updateCase } = useFirebaseData()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [dispatchSent, setDispatchSent] = useState(false)
  const [dispatchProgress, setDispatchProgress] = useState(0)
  const [dispatchStatus, setDispatchStatus] = useState("Preparing")
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const toggleService = (id: string) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((serviceId) => serviceId !== id) : [...prev, id]))
  }

  const handleDispatch = () => {
    if (selectedServices.length === 0) return

    // Simulate dispatch process
    setDispatchProgress(0)
    setDispatchStatus("Initiating dispatch")

      const interval = setInterval(() => {
          setDispatchProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval)
              setDispatchSent(true)
              setDispatchStatus("Dispatch complete")

              // ← PUSH the dispatch update into your RTDB
              updateCase(caseId, {
                status: "dispatched",
                assignedServices: selectedServices,
                dispatchTimestamp: Date.now(),
              })

              return 100
            }

        // Update status based on progress
        if (prev === 0) setDispatchStatus("Contacting units")
        else if (prev === 25) setDispatchStatus("Sending location data")
        else if (prev === 50) setDispatchStatus("Confirming dispatch")
        else if (prev === 75) setDispatchStatus("Units responding")

        return prev + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }

  const toggleDetails = (id: string) => {
    setShowDetails((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="font-medium">Emergency Location</span>
        </div>
        <div className="bg-background/50 rounded-md p-3">
          <div className="text-sm mb-1">Coordinates</div>
          <div className="font-medium">
            {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
          </div>
        </div>
      </div>

      {dispatchSent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-muted/30 rounded-lg p-6"
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Dispatch Sent Successfully</h3>
            <p className="text-muted-foreground mb-6">
              Emergency services have been notified and are on their way to the location.
            </p>
          </div>

          <div className="space-y-4">
            {selectedServices.map((id) => {
              const service = emergencyServices.find((s) => s.id === id)
              return service ? (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background/50 rounded-lg border border-border/50 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-3 border-b border-border/50">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                        <service.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-xs text-muted-foreground">Status: En Route</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge variant="outline" className="mb-1">
                        ETA: {service.eta}
                      </Badge>
                      <div className="text-xs text-muted-foreground">Distance: {service.distance}</div>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Route Progress</span>
                      <span className="text-xs text-muted-foreground">25% Complete</span>
                    </div>
                    <Progress value={25} className="h-2 mb-4" />

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Crew:</span> {service.crew} personnel
                      </div>
                      <div>
                        <span className="text-muted-foreground">Equipment:</span> {service.equipment}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fuel Level:</span> {service.fuelLevel}%
                      </div>
                      <div>
                        <span className="text-muted-foreground">Estimated Arrival:</span> {service.eta}
                      </div>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Radio className="h-3 w-3 mr-1" />
                        Contact Unit
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : null
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline" onClick={() => setDispatchSent(false)}>
              Back to Dispatch
            </Button>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium">Available Emergency Services</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {emergencyServices.length} Units Available
              </Badge>
            </div>

            <div className="space-y-3">
              {emergencyServices.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all ${
                    selectedServices.includes(service.id) ? "border-blue-500 bg-blue-500/10" : ""
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="p-3 flex justify-between items-center" onClick={() => toggleService(service.id)}>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                          <service.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground">Distance: {service.distance}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge variant="outline" className="mb-1">
                          ETA: {service.eta}
                        </Badge>
                        {selectedServices.includes(service.id) && <CheckCircle className="h-4 w-4 text-blue-500" />}
                      </div>
                    </div>

                    <div className="flex justify-end px-3 pb-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleDetails(service.id)
                        }}
                      >
                        {showDetails === service.id ? "Hide Details" : "Show Details"}
                      </Button>
                    </div>

                    <AnimatePresence>
                      {showDetails === service.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 border-t border-border/50 pt-3">
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div>
                                <span className="text-muted-foreground">Crew:</span> {service.crew} personnel
                              </div>
                              <div>
                                <span className="text-muted-foreground">Equipment:</span> {service.equipment}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Fuel Level:</span> {service.fuelLevel}%
                              </div>
                              <div>
                                <span className="text-muted-foreground">Status:</span> {service.status}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {dispatchProgress > 0 && dispatchProgress < 100 ? (
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Dispatch in Progress</span>
                <span className="text-sm">{dispatchProgress}%</span>
              </div>
              <Progress value={dispatchProgress} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">{dispatchStatus}...</p>
            </div>
          ) : (
            <Button
              className="w-full py-6 text-lg glow-effect group relative overflow-hidden"
              disabled={selectedServices.length === 0}
              onClick={handleDispatch}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <Shield className="mr-2 h-5 w-5" />
              Dispatch Selected Services
            </Button>
          )}
        </>
      )}
    </div>
  )
}
