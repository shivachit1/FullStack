const PersonForm = (props) =>{
    return(
        <div>
        <form onSubmit={props.addPerson}>
        
        <div>
          name: <input name='name' value={props.newName} onChange={props.handleChange}  required="Name Missing"/>
        </div>
        <div>
          number: <input type="number" name='number' value={props.newNumber} onChange={props.handleChange} required="number Missing"/>
        </div>
       
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
        </div>
    )

}

export default PersonForm;