'use client';
import { getAllSourcesResults, getAllSourcesSubjects } from '@client/utils';
import {
  Avatar,
  BackgroundImage,
  Badge,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Loader,
  Modal,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { PodcastResponse } from '@server/podcasts/listen-notes/type';
import {
  IconArrowBarToRight,
  IconBook,
  IconCalendarDue,
  IconMinus,
  IconMoodSad,
  IconMovie,
  IconPlus,
  IconTag,
  IconThumbUp,
} from '@tabler/icons-react';
import { GoogleBookType } from '@type/books/google-books';
import { OmdbMovieType } from '@type/movies/omdb';
import { UdemyCourseType } from '@type/online-courses/udemy';
import { PodcastType } from '@type/podcasts/listen-notes';
import { YouTubeApiResponse, YouTubeVideo } from '@type/youtube';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';

export default function ContentPage({ subject }: { subject: string }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const [courses, setCourses] = useState<UdemyCourseType[]>([]);
  const [books, setBooks] = useState<GoogleBookType[]>([]);
  const [movies, setMovies] = useState<OmdbMovieType[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastResponse[]>([]);
  const [youTubeVideos, setYouTubeVideos] = useState<YouTubeVideo[]>([]);

  const contentTypes = ['courses', 'books', 'podcasts', 'movies', 'youtube'];

  const [plan, setPlan] = useState<{
    courses: UdemyCourseType[];
    books: GoogleBookType[];
    movies: OmdbMovieType[];
    podcasts: PodcastResponse[];
    youtube: YouTubeApiResponse[];
  }>({
    books: [],
    courses: [],
    podcasts: [],
    movies: [],
    youtube: [],
  });
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPlanEmpty, setIsPlanEmpty] = useState(true);
  const [filters, setFilters] = useState(contentTypes);

  useEffect(() => {
    if (
      plan.courses.length === 0 &&
      plan.books.length === 0 &&
      plan.movies.length === 0 &&
      plan.podcasts.length === 0 &&
      plan.youtube.length === 0
    ) {
      setIsPlanEmpty(true);
    } else {
      setIsPlanEmpty(false);
    }
  }, [plan]);

  const formatCourseDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  const isInPlan = (item, type) => {
    if (!contentTypes.includes(type)) {
      return false;
    } else {
      switch (type) {
        case 'courses':
          if (
            plan.courses.some(
              (planItem: UdemyCourseType) => planItem.id === item.id
            )
          ) {
            return true;
          } else {
            return false;
          }
        case 'books':
          if (
            plan.books.some(
              (planItem: GoogleBookType) => planItem.title === item.title
            )
          ) {
            return true;
          } else {
            return false;
          }
        case 'podcasts':
          if (
            plan.podcasts.some(
              (planItem: PodcastType) => planItem.id === item.id
            )
          ) {
            return true;
          } else {
            return false;
          }
        case 'movies':
          if (
            plan.movies.some(
              (planItem: OmdbMovieType) => planItem.imdbID === item.imdbID
            )
          ) {
            return true;
          } else {
            return false;
          }
        case 'youtube':
          if (
            plan.youtube.some(
              (planItem: YouTubeVideo) => planItem.title === item.title
            )
          ) {
            return true;
          } else {
            return false;
          }
        default:
          return false;
      }
    }
  };

  const CourseCard = ({ course }: { course: UdemyCourseType }) => {
    return (
      <Card
        style={{ maxWidth: '300px', minHeight: '500px' }}
        shadow="sm"
        padding="xl"
        withBorder
      >
        <Card.Section>
          <Image
            fit="contain"
            src={course.image}
            h={150}
            alt={course.title}
            fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
          />
        </Card.Section>

        <Stack justify="space-between" gap={'xs'} mt="md">
          <Text fw={500}>{course.title}</Text>
          <Group>
            <Badge
              style={{ maxWidth: '75%' }}
              color={theme.colors.purple[0]}
              variant="light"
            >
              By: {course.author.name}
            </Badge>
            <Avatar src={course.author.image_100x100} size="sm" />
          </Group>
          <Divider />
          <Group>
            <IconTag width={'20px'} />
            <Text c="dimmed" size="sm">
              Price: {course.price}
            </Text>
          </Group>
          <Group>
            <IconThumbUp width={'20px'} />
            <Text c="dimmed" size="sm" style={{ maxWidth: '80%' }}>
              Rating: {Math.round(course.avg_rating * 100) / 100} (
              {course.num_reviews} Reviews)
            </Text>
          </Group>
          <Group>
            <IconCalendarDue width={'20px'} />
            <Text c="dimmed" size="sm">
              Date: {formatCourseDate(course.created)}
            </Text>
          </Group>
          <Divider />
          <Group mt={'lg'} m={'auto'}>
            {!isInPlan(course, 'courses') ? (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconPlus size={14} />}
                radius="md"
                onClick={() =>
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    courses: [...prevPlan.courses, course],
                  }))
                }
              >
                Add
              </Button>
            ) : (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconMinus size={14} />}
                radius="md"
                onClick={() => {
                  const modifiedCourses = plan.courses.filter(
                    (planCourse) => planCourse.id != course.id
                  );
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    courses: modifiedCourses,
                  }));
                }}
              >
                Remove
              </Button>
            )}
            <Button
              color={theme.colors.purple[0]}
              variant="outline"
              size="compact-sm"
              radius="md"
              component="a"
              href={`https://udemy.com/${course.url}`}
              target="_blank"
            >
              Enroll
            </Button>
          </Group>
        </Stack>
      </Card>
    );
  };

  const BookCard = ({ book }: { book: GoogleBookType }) => {
    return (
      <Card withBorder style={{ maxWidth: '300px' }} shadow="sm" padding="xl">
        <Card.Section>
          <Image
            fit="contain"
            src={book?.imageLinks?.smallThumbnail}
            h={150}
            alt={book.title}
            fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
          />
        </Card.Section>

        <Stack justify="space-around" mt="md" gap="xs">
          <Text fw={500}>{book.title}</Text>
          <Badge color={theme.colors.purple[0]} variant="light">
            By {book.authors}
          </Badge>
          <Divider />
          <Group>
            <IconBook width="20px" />
            <Text c="dimmed" size="sm">
              Pages: {book.pageCount}
            </Text>
          </Group>
          <Group>
            <IconCalendarDue width={'20px'} />
            <Text c="dimmed" size="sm">
              Year: {new Date(book.publishedDate).getFullYear()}
            </Text>
          </Group>
          <Divider />
          <Group mt={'lg'} m={'auto'}>
            {!isInPlan(book, 'books') ? (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconPlus size={14} />}
                radius="md"
                onClick={() =>
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    books: [...prevPlan.books, book],
                  }))
                }
              >
                Add
              </Button>
            ) : (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconMinus size={14} />}
                radius="md"
                onClick={() => {
                  const modifiedBooks = plan.books.filter(
                    (planBook) => planBook.title != book.title
                  );
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    books: modifiedBooks,
                  }));
                }}
              >
                Remove
              </Button>
            )}
            <Button
              color={theme.colors.purple[0]}
              variant="outline"
              size="compact-sm"
              radius="md"
              component="a"
              href={book.infoLink}
              target="_blank"
            >
              Read
            </Button>
          </Group>
        </Stack>
      </Card>
    );
  };

  const PodcastCard = ({ podcast }: { podcast: PodcastResponse }) => {
    return (
      <Card withBorder style={{ maxWidth: '300px' }} shadow="sm" padding="xl">
        <Card.Section>
          <Image
            fit="contain"
            src={podcast.image}
            h={110}
            alt={podcast.title_original}
            fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
          />
        </Card.Section>

        <Stack justify="space-between" gap={'xs'} mt="md">
          <Text fw={500}>{podcast.title_original}</Text>
          <Badge color={theme.colors.purple[0]} variant="light">
            {podcast.total_episodes} episodes
          </Badge>
          <Divider />
          <Text c="dimmed" size="sm">
            {podcast.listen_score}
          </Text>
          <Divider />
          <Group mt={'lg'} m={'auto'}>
            {!isInPlan(podcast, 'podcasts') ? (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconPlus size={14} />}
                radius="md"
                onClick={() =>
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    podcasts: [...prevPlan.podcasts, podcast],
                  }))
                }
              >
                Add
              </Button>
            ) : (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconMinus size={14} />}
                radius="md"
                onClick={() => {
                  const modifiedPodcasts = plan.podcasts.filter(
                    (planPodcast) => planPodcast.id != podcast.id
                  );
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    podcasts: modifiedPodcasts,
                  }));
                }}
              >
                Remove
              </Button>
            )}
            <Button
              color={theme.colors.purple[0]}
              variant="outline"
              size="compact-sm"
              radius="md"
              component="a"
              href={podcast.website}
              target="_blank"
            >
              Listen
            </Button>
          </Group>
        </Stack>
      </Card>
    );
  };

  const MovieCard = ({ movie }: { movie: OmdbMovieType }) => {
    return (
      <Card withBorder style={{ maxWidth: '300px' }} shadow="sm" padding="xl">
        <Card.Section>
          <Image
            src={movie.Poster}
            fit="contain"
            h={200}
            alt={movie.Title}
            fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
          />
        </Card.Section>

        <Stack justify="space-between" gap={'xs'} mt="md">
          <Text fw={500}>{movie.Title}</Text>
          <Badge color={theme.colors.purple[0]} variant="light">
            By {movie.Director}
          </Badge>
          <Divider />
          <Group>
            <IconThumbUp width="20px" />
            <Text c="dimmed" size="sm">
              Rating: {movie.Metascore}
            </Text>
          </Group>
          <Group>
            <IconCalendarDue width={'20px'} />
            <Text c="dimmed" size="sm">
              Year: {movie.Year}
            </Text>
          </Group>
          <Group>
            <IconMovie width="20px" />
            <Text
              style={{ maxWidth: '80%' }}
              // truncate="end"
              c="dimmed"
              size="sm"
            >
              Genre: {movie.Genre}
            </Text>
          </Group>
          <Divider />
          <Group mt="lg" m={'auto'}>
            {!isInPlan(movie, 'movies') ? (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconPlus size={14} />}
                radius="md"
                onClick={() =>
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    movies: [...prevPlan.movies, movie],
                  }))
                }
              >
                Add
              </Button>
            ) : (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconMinus size={14} />}
                radius="md"
                onClick={() => {
                  const modifiedMovies = plan.movies.filter(
                    (planMovie) => planMovie.imdbID != movie.imdbID
                  );
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    movies: modifiedMovies,
                  }));
                }}
              >
                Remove
              </Button>
            )}
            <Button
              color={theme.colors.purple[0]}
              variant="outline"
              size="compact-sm"
              radius="md"
              component="a"
              target="_blank"
            >
              Watch
            </Button>
          </Group>
        </Stack>
      </Card>
    );
  };

  const YoutubeCard = ({ video }) => {
    console.log(video);
    return (
      <Card withBorder style={{ maxWidth: '300px' }} shadow="sm" padding="xl">
        <Card.Section>
          <Image
            src={video.thumbnail}
            fit="contain"
            h={200}
            alt={video.Title}
            fallbackSrc="https://placehold.co/300x400?text=No%20Image%20Found"
          />
        </Card.Section>

        <Stack justify="space-between" gap={'xs'} mt="md">
          <Text fw={500}>{video.title}</Text>
          <Badge color={theme.colors.purple[0]} variant="light">
            By {video.channelTitle}
          </Badge>
          <Divider />
          <Group>
            <IconThumbUp width="20px" />
            <Text c="dimmed" size="sm">
              {/* Rating: {movie.Metascore} */}
            </Text>
          </Group>
          <Group>
            <IconCalendarDue width={'20px'} />
            <Text c="dimmed" size="sm">
              {/* Year: {movie.Year} */}
            </Text>
          </Group>
          <Group>
            <IconMovie width="20px" />
            <Text
              style={{ maxWidth: '80%' }}
              // truncate="end"
              c="dimmed"
              size="sm"
            >
              {/* Genre: {movie.Genre} */}
            </Text>
          </Group>
          <Divider />
          {/* <Group mt="lg" m={'auto'}>
            {!isInPlan(movie, 'movie') ? (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconPlus size={14} />}
                radius="md"
                onClick={() =>
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    movies: [...prevPlan.movies, movie],
                  }))
                }
              >
                Add
              </Button>
            ) : (
              <Button
                color={theme.colors.purple[0]}
                size="compact-sm"
                leftSection={<IconMinus size={14} />}
                radius="md"
                onClick={() => {
                  const modifiedMovies = plan.movies.filter(
                    (planMovie) => planMovie.imdbID != movie.imdbID
                  );
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    movies: modifiedMovies,
                  }));
                }}
              >
                Remove
              </Button>
            )}
            <Button
              color={theme.colors.purple[0]}
              variant="outline"
              size="compact-sm"
              radius="md"
              component="a"
              target="_blank"
            >
              Watch
            </Button>
          </Group> */}
        </Stack>
      </Card>
    );
  };

  const handleSearch = async () => {
    try {
      const {
        moviesSubject,
        booksSubject,
        onlineCoursesSubject,
        podcastsSubject,
      } = await getAllSourcesSubjects(subject);

      const {
        onlineCourses,
        googleBooks,
        omdbMovies,
        podcasts,
        youtubeVideos,
      } = await getAllSourcesResults({
        moviesSubject,
        booksSubject,
        onlineCoursesSubject,
        podcastsSubject,
        youtubeSubject: subject,
      });

      setCourses(onlineCourses);
      setBooks(googleBooks);
      setMovies(omdbMovies);
      setPodcasts(podcasts.podcasts);
      setYouTubeVideos(youtubeVideos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    if (
      courses.length > 0 ||
      books.length > 0 ||
      movies.length > 0 ||
      podcasts.length > 0
    ) {
      setLoading(false);
    }
  }, [courses, books, movies, podcasts]);

  return (
    <>
      <Stack align="center" h={'100vh'} gap={0}>
        {loading ? (
          <Flex justify="center" align="center" h="100%">
            <Loader color={theme.colors.purple[0]} />
          </Flex>
        ) : (
          <Stack mt={20} gap={'md'} pl={'40px'} pr={'40px'}>
            <Navbar />
            <Box w={'100%'} h={'40%'}>
              <BackgroundImage
                h={'70px'}
                src={'/books-cover.jpg'}
                style={{ borderRadius: '20px' }}
              >
                <Stack h="100%" justify="center" align="start" pl={20}>
                  <Text fw={700} size="30px" c={theme.colors.white[0]}>
                    Start Learning {subject}
                  </Text>
                </Stack>
              </BackgroundImage>
            </Box>
            <Group justify="space-between">
              <Group w={'40%'} justify="space-between">
                <Chip.Group multiple value={filters} onChange={setFilters}>
                  {['Courses', 'Books', 'Podcasts', 'Movies'].map(
                    (contentType, index, arr) => (
                      <>
                        <Chip
                          color={theme.colors.lightPurple[0]}
                          variant="filled"
                          value={contentType.toLowerCase()}
                          size="lg"
                          key={contentType}
                        >
                          {contentType}
                        </Chip>
                        {index !== arr.length - 1 ? (
                          <Divider size="sm" orientation="vertical" />
                        ) : null}
                      </>
                    )
                  )}
                </Chip.Group>
              </Group>

              <Group>
                <Button
                  variant="default"
                  size="md"
                  onClick={() => router.push('/generate')}
                >
                  Go Back
                </Button>
                <Button
                  color={theme.colors.purple[0]}
                  size="md"
                  rightSection={<IconArrowBarToRight size={14} />}
                  onClick={() => setIsPlanOpen(true)}
                >
                  My Plan
                </Button>
              </Group>
            </Group>
            {filters.includes('courses') && (
              <Stack align="start">
                <Title order={2}>Courses</Title>
                <Grid align="stretch">
                  {courses.map((course) => (
                    <Grid.Col
                      h={530}
                      key={course.id}
                      span={{ base: 12, md: 4, lg: 2 }}
                    >
                      <CourseCard key={course.id} course={course} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            )}
            {filters.includes('books') && (
              <Stack>
                <Title order={2}>Books</Title>
                <Grid>
                  {books.map((book) => (
                    <Grid.Col
                      h={450}
                      key={book.title}
                      span={{ base: 12, md: 4, lg: 2 }}
                    >
                      <BookCard book={book} key={book.ISBN_13} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            )}
            {filters.includes('podcasts') && (
              <Stack>
                <Title order={2}>Podcasts</Title>
                <Grid>
                  {podcasts?.map((podcast) => (
                    <Grid.Col
                      h={450}
                      key={podcast.id}
                      span={{ base: 12, md: 4, lg: 2 }}
                    >
                      <PodcastCard podcast={podcast} key={podcast.id} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            )}
            {filters.includes('movies') && (
              <Stack>
                <Title order={2}>Movies</Title>
                <Grid>
                  {movies.map((movie) => (
                    <Grid.Col
                      h={550}
                      key={movie.imdbID}
                      span={{ base: 12, md: 4, lg: 2 }}
                    >
                      <MovieCard movie={movie} key={movie.imdbID} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            )}
            {filters.includes('youtube') && (
              <Stack>
                <Title order={2}>Youtube Videos</Title>
                <Grid>
                  {youTubeVideos.map((video) => (
                    <Grid.Col
                      h={550}
                      key={video.title}
                      span={{ base: 12, md: 4, lg: 2 }}
                    >
                      <YoutubeCard video={video} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            )}
            {filters.includes('youtube') && (
              <Stack>
                <Title order={2}>Youtube Videos</Title>
                <Grid>
                  {youTubeVideos.map((video) => (
                    <Grid.Col
                      h={550}
                      key={video.title}
                      span={{ base: 12, md: 4, lg: 2 }}
                    >
                      <YoutubeCard video={video} />
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
      <Modal
        opened={isPlanOpen}
        onClose={() => setIsPlanOpen(false)}
        size="80%"
        style={{ minHeight: '700px' }}
        withCloseButton={false}
      >
        <Stack>
          <Title order={1}>My Study Plan</Title>
          {isPlanEmpty ? (
            <Flex justify={'center'} align={'center'} h={'700px'}>
              <Text>Your study plan is empty</Text>
              <IconMoodSad />
            </Flex>
          ) : (
            <Grid>
              {plan.courses.map((course: UdemyCourseType) => (
                <Grid.Col key={course.id} span={{ base: 12, md: 6, lg: 3 }}>
                  <CourseCard course={course} />
                </Grid.Col>
              ))}
              {plan.books.map((book: GoogleBookType) => (
                <Grid.Col key={book.ISBN_13} span={{ base: 12, md: 6, lg: 3 }}>
                  <BookCard book={book} />
                </Grid.Col>
              ))}
              {plan.podcasts?.map((podcast) => (
                <Grid.Col
                  key={podcast.id}
                  style={{ minWidth: '200px' }}
                  span={{ base: 12, md: 6, lg: 3 }}
                >
                  <PodcastCard podcast={podcast} />
                </Grid.Col>
              ))}
              {plan.movies.map((movie: OmdbMovieType) => (
                <Grid.Col key={movie.imdbID} span={{ base: 12, md: 6, lg: 3 }}>
                  <MovieCard movie={movie} />
                </Grid.Col>
              ))}
            </Grid>
          )}
          <Group justify="space-between">
            <Button
              onClick={() => setIsPlanOpen(false)}
              variant="default"
              size="md"
            >
              Exit
            </Button>
            <Group>
              <Button variant="default" size="md">
                Save
              </Button>
              <Button
                color={theme.colors.purple[0]}
                size="md"
                rightSection={<IconArrowBarToRight size={14} />}
              >
                Export
              </Button>
            </Group>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
