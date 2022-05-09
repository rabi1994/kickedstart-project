import React from 'react';
import Deafaultcard from './card';
import 'tachyons'
const Deafaultcards = ({elements,color, title,permession}) => {
    return(
        <div>
            <div className='tc'>
            <h1>{title}</h1>
            </div>
        
        <div className='parent'>
            {
            elements.map ((user,i) => {
                return (
                    <Deafaultcard
                    key={i}
                    id={elements[i]._id}
                    title={elements[i].title}
                    author={elements[i].author}
                    description={elements[i].description.substring(0,50)}
                    funded={elements[i].funded}
                    target={elements[i].target}
                    final_date={elements[i].final_date}
                    image={elements[i].images[0]}
                    color={color}
                    href='/${elements[i].id}'
                    /> 
                     );
                
            })
            }
        </div>
        </div>

    );
}


export default Deafaultcards