import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export type Repository = {
  full_name: string;
  description: string;
};

function Repos() {
  const { data, isFetching } = useQuery<Repository[]>(
    "repos",
    async () => {
      const response = await axios.get(
        "https://api.github.com/users/leticiar-io/repos"
      );

      return response.data;
    },
    {
      staleTime: 1000 * 60, //1 minute
    }
  );
  return (
    <Container centerContent pt={["2rem","9rem"]}>
      <Box p={10} maxW="sm" borderWidth="1px" borderColor="#57616C" borderRadius="lg" bg="#1C2128">
        <ul>

          {isFetching && //É o carregando
          <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Spinner />
            <Heading as='h5' size='md'> Carregando ...</Heading>
          </Flex>
          }

          <Box>
            <Flex minWidth='max-content' alignItems='center' gap='2' mb={7}>    
            <Image src="https://cdn.icon-icons.com/icons2/2429/PNG/512/github_logo_icon_147285.png" h="4rem"/>
            <Heading as='h4' size='md' ml={3}>Github Repositories</Heading>
            </Flex>
            
            {data?.map((repo) => {
              return (
                <li key={repo.full_name}>
                  <Link to={`repos/${repo.full_name}`}>
                   <Heading as='h5' size='sm'> {repo.full_name}</Heading>
                   </Link>
                  <Text fontSize='sm' mb={3}>{repo.description}</Text>
                </li>
              );
            })}
          
          </Box>
        </ul>
      </Box>
    </Container>
  );
}

export default Repos;
