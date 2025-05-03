// Simple type definition for our posts schema
export type PostRecord = {
  slug: string;
  views: number;
  createdAt: string;
}

// This is a placeholder object that our db.ts will use to identify the posts "table"
export const posts = {
  tableName: 'posts'
}

// Helper function to match slug with a pattern (like postgres "like" operator)
export const like = (field: any, pattern: string) => {
  return (post: PostRecord) => {
    // Convert SQL LIKE pattern to regex
    const regexPattern = pattern
      .replace(/%/g, '.*')
      .replace(/_/g, '.')

    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(post.slug)
  }
}

// Helper function for equality comparison
export const eq = (field: any, value: any) => {
  return (post: PostRecord) => post.slug === value
}

