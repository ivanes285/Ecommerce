import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../Utils/ProductItem/ProductItem";

export default function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);


  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        //buscar el producto
        if (product._id === params.id) setDetailProduct(product);
      });
    }
   
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;
  return (
    <Fragment>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>{detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link to="/cart" className="cart" onClick={() => addCart(detailProduct)}>
            Buy Now
          </Link>
        </div>
      </div>

     
      <div>
        <h2>Related Products</h2>
        <div className="products">
          {products.map(product => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>


    </Fragment>
  );
}
