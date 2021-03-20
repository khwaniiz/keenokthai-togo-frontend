import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import Hero from '../../components/Hero'
import { Typography} from '@material-ui/core';

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setLoading(true)
        getCategory(slug)
            .then((res) => {
                //console.log(JSON.stringify(res.data, null, 4))
                setCategory(res.data.category)
                setProducts(res.data.products)
                setLoading(false)
            })
    }, [slug])

    return (
      <>
        <Hero title={'Products'}/>
      <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <Typography variant='h6' className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </Typography>
          ) : (
            <Typography variant='h6' className="text-center p-3 mt-5 mb-5 jumbotron">
              {products.length} Products in "{category.name}" category
            </Typography>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
    </>
    )

}

export default CategoryHome;