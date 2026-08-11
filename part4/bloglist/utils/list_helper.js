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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}
