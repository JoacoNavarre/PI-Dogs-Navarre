import React from "react";
import "./Pagination.css";

export default function Paginado({paginado, reduxDogs, dogsPerPage, nextPage, prevPage}){
    const pageNumber = [];

    for (let index = 1; index <= Math.ceil(reduxDogs/dogsPerPage); index++){
        pageNumber.push(index)
    };
    return(
        <nav className="pagination:container">
            <div class="pagination:number arrow" onClick = { () => prevPage() } >
                <span class="arrow:text">{"<"} Prev</span> 
            </div>
                {pageNumber?.map( (n) => {return <li key={n} className="pagination:number">
                    <a href="#" className="btnA" onClick={() => paginado(n)}>{n}</a>
                    </li>
                })}
            <div class="pagination:number arrow" onClick = { () => nextPage() } >
                <span class="arrow:text">Next {">"}</span> 
            </div>
        </nav>
    );
};