const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const summer = (totalLikes, blog) => {
    return totalLikes + blog.likes
  }
  return blogs.reduce(summer,0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((favourite, next) => next.likes > favourite.likes ? next: favourite ,blogs[0])
}

const mostBlogs = (blogs) => {
  let authors = {}
  blogs.forEach(blog => {
    if (blog.author in authors) {
      authors[blog.author] += 1      
    } else {
      authors[blog.author] = 1
    }
  })
  let authorsArray = Object.keys(authors).map(author => ({"author" : author, blogs: authors[author]}))
  return authorsArray.reduce((highest, next) => next.blogs > highest.blogs ? next: highest, authorsArray[0])
}

const mostLikes = (blogs) => {
  let authors = {}
  blogs.forEach(blog => {
    if (blog.author in authors) {
      authors[blog.author] += blog.likes      
    } else {
      authors[blog.author] = blog.likes
    }
  })
  let authorsArray = Object.keys(authors).map(author => ({"author" : author, likes: authors[author]}))
  return authorsArray.reduce((highest, next) => next.likes > highest.likes ? next: highest, authorsArray[0])
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
