'use client'

import {usePathname, useRouter} from 'next/navigation'
import Image from 'next/image'
import {useState} from 'react'
import {useSession} from 'next-auth/react'

// Тут передаем обработчики событий внутрь компонента, а не реализуем их сразу в нем самом, так как мы можем отображать
// посты не только через этот компонент, могут быть и другие компоненты, которые отображают посты, поэтому логику CRUD
// операций вынесли на уровень выше.

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
    const router = useRouter()
    const pathname = usePathname()
    const {data: session} = useSession()
    const [copied, setCopied] = useState('')

    const handleCopy = () => {
        setCopied(post.prompt)
        navigator.clipboard.writeText(post.prompt)
        setTimeout(() => setCopied(''), 3000)
    }

    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                    <Image
                        src={post.creator.image}
                        alt='user_image'
                        width={40}
                        height={40}
                        className='rounded-full object-cover'
                    />

                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {post.creator.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {post.creator.email}
                        </p>
                    </div>
                </div>

                <div className='copy_btn' onClick={handleCopy}>
                    <Image
                        src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                        alt='copy icon'
                        width={12}
                        height={12}
                    />
                </div>
            </div>

            <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
            <p onClick={() => handleTagClick?.(post.tag)} className='font-inter text-sm blue_gradient cursor-pointer'>#{post.tag}</p>

            {session?.user.id === post.creator._id && pathname === '/profile' && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                    <p onClick={handleEdit} className='font-inter text-sm green_gradient cursor-pointer'>
                        Edit
                    </p>
                    <p onClick={handleDelete} className='font-inter text-sm green_gradient cursor-pointer'>
                        Delete
                    </p>
                </div>
            )}
        </div>
    )
}

export default PromptCard
