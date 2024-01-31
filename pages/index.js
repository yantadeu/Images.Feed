//pages/index.js
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Container,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {getImages, likeImage} from "../lib/api";
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";

export default function Home({ data }) {
  const [images, setImages] = useState(data);
  const doLike = async (imageId, liked) => {
    try {
      await likeImage(imageId, liked);
      updateCount(imageId, liked);
    } catch (error) {
      console.error("Erro ao curtir a imagem:", error);
    }
  };

  const updateCount = (imageId, liked) => {
    const updatedImages = images.map(img => {
      if (img.id === imageId) {
        return {
          ...img,
          likes: liked ? img.likes + 1 : img.likes > 0 ? img.likes - 1 : 0
        };
      }
      return img;
    });

    setImages(updatedImages);
  };

  return (
    <div>
      <Head>
        <title>Upik Image</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box overflow="hidden" minH="100vh">
        <Container>
          <Text
            fontWeight="semibold"
            mb="1rem"
            textAlign="center"
            textDecoration="underline"
            fontSize={["4xl", "4xl", "5xl", "5xl"]}
          >
            Upik Images
          </Text>
        </Container>
        <Wrap px="3rem" spacing={4} justify="center">
          {images.map((img) => (
            <Box
              key={img.id}
              boxShadow="base"
              rounded="5px"
              overflow="hidden"
              bg="white"
              lineHeight="0"
              _hover={{ boxShadow: "dark-lg" }}
            >
              <Image
                  src={`data:${img.contentType};base64,${img.content}`}
                  height={600}
                  width={400}
                  alt={img.title}
              />

              <Box display="flex" margin={3} position="relative">
                <Box margin={3}>
                  <FaThumbsUp onClick={() => doLike(img.id, true)} />
                </Box>
                <Box margin={3}>
                  <FaThumbsDown onClick={() => doLike(img.id, false)} />
                </Box>
                <Box margin={5} position="absolute" right="0" width="110px">
                  <strong>{img.likes}</strong>
                </Box>
              </Box>

            </Box>
          ))}
        </Wrap>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getImages();
  return {
    props: {
      data,
    },
  };
}
