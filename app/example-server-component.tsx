import { createClient } from '@/lib/supabase/server'

export default async function ExampleServerComponent() {
  const supabase = await createClient()

  // Example: Fetch data from a table
  // const { data, error } = await supabase.from('your_table').select('*')

  // Example: Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      <h2>Server Component Example</h2>
      <p>User: {user ? user.email : 'Not logged in'}</p>
    </div>
  )
}
