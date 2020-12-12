const Filter = (props) =>{
    return(
        <div>
             Filter shown with <input name={props.name} value={props.search} onChange={props.handleChange} required/>
      
        </div>
    )

}

export default Filter;