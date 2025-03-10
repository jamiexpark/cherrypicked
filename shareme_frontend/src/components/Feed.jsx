import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { feedQuery, searchQuery } from '../utils/data';
import { client } from '../client';
import { MasonryLayout } from './MasonryLayout'; // Import without 'default'
import Pin from './Pin';
import Spinner from './Spinner';


// Rest of the code remains the same


const Feed = () => {
    const { categoryId } = useParams();
    const[pins, setPins] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true); 
        if(categoryId){
            const query = searchQuery(categoryId); 

            client.fetch(query)
            .then((data) => {
                setPins(data); 
                setLoading(false);
            })
        }else{
            client.fetch(feedQuery)
            .then((data) => {
                setPins(data); 
                setLoading(false);
            })
        }
      
    }, [categoryId])
    
    if(loading) return <Spinner message= "Adding more inspo for you." /> 

    if(!pins?.length) return <h2>No picks available</h2>
 

  return (
    <div>
        {pins && <MasonryLayout pins={pins}/>}

    </div>
  )
}

export default Feed