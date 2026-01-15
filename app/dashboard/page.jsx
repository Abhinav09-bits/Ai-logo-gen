"use client"
import React, { useContext } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

function Dashboard() {
  const { userDetail } = useContext(UserDetailContext)
  const { user } = useUser()

  return (
    <div className="mt-28 p-10 border rounded-xl max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="p-8 border rounded-lg flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-6 text-center">User Info</h2>
          <div className="space-y-4">
            <p className="text-center"><strong>Name:</strong> {user?.fullName}</p>
            <p className="text-center"><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
            <p className="text-center"><strong>Total Left Credits:</strong> {userDetail?.credits || 0}</p>
          </div>
        </div>
        <div className="p-8 border rounded-lg flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-6 text-center">Actions</h2>
          <div className="space-y-4 flex flex-col items-center">
            <Button onClick={() => window.location.href = '/create'} className="w-full max-w-xs">
              Create New Logo
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'} className="w-full max-w-xs">
              Go to Home
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recent Logos</h2>
        <p className="text-gray-500">No logos generated yet. Create your first logo!</p>
        {/* TODO: Display user's generated logos */}
      </div>
    </div>
  )
}

export default Dashboard