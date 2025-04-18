import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "Reference Services Inc. has streamlined our background check process, saving us time and providing reliable results.",
      author: "Sarah Johnson",
      role: "HR Director",
      company: "Tech Innovations Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote: "The dashboard is intuitive and provides all the information we need at a glance. Excellent service!",
      author: "Michael Chen",
      role: "Hiring Manager",
      company: "Global Solutions LLC",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "We've been using RSI for all our background screening needs for over 5 years. Their attention to detail is unmatched.",
      author: "Emily Rodriguez",
      role: "VP of Human Resources",
      company: "Enterprise Corp",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <svg className="h-8 w-8 text-primary-300" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center mt-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                    <AvatarFallback className="bg-primary-100 text-primary-700">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
