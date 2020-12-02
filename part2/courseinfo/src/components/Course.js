
const Course = (props)=>{
    return(
        <div>
            <Header course={props.course}/>
            <Content course={props.course}/>
            <Total course={props.course}/>
        </div>
    )
}
const Header = (props)=>{
    return (
        <div>
          <h3>{props.course.name}</h3>
        </div>
    )
  }
  
  const Content = ({course})=>{
    return (
        <div>
            {course.parts.map(part => 
                <Part part ={part} key={part.id}/>
            )}
        </div>
    )
  }
  
  
  const Total = ({course})=>{
    const initialValue = 0;
    const reducer = (accumulator, part) => {
        return accumulator + part.exercises;
      };
    const total = course.parts.reduce(reducer,initialValue);
    return (
        <div> 
          <h4>Total of {total} excersies.</h4>
        </div>
    )
  }
  
  const Part = (props)=>{
    return (
      <div>
         <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }

  export default Course;