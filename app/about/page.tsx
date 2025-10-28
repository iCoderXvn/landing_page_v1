import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/settings'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company and what we do',
}

export default function AboutPage() {
  const settings = getSiteSettings()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
            About {settings.siteName}
          </h1>
          
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              Welcome to <span className="text-blue-400 font-semibold">{settings.siteName}</span>, 
              your trusted partner in automation solutions and web development.
            </p>

            <p>
              {settings.siteDescription}
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6">
              Our Mission
            </h2>
            <p>
              We are dedicated to building the future through automation, one bot at a time. 
              Our mission is to help businesses and individuals leverage the power of automation 
              to streamline their workflows, increase efficiency, and achieve their goals.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6">
              What We Do
            </h2>
            <ul className="space-y-3 list-disc list-inside ml-4">
              <li>Trading Bot Development</li>
              <li>MMO Automation Solutions</li>
              <li>Discord Bot Creation</li>
              <li>Custom Software Development</li>
              <li>Web Development Services</li>
              <li>API Integration</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6">
              Get In Touch
            </h2>
            <p>
              Have a project in mind? Want to learn more about our services? 
              Feel free to reach out to us at{' '}
              <a 
                href={`mailto:${settings.contactEmail}`}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {settings.contactEmail}
              </a>
            </p>

            <div className="mt-12 p-6 border border-blue-500/20 rounded-lg bg-blue-500/5">
              <p className="text-center italic">
                &quot;Building tomorrow&apos;s solutions with today&apos;s automation technology.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
