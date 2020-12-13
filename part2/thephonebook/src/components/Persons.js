const Persons = (props) =>{
    console.log(props.search)
    return(
        <div>
      {props.persons.map(person =>
          <Person search={props.search} key={person.name} person={person} deletePerson={()=>props.deletePerson(person)}/>
        )}
      </div>
    )

}


const Person = (props) =>{
    if(props.search!=="" && props.person.name.toLowerCase().indexOf(props.search.toLowerCase())===-1){
       return null
    }
    return(
    <p>{props.person.name}  {props.person.number} <button onClick={props.deletePerson}>delete</button></p>
    )
}

export default Persons;