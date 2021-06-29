import React from "react";

const Form = ({ search, updateSearch, getSearch }) => {   
    return(
        <form className="form" onSubmit={getSearch}>
            <input className="input_text" type="text" value={search}
          onChange={updateSearch} placeholder="введите город..."/>
            <button type="submit" className="submit">OK</button>
        </form>
        

    )
}

export default Form;