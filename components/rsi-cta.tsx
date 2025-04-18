"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail } from "lucide-react"

interface RsiCtaProps {
  title: string
  description: string
  primaryButtonText: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export function RsiCta({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}: RsiCtaProps) {
  return (
    <Card className="bg-primary-50 border-primary-100">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1 text-primary-900">{title}</h2>
            <p className="text-primary-700">{description}</p>
          </div>
          <div className="flex gap-3">
            {secondaryButtonText && (
              <Button variant="outline" onClick={onSecondaryClick}>
                {secondaryButtonText}
              </Button>
            )}
            <Button onClick={onPrimaryClick}>{primaryButtonText}</Button>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-primary-100 flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex items-center gap-2 text-primary-700">
            <Phone className="h-4 w-4" />
            <span>Call us: (800) 555-1234</span>
          </div>
          <div className="flex items-center gap-2 text-primary-700">
            <Mail className="h-4 w-4" />
            <span>Email: support@referenceservicesinc.com</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
