import { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./productDetails.css";

import SlideProducts from "../../components/slideProducts/SlideProducts";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import ProductDetailsLoading from "./productDetailsLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import PageTransition from "../../components/PageTransition";
import useFetch from "../../hooks/useFetch";
import { getProductById, getProductsByCategory } from "../../api/api";

function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    loading,
    error,
  } = useFetch(() => getProductById(id), [id]);

  const { data: relatedData, loading: loadingRelatedProducts } = useFetch(
    () => getProductsByCategory(product?.category),
    [product?.category],
    !product?.category,
  );

  useEffect(() => {
    document.title = product ? `${product.title} | Cosmatics` : "Loading... | Cosmatics";
  }, [product]);

  if (loading) {
    return (
      <PageTransition key={id}>
        <ProductDetailsLoading />
      </PageTransition>
    );
  }

  if (error || !product) {
    return (
      <PageTransition key={id}>
        <p className="not-found-message">This product could not be found</p>
      </PageTransition>
    );
  }

  return (
    <PageTransition key={id}>
      <div>
        <div className="item_details">
          <div className="container">
            <ProductImages product={product} />

            <ProductInfo product={product} />
          </div>
        </div>

        {loadingRelatedProducts ? (
          <SlideProductLoading />
        ) : (
          <SlideProducts
            key={product.category}
            data={relatedData?.products || []}
            title={product.category.replace("-", " ")}
          />
        )}
      </div>
    </PageTransition>
  );
}

export default ProductDetails;
