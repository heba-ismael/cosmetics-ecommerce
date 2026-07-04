import { useEffect, useState } from "react";

function ProductImages({ product }) {
  // dummyjson كتير بيرجع نفس الصورة مكررة أكتر من مرة في نفس المنتج
  const uniqueImages = [...new Set(product.images)];

  const [activeImage, setActiveImage] = useState(uniqueImages[0]);

  // When the user opens a different product, reset to its first image
  useEffect(() => {
    setActiveImage(uniqueImages[0]);
  }, [product]);

  return (
    <div className="img_item">
      <div className="big_img">
        <img src={activeImage} alt={product.title} />
      </div>
      <div className="sm_img">
        {uniqueImages.map((img, index) => (
          <div
            className={`img_div_sm ${img === activeImage ? "active" : ""}`}
            key={index}
          >
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
