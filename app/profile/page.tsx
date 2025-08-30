// app/profile/page.tsx
import { mockPatient } from '@/data/mockData';
import { PageTitle } from '@/components/ui/PageTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  return (
    <main>
      <PageTitle>My Profile</PageTitle>
      <Card>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-secondary">First Name</label>
              <input type="text" id="firstName" defaultValue={mockPatient.first_name} className="mt-1 block w-full px-3 py-2 bg-background border border-secondary/20 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-secondary">Last Name</label>
              <input type="text" id="lastName" defaultValue={mockPatient.last_name} className="mt-1 block w-full px-3 py-2 bg-background border border-secondary/20 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-primary focus:border-primary" />
            </div>
          </div>
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium text-secondary">Date of Birth</label>
            <input type="date" id="birthDate" defaultValue={mockPatient.birth_date.split('T')[0]} className="mt-1 block w-full px-3 py-2 bg-background border border-secondary/20 rounded-md shadow-sm text-foreground focus:outline-none focus:ring-primary focus:border-primary" />
          </div>
          <div className="text-right">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Card>
    </main>
  );
}