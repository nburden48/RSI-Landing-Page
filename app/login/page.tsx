import { LoginForm } from "@/components/auth/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <LoginForm />
      </div>

      {/* Right side - Background image */}
      <div className="hidden md:block md:flex-1 relative bg-primary-700">
        <Image
          src="/images/rsi-hero-bg.jpg"
          alt="Background screening professionals"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Trusted Background Screening Solutions</h2>
          <p className="text-xl max-w-md text-center">
            Access your background checks, manage applicants, and track screening progress all in one place.
          </p>
        </div>
      </div>
    </div>
  )
}
