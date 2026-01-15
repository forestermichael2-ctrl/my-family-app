'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ExampleClientComponent() {
  const [data, setData] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      // Example: Fetch data from a table
      // const { data, error } = await supabase.from('your_table').select('*')

      // Example: Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser()
      setData(user)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h2>Client Component Example</h2>
      <p>User: {data ? data.email : 'Not logged in'}</p>
    </div>
  )
}
