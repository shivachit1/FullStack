const Persons = (props) =>{
    console.log(props.search)
    return(
        <div>
      {props.persons.map(person =>
          <Person search={props.search} key={person.name} person={person}/>
        )}
      </div>
    )

}


const Person = (props) =>{
    if(props.search!=="" && props.person.name.toLowerCase().indexOf(props.search.toLowerCase())===-1){
       return null
    }
    return(
    <p>{props.person.name}  {props.person.number}</p>
    )
}

export default Persons;