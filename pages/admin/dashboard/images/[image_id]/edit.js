import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Section, Form } from "../../../../../components";
import { ImageAction } from "../../../../../store";

const initialValues = {
  name: '',
  title: '',
  alt: '',
  src: ''
}

export default function AdminEditImage() {
  const [values, setValues] = useState(initialValues);

  const dispatch = useDispatch();
  const router = useRouter();
  const image = useSelector(s => s.image);

  useEffect(() => {
    if(!router.query.image_id) return;
    dispatch(ImageAction.findByImageId(router.query.image_id));
    setValues(s => {
      return {
        ...s,
        name: image.item.name,
        title: image.item.title,
        alt: image.item.alt,
        src: image.item.src
      }
    })
  }, [dispatch, router.query.image_id]);

  const handleChange = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ImageAction.updateByImageId(router.query.image_id, values));
  }
  
  return (
  <Section>
    <Form
      onSubmit={handleSubmit}
      width="50%"
      gap="2rem"
    >
      
      <Grid
        width="100%"
        justify="space-between"
        gap=".5rem"
      >
        <label>name:</label>
        <input
          style={{
            width: "100%",
            padding: ".5rem"
          }} 
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </Grid>

      <Grid
        width="100%"
        justify="space-between"
        gap=".5rem"
      >
        <label>alt:</label>
        <input
          style={{
            width: "100%",
            padding: ".5rem"
          }} 
          type="text"
          name="alt"
          value={values.alt}
          onChange={handleChange}
        />
      </Grid>

      <Grid
        width="100%"
        justify="space-between"
        gap=".5rem"
      >
        <label>title:</label>
        <input
          style={{
            width: "100%",
            padding: ".5rem"
          }} 
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
      </Grid>

      <Grid
        width="100%"
        justify="space-between"
        gap=".5rem"
      >
        <label>src:</label>
        <input
          style={{
            width: "100%",
            padding: ".5rem"
          }} 
          type="text"
          name="src"
          value={values.src}
          onChange={handleChange}
        />
      </Grid>

      
      
      <Grid
        width="100%"
        justify="space-between"
      >
        <p>Preview:</p>
        {values.src.length > 0 && (
          <Image
            width="200px"
            height="200px"
            src={values.src}
            alt={values.alt}
          />
        )}
      </Grid>

      <Grid
        width="100%"
        justify="center"
        gap="1rem"
      >
        <button
          onClick={() => {
            router.push('/admin/dashboard/images');
          }}
        >Back</button>
        <button type="submit">Submit</button>
      </Grid>
      
      <Grid
        width="100%"
        justify="center"
      >
        {image.status.error.message && <p style={{color: "red"}}>{image.status.error.message}</p>}
      </Grid>

    </Form>
  </Section>
  )
}