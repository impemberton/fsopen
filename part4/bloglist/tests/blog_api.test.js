const assert = require('node:assert')
const { test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of initial blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog posts contain id property', async () => {
  const response = await api.get('/api/blogs')
  
  assert("id" in response.body[0])
})

test('posting successfully creates a new blog', async () => {
  const newBlog = {
    title: "Gobbledygook",
    author: "Chimmeny Bingus",
    url: "https://Chimmenybingus.com/",
    likes: 6,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await api.get('/api/blogs')
  console.log(updatedBlogs.body)
  
  assert.strictEqual(updatedBlogs.body.length, helper.initialBlogs.length + 1)
  assert.strictEqual(updatedBlogs.body.at(-1).title, newBlog.title)
  assert.strictEqual(updatedBlogs.body.at(-1).author, newBlog.author)
  assert.strictEqual(updatedBlogs.body.at(-1).url, newBlog.url)
  assert.strictEqual(updatedBlogs.body.at(-1).likes, newBlog.likes)
})

test('blogs posted without the likes property default to 0 likes', async () => {
  const newBlog = {
    title: "Gobblednygook",
    author: "Chimmeny Bingus",
    url: "https://Chimmenybingus.com/",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await api.get('/api/blogs')
  
  assert.strictEqual(updatedBlogs.body.at(-1).likes, 0)
})

test('blogs without title receive a 400 status code', async () => {
  const newBlog = {
    author: "Chimmeny Bingus",
    url: "https://Chimmenybingus.com/",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blogs without url receive a 400 status code', async () => {
  const newBlog = {
    title: "Gobbledygook",
    author: "Chimmeny Bingus",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blogs can be deleted by id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAfter = await helper.blogsInDb()
  const ids = blogsAfter.map(blog => blog.id)
  
  assert(!ids.includes(blogToDelete.id))
  assert.strictEqual(blogsAfter.length, helper.initialBlogs.length - 1)
})

describe('blogs can be updated id', () => {
  test.only('title can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    const updates = {
      title: "New Title",
    }
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updates)
      .expect(200)
    
    assert.strictEqual(updatedBlog.body.title, updates.title)
  })
  test.only('author can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    const updates = {
      author: "New Author",
    }
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updates)
      .expect(200)
    
    assert.strictEqual(updatedBlog.body.author, updates.author)
  })
  test.only('url can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    const updates = {
      url: "https://NewRL.com/",
    }
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updates)
      .expect(200)
    
    assert.strictEqual(updatedBlog.body.url, updates.url)
  })
  test.only('likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    const updates = {
      likes: 45,
    }
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updates)
      .expect(200)
    
    assert.strictEqual(updatedBlog.body.likes, updates.likes)
  })
  test.only('all properties can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    
    const updates = {
      title: "New Title",
      author: "New Author",
      url: "https://NewRL.com/",
      likes: 45,
    }
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updates)
      .expect(200)
    
    assert.strictEqual(updatedBlog.body.title, updates.title)
    assert.strictEqual(updatedBlog.body.author, updates.author)
    assert.strictEqual(updatedBlog.body.url, updates.url)
    assert.strictEqual(updatedBlog.body.likes, updates.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})
