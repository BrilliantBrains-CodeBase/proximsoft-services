import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Post {
  slug: string
  title: string
  image: string
  date: string
  category: string
}

interface Props {
  posts: Post[]
}

export default function BlogSidebar({ posts }: Props) {
  const [searchValue, setSearchValue] = useState('')

  const recentPosts = posts.slice(0, 5)
  const categories = Array.from(new Set(posts.map((p) => p.category)))

  return (
    <aside className="blog-sidebar">
      {/* Search */}
      <div className="sidebar-grid mb-50">
        <form
          className="sidebar-search-bar"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search blog posts"
          />
          <button type="submit" aria-label="Submit search">
            <SearchIcon />
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="sidebar-grid mb-50">
        <div className="sidebar-title">
          <h3>Recent Post</h3>
        </div>
        {recentPosts.map((post) => (
          <div key={post.slug} className="single-post">
            <div className="post-image">
              <Link to={`/blog/${post.slug}`}>
                <img src={post.image} alt={post.title} loading="lazy" />
              </Link>
            </div>
            <div className="post-desc">
              <h5>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h5>
              <ul>
                <li>
                  <CalendarIcon /> {post.date}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="sidebar-grid">
        <div className="sidebar-title">
          <h3>Categories</h3>
        </div>
        <ul className="sidebar-categories-list">
          {categories.map((cat) => (
            <li key={cat}>
              <Link to="/blog">{cat}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
