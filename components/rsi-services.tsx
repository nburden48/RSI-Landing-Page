import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Shield, Globe, Clock, Award } from "lucide-react"

export function RsiServices() {
  const services = [
    {
      title: "Criminal Background Checks",
      description: "Comprehensive criminal history searches at county, state, and federal levels.",
      icon: Shield,
    },
    {
      title: "Employment Verification",
      description: "Verify employment history, positions held, and reasons for leaving.",
      icon: Users,
    },
    {
      title: "Education Verification",
      description: "Confirm degrees, diplomas, and dates of attendance at educational institutions.",
      icon: Award,
    },
    {
      title: "Credit Reports",
      description: "Assess financial responsibility with detailed credit history reports.",
      icon: FileText,
    },
    {
      title: "Global Screening",
      description: "International background checks for multinational organizations.",
      icon: Globe,
    },
    {
      title: "Rapid Results",
      description: "Quick turnaround times with our efficient screening process.",
      icon: Clock,
    },
  ]

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Comprehensive Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="rsi-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <service.icon className="mr-2 h-5 w-5 text-primary-500" />
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
