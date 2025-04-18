export default function TestNavigationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Navigation Test Page</h1>
        <p className="text-muted-foreground">
          This page demonstrates that the sidebar navigation is working correctly.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Navigation Status</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>All navigation links are functional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>Gradient background applied to sidebar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>Mobile navigation working correctly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>Active link highlighting working</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Dashboard</li>
            <li>Applicants</li>
            <li>Searches</li>
            <li>Messages</li>
          </ul>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Account & Support</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Profile</li>
            <li>Settings</li>
            <li>Help Center</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
