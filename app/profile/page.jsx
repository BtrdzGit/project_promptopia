'use client'

import Profile from '@components/Profile'
import {useSession} from 'next-auth/react'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

const ProfilePage = () => {
    const {data: session} = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/users/${session?.user.id}/posts`)
                const data = await response.json()
                setPosts(data)
            } catch (e) {
                console.log(e)
            }
        }

        if (session?.user.id) fetchPosts()

    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this post?')
        if (hasConfirmed) {
            try {
                const response = await fetch(`/api/prompt/${post._id}`, {method: 'DELETE'})
                console.log(response)
                if (response.ok) {
                    const filteredPosts = posts.filter(p => p._id !== post._id)
                    setPosts(filteredPosts)
                }

            } catch (e) {
                console.log(e)
            }
        }

    }

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default ProfilePage
