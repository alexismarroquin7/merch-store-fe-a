import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Section } from "../../../../../../components";
import { InventoryAction, ProductAction } from "../../../../../../store/actions";
import Image from "next/image";

const initialView = ''

export default function AdminInventoryImages () {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector(s => {
    return {
      inventoryItem: s.inventory.item,
      product_images: s.product.product_images
    };
  });

  const [view, setView] = useState(initialView);

  useEffect(() => {
    if(!router.query.inventory_id || !router.query.product_id || !router.query.tab) return;
    dispatch(InventoryAction.findByInventoryId(router.query.inventory_id));
    dispatch(ProductAction.findImagesByProductId(router.query.product_id));
    setView(router.query.tab);
  }, [dispatch, router.query.inventory_id, router.query.product_id, router.query.tab]); // eslint-disable-line
  
  useEffect(() => {
    if(!router.query.inventory_id || !router.query.product_id || !view) return;
    router.push(`/admin/dashboard/inventory/${router.query.inventory_id}/images?product_id=${router.query.product_id}&tab=${view}`);
  }, [view, router.query.inventory_id, router.query.product_id]);

  const handleChange = e => {
    const { name } = e.target;
    setView(name)
  }

  const handleDeleteInventoryImage = inventory_image_id => {
    dispatch(InventoryAction.deleteInventoryImageByInventoryImageId(inventory_image_id))
  }

  const handleCreateInventoryImage = ({ inventory_id, image_id }) => {
    dispatch(InventoryAction.createInventoryImage({ inventory_id, image_id }));
  }
  
  return (
  <Section
    gap="1rem"
  >

    <Grid
      gap="1rem"
    >

      <Grid
        align="center"
      >
        <input
          type="checkbox"
          name="remove"
          checked={router.query.tab === 'remove'}
          onChange={handleChange}
        />
        <p>Remove</p>
      </Grid>

      <Grid
        align="center"
      >
        <input
          type="checkbox"
          name="add"
          checked={router.query.tab === 'add'}
          onChange={handleChange}
        />
        <p>Add</p>
      </Grid>
    
    </Grid>
    
    {view === 'remove' && (
      <Grid
        width="100%"
        direction="column wrap"
        gap="1rem"
      >
        {state.inventoryItem.inventory_id && state.inventoryItem.inventory_images
        .map(inv_img => {
          return (
          <Grid
            width="100%"
            key={inv_img.inventory_image_id}
            border="1px solid black"
            direction="column wrap"
            gap="1rem"
            padding="1rem"
          >
            <Grid
              width="100%"
              justify="space-between"
            >
              <p>ID: {inv_img.image.image_id}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteInventoryImage(inv_img.inventory_image_id)
                }}
              >x</button>
            </Grid>
            
            <Grid
              direction="column wrap"
            >
              
              <Image
                width="150px"
                height="150px"
                src={inv_img.image.src}
                alt={inv_img.image.alt}
              />
              
              <p>name: {inv_img.image.name}</p>
              <p>alt: {inv_img.image.alt}</p>
              <p>title: {inv_img.image.title}</p> 
              <p>src: {inv_img.image.src}</p>
            </Grid>
          
          </Grid>
          )
        })}
      </Grid>
    )}
    
    {view === 'add' && (
      <Grid
        width="100%"
        direction="column wrap"
        gap="1rem"
      >
        {state.product_images
        .filter(p_img => {
          const addedImages = new Set(state.inventoryItem.inventory_images.map(inv_img => inv_img.image.image_id));

          if(!addedImages.has(p_img.image.image_id)){
            return true;
          } else {
            return false;
          }

        })
        .map(p_img => {
          return (
            <Grid
            width="100%"
            key={p_img.product_image_id}
            border="1px solid black"
            direction="column wrap"
            gap="1rem"
            padding="1rem"
          >
            <Grid
              width="100%"
              justify="space-between"
            >
              <p>ID: {p_img.image.image_id}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateInventoryImage({
                    inventory_id: state.inventoryItem.inventory_id,
                    image_id: p_img.image.image_id
                  })
                }}
              >+</button>
            </Grid>
            
            <Grid
              direction="column wrap"
            >
              
              <Image
                width="150px"
                height="150px"
                src={p_img.image.src}
                alt={p_img.image.alt}
              />
              
              <p>name: {p_img.image.name}</p>
              <p>alt: {p_img.image.alt}</p>
              <p>title: {p_img.image.title}</p> 
              <p>src: {p_img.image.src}</p>
            </Grid>
          
          </Grid>
          )
        })}
      </Grid>
    )}
    
    <Grid
      width="100%"
      justify="center"
    >

      <button
        onClick={() => {
          router.push('/admin/dashboard/inventory')
        }}
      >Back</button>
    </Grid>
  </Section>
  )
}