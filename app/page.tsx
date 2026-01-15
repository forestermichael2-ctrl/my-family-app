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

        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left flex-1 justify-center w-full">
          <div>
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              Welcome Home! 👋
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Signed in as <span className="font-medium text-zinc-900 dark:text-zinc-50">{user.email}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Family Calendar</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Track birthdays, events, and special occasions
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-3">📸</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Photo Gallery</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Share and preserve family memories
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-3">🍳</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Recipe Book</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Keep family recipes in one place
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Family Chat</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Stay connected with announcements
              </p>
            </div>
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-6 mt-4 border border-zinc-200 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Coming Soon...</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              These features are ready to be built! Let me know which one you'd like to add first.
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
