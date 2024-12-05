'use client'

import {useEffect, useState} from 'react'
import PromptCard from '@components/PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map(post => (
                <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [isFetchingPosts, setIsFetchingPosts] = useState(false)
    const [posts, setPosts] = useState([])
    const handleSearchChange = (e) => {
        setSearchText(e.target.value.trim())
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsFetchingPosts(true)
                const response = await fetch('/api/prompt')
                const data = await response.json()
                setPosts(data)
            } catch (e) {
                console.log(e)
            } finally {
                setIsFetchingPosts(false)
            }
        }

        fetchPosts()
    }, []);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                    placeholder='Search for a tag or a username'
                />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={() => {}}
            />
        </section>
    )
}

export default Feed
