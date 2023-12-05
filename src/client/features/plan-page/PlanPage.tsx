'use client';
import { getPlan } from '@client/utils/firestore';
import { Grid, GridCol, Stack, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import BookCard from '../content-page/components/cards/BookCard';
import CourseCard from '../content-page/components/cards/CourseCard';
import MovieCard from '../content-page/components/cards/MovieCard';
import PodcastCard from '../content-page/components/cards/PodcastCard';
import YoutubeCard from '../content-page/components/cards/YoutubeCard';

export default function PlanPage({ id }) {
  const [planData, setPlanData] = useState({});

  useEffect(() => {
    getPlan(id).then((data) => {
      setPlanData(data);
    });
  }, []);
  return (
    <Stack align="center" pl={'40px'} pr={'40px'} h={'100vh'} gap={'0'}>
      <Navbar />
      <Title>{`${planData.subject} Learning Plan`}</Title>
      <Grid
        style={{ overflowY: 'scroll' }}
        w={'100%'}
        justify="flex-start"
        mt="20px"
      >
        {planData?.courses?.map((course) => (
          <GridCol
            h={530}
            key={`${course.id}_gridcol`}
            span={{ base: 12, md: 4, lg: 2 }}
          >
            <CourseCard
              showType
              key={course.id}
              course={course}
              disableAddRemove
            />
          </GridCol>
        ))}
        {planData?.books?.map((book) => (
          <GridCol
            h={530}
            key={`${book.ISBN_13}_gridcol`}
            span={{ base: 12, md: 4, lg: 2 }}
          >
            <BookCard
              showType
              disableAddRemove
              book={book}
              key={book.ISBN_13}
            />
          </GridCol>
        ))}
        {planData?.podcasts?.map((podcast) => (
          <GridCol
            h={530}
            key={`${podcast.id}_gridcol`}
            span={{ base: 12, md: 4, lg: 2 }}
          >
            <PodcastCard
              showType
              podcast={podcast}
              key={podcast.id}
              disableAddRemove
            />
          </GridCol>
        ))}
        {planData?.movies?.map((movie) => (
          <GridCol
            h={530}
            key={`${movie.imdbID}_gridcol`}
            span={{ base: 12, md: 4, lg: 2 }}
          >
            <MovieCard
              showType
              disableAddRemove
              movie={movie}
              key={movie.imdbID}
            />
          </GridCol>
        ))}
        {planData?.youtube?.map((video) => (
          <GridCol
            h={530}
            key={`${video.title}_gridcol`}
            span={{ base: 12, md: 4, lg: 2 }}
          >
            <YoutubeCard
              showType
              disableAddRemove
              video={video}
              key={video.title}
            />
          </GridCol>
        ))}
      </Grid>
    </Stack>
  );
}
