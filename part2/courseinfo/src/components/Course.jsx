const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>  
  )
} 

const Header = (props) => <h2>{props.course}</h2>

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

export default Course
