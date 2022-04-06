import { Grid, Border } from "../../../components";
import Image from "next/image";
import { useRouter } from "next/router";

export const AdminProductItem = ({product}) => {
  const router = useRouter();

  return (
  <Grid
    width="90%"
    direction="column wrap"
    border=".2rem solid black"
    borderRadius="5px"
    padding="1rem"
  >
    <p>ID: {product.product_id}</p>
    
    <Border
      padding=".1rem"
    />

    <Grid
      width="100%"
      onClick={() => {
        router.push(`/admin/dashboard/products/${product.product_id}/edit/name`)
      }}
      >
      <Grid
        width="100%"
        justify="space-between"
      >
        <p>Name:</p>
        <p>{'>'}</p>
      </Grid>
      
      <h3>{product.name}</h3>
    </Grid>

    <Border
      padding=".1rem"
    />

    <Grid
      width="100%"
      direction="column wrap"
      onClick={() => {
        router.push(`/admin/dashboard/products/${product.product_id}/edit/groupings`)
      }}
    >

      <Grid
        width="100%"
        justify="space-between"
      >
        <p>Groupings:</p>
        <p>{'>'}</p>
      </Grid>

      <p>Gender: {product.gender.name}</p>
      
      <p>Category: {product.category.name}</p>

      <p>Sub-category: {product.sub_category.name}</p>
      
    </Grid>
  
    <Border
      padding=".1rem"
    />

    <Grid
      width="100%"
      direction="column wrap"
      align="center"
      gap="1rem"
      onClick={() => {
        router.push(`/admin/dashboard/products/${product.product_id}/edit/price`)
      }}
    >
      <Grid
        width="100%"
        justify="space-between"
      >
        <p>Price:</p>
        <p>{'>'}</p>
      </Grid>
      
      
      <Grid
        width="100%"
        direction="column wrap"
      >
        <p>Valued at: ${product.valued_at}</p>     
        <p>Current price: ${product.current_price}</p>
      </Grid>
    
    </Grid>

    <Grid
      width="100%"
      align="center"
      gap="1rem"
    >
      <Border
        padding=".1rem"
      />

      <Grid
        width="100%"
        justify="space-between"
        gap="1rem"
        onClick={() => {
          router.push(`/admin/dashboard/products/${product.product_id}/images/edit`);
        }}
      >
        <Grid  
          gap="1rem"
        >
          <p>Images:</p>
          <p>{product.product_images.length}</p>    
        </Grid>
        
        <Grid>
          <p>{'>'}</p>
        </Grid>
      
      </Grid>
      
      <Grid
        justify="space-between"
        gap="1rem"
      >
        {product.product_images.map(product_image => {
          return (
          <Grid
            key={product_image.product_image_id}
            border="1px solid black"
          >
            <Image
              width="100px"
              height="100px"
              src={product_image.image.src}
              alt={product_image.image.alt}
            />
          </Grid>
          )
        })}
      </Grid>
      
      <Border
        padding=".1rem"
      />
      
    </Grid>
    
    {/* COLORS SECTION */}
    <Grid
      width="100%"
      align="center"
    >

      <Grid
        width="100%"
        justify="space-between"
      >
        <p>Colors:</p>
        <p>{'>'}</p>
      </Grid>

      <Grid
        gap="1rem"
      >
        {product.product_colors.map(product_color => {
          return (
          <Grid
            key={product_color.product_color_id}
          >
            <p
              style={{
                border: '1px solid black',
                padding: ".5rem",
                borderRadius: "5px"
              }}  
            >{product_color.color.name}</p>
          </Grid>
          )
        })}
      </Grid>


    </Grid>

  </Grid>
  )
}