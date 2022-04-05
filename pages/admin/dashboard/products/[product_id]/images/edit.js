import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Section } from "../../../../../../components";
import Image from "next/image";
import { ProductAction } from "../../../../../../store/actions";


export default function EditProductImages () {
  const product = useSelector(s => s.product);
  const [productImages, setProductImages] = useState([]);
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(!router.query.product_id) return;
    const [ productItem ] = product.list.filter(p => p.product_id === Number(router.query.product_id));
    
    setProductImages(pi => {
      return [
        ...pi,
        ...productItem.product_images
      ]
    });

  }, [router.query.product_id])

  return (
  <Section>

    <Grid
      direction="column wrap"
    >
      {productImages.length > 0 && (
        productImages.map(productImage => {
          return (
          <Grid
            key={productImage.product_image_id}
            width="100%"
            direction="column wrap"
            border="1px solid black"
            padding="1rem"
          >
            <Grid
              gap="1rem"
            
            >
              <Grid>
                <Image 
                  width="200px"
                  height="200px"
                  src={productImage.image.src}
                  alt={productImage.image.alt}
                />
              </Grid>
              
              <Grid
                direction="column wrap"
              >
                <p>id: {productImage.image.image_id}</p>
                <p>name: {productImage.image.name}</p>
                <p>title: {productImage.image.title}</p>
                <p>alt: {productImage.image.alt}</p>
              </Grid>
            </Grid>
            
            <p>src: {productImage.image.src}</p>

            <button
              onClick={() => {
                dispatch(ProductAction.deleteProductImageByProductImageId(productImage.product_image_id))
              }}
            >Remove</button>
          </Grid>

          )
        })
      )}
    </Grid>
  </Section>
  )
}