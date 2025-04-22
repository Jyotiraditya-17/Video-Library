import axios from "axios";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { CategoryContract } from "../contracts/category-contract";

export function SearchResult() {

    const [videos , setVideos] = useState<CategoryContract[]>();

    let [params] = useSearchParams();

    useEffect( () => {
        axios.get(`http://127.0.0.1:5050/categories/${params.get('query')}`)
        .then( res => {
            setVideos(res.data);
        })
    })

    return(
        <div>
            <div>
                {
                    videos?.map(v => 
                        <div key={v.category_id}>
                            <h2>{v.category_name}</h2>
                        </div>
                    )
                }
            </div>
        </div>
    )
}