import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Section } from "../../../../components";
import { ImageAction } from "../../../../store";

export default function AdminDashboardImages() {
  
  const dispatch = useDispatch();
  const image = useSelector(s => s.image);
  const router = useRouter();

  useEffect(() => {
    dispatch(ImageAction.findAll());
  }, [dispatch]);
  
  return (
  <Section>

    <Grid
      width="100%"
      direction="column wrap"
      gap="1rem"
      align="center"
    >
      {image.list.map(item => {
        return (
        <Grid
          key={item.image_id}
          width="90%"
          border=".2rem solid black"
          direction="column wrap"
          borderRadius="5px"
          padding="1rem"
        >
          <Grid
            width="100%"
            justify="space-between"
            align="center"
          >
            <p>id: {item.image_id}</p>
            <button
              onClick={() => {
                router.push(`/admin/dashboard/images/${item.image_id}/edit`)
              }}
            >Edit</button>
          </Grid>

          <Grid
            gap="1rem"
          >

            <Image
              width="200px"
              height="200px"
              src={item.src}
              alt={item.alt}
            />

            <Grid
              direction="column wrap"
            >
              <p>name: {item.name}</p>
              <p>alt: {item.alt}</p>
              <p>title: {item.title}</p>
            </Grid>
          
          </Grid>

          <p>src: {item.src}</p>
        </Grid>
        )
      })}
    </Grid>

  </Section>
  )
}