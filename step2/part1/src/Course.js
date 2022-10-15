

const Course = ({ course }) =>
{
    const Header = ({ name }) => <h1>{name}</h1>
  
const Total = ({ parts }) => <p>Number of exercises { parts.reduce((s, p) => s + p.exercises, 0 )}</p>

const Part = ({ part }) => 
<p>
  {part.name} {part.exercises}
</p>

const Content = ({ parts }) => 
<>
  { parts.map((part)=> (<Part key={part.id} part={part} />))}
  
</>  
    return ( 
      <div>
        <Header name={ course.name} />
        <Content parts={ course.parts}/>
        <Total parts={ course.parts }/>
      </div>
      
    )
  }
  export default Course