import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LayoutDashboard } from 'lucide-react'

export function DashboardLink() {
  return (
    <Link href="/dashboard">
      <Button variant="outline" size="sm" className="gap-2">
        <LayoutDashboard className="h-4 w-4" />
        Admin Dashboard
      </Button>
    </Link>
  )
}
