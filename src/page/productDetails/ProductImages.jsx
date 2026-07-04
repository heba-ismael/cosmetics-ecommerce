import { useEffect, useState } from "react";

function ProductImages({ product }) {
  const [activeImage, setActiveImage] = useState(product.images[0]);

  // When the user opens a different product, reset to its first image
  useEffect(() => {
    setActiveImage(product.images[0]);
  }, [product]);

  return (
    <div className="img_item">
      <div className="big_img">
        <img src={activeImage} alt={product.title} />
      </div>
      <div className="sm_img">
        {product.images.map((img, index) => (
          <div className="img_div_sm" key={index}>
            <img
              src={img}
              alt={`${product.title} - photo ${index + 1}`}
              loading="lazy"
              onClick={() => setActiveImage(img)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
