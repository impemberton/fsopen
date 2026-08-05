const Title = (props) => <h1>{props.text}</h1>
const Header = (props) => <h2>{props.course}</h2>

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>  
  )
} 

const Content = ({parts}) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)
  return (
  <div>
    {parts.map((part) => <Part key={part.id} part={part} />)}
    <b>total of {total} exercises</b>
  </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Title text={"Web development curriculum"} />
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App
