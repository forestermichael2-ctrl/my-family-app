import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Family App
          </h1>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left flex-1 justify-center">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Welcome, {user.email}!
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            You're logged in to the family app. This is where your family content will go.
          </p>
          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-6 mt-4">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Ready to build features?</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Add family calendar, photo sharing, recipes, or whatever your family needs!
            </p>
          </div>
        </div>

        <div className="text-sm text-zinc-500 dark:text-zinc-500">
          Protected by authentication
        </div>
      </main>
    </div>
  )
}
