import { Box, Button, Container, Heading,Text } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Repository } from "./Repos";

export function Repo() {
  const params = useParams();
  const currentRepository = params["*"] as string;
  const queryClient = useQueryClient();

  async function handleChangeRepositoryDescription() {
    //caso estivesse em produção, deve ser chamado API para atualizar a descrição do repositório
    const previousRepos = queryClient.getQueryData<Repository[]>("repos");

    if (previousRepos) {
      const nextRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentRepository) {
          return { ...repo, description: "Testando" };
        } else {
          return repo;
        }
      })

      queryClient.setQueryData('repos', nextRepos)
    }
  }

  return (
    <Container centerContent pt={["5rem","9rem"]} >
      <Box p={10} maxW="sm" borderWidth="1px" w={["","30rem"]} height={"30rem"} borderColor="#57616C" borderRadius="lg" bg="#1C2128">
      <Button variant='outline' _hover={{ bg: "#22272E" }} size="sm" mb={6}>
        <Link to="/">Voltar</Link>
      </Button>
      
      <Heading size="md">Título do repositório: </Heading>
      <Text size="sm" mb={5}>{currentRepository}</Text>

      <Button variant='outline' _hover={{ bg: "#22272E" }} onClick={handleChangeRepositoryDescription}>
        Alterar descrição
      </Button>
      </Box>
    </Container>
  );
}
