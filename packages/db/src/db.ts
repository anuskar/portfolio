import fs from 'node:fs/promises'
import path from 'node:path'

import * as schema from './schema'

const POSTS_FILE_PATH = path.join(process.cwd(), 'data', 'posts.json')

// Create posts JSON file if it doesn't exist
const ensurePostsFile = async () => {
    try {
        await fs.mkdir(path.dirname(POSTS_FILE_PATH), { recursive: true })
        try {
            await fs.access(POSTS_FILE_PATH)
        } catch {
            // File doesn't exist, create it with empty posts array
            await fs.writeFile(POSTS_FILE_PATH, JSON.stringify({ posts: [] }, null, 2))
        }
    } catch (error) {
        console.error('Error ensuring posts file exists:', error)
    }
}

// Initialize posts file
ensurePostsFile()

// Our simplified database interface
export const db = {
    // Query posts (returns all posts or filtered by condition)
    query: async (table: any, condition?: (post: any) => boolean) => {
        if (table !== schema.posts) {
            throw new Error('Only posts table is supported')
        }

        try {
            const data = JSON.parse(await fs.readFile(POSTS_FILE_PATH, 'utf8'))
            const posts = data.posts || []

            if (condition) {
                return posts.filter(condition)
            }

            return posts
        } catch (error) {
            console.error('Error querying posts:', error)
            return []
        }
    },

    // Insert a new post
    insert: async (table: any) => {
        if (table !== schema.posts) {
            throw new Error('Only posts table is supported')
        }

        return {
            values: async (post: any) => {
                try {
                    const data = JSON.parse(await fs.readFile(POSTS_FILE_PATH, 'utf8'))
                    const posts = data.posts || []

                    // Check if post with this slug already exists
                    const existingPostIndex = posts.findIndex((p: any) => p.slug === post.slug)

                    if (existingPostIndex !== -1) {
                        // Update existing post
                        posts[existingPostIndex] = {
                            ...posts[existingPostIndex],
                            ...post
                        }
                    } else {
                        // Add new post
                        posts.push({
                            createdAt: new Date().toISOString(),
                            ...post
                        })
                    }

                    await fs.writeFile(POSTS_FILE_PATH, JSON.stringify({ posts }, null, 2))
                } catch (error) {
                    console.error('Error inserting post:', error)
                }
            }
        }
    },

    // Update posts
    update: async (table: any) => {
        if (table !== schema.posts) {
            throw new Error('Only posts table is supported')
        }

        return {
            set: async (updates: any) => {
                return {
                    where: async (condition: any) => {
                        try {
                            const data = JSON.parse(await fs.readFile(POSTS_FILE_PATH, 'utf8'))
                            const posts = data.posts || []

                            let updatedPosts = posts

                            // Handle special case for slug equality condition
                            if (condition && typeof condition === 'object' && 'slug' in condition) {
                                updatedPosts = posts.map((post: any) => {
                                    if (post.slug === condition.slug) {
                                        return { ...post, ...updates }
                                    }
                                    return post
                                })
                            } else {
                                console.warn('Unsupported condition, no updates made')
                            }

                            await fs.writeFile(POSTS_FILE_PATH, JSON.stringify({ posts: updatedPosts }, null, 2))
                        } catch (error) {
                            console.error('Error updating posts:', error)
                        }
                    }
                }
            }
        }
    },

    // Delete posts
    delete: async (table: any) => {
        if (table !== schema.posts) {
            throw new Error('Only posts table is supported')
        }

        return {
            where: async (condition: any) => {
                try {
                    const data = JSON.parse(await fs.readFile(POSTS_FILE_PATH, 'utf8'))
                    const posts = data.posts || []

                    let updatedPosts = posts

                    // Handle special case for slug pattern matching
                    if (condition && typeof condition === 'function') {
                        updatedPosts = posts.filter((post: any) => !condition(post))
                    } else {
                        console.warn('Unsupported condition, no deletions made')
                    }

                    await fs.writeFile(POSTS_FILE_PATH, JSON.stringify({ posts: updatedPosts }, null, 2))
                } catch (error) {
                    console.error('Error deleting posts:', error)
                }
            }
        }
    }
}
