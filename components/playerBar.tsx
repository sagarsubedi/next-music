import { Box, Flex, Text } from '@chakra-ui/layout'
import Player from './player';
import { useStoreState } from 'easy-peasy';

const PlayerBar = () => {
    const songs = useStoreState((state: any) => state.activeSongs);
    const activeSong = useStoreState((state: any) => state.activeSong);

    return (
        <Box height="100px" width="100vw" bg="gray.900" padding="10px">
            <Flex align="center">
                {
                    activeSong ? (
                        <Box padding="20px" color="white" width="30%">
                            <Text fontSize="lg">{activeSong.name}</Text>
                            <Text fontSize="sm">{activeSong.artist.name}</Text>
                        </Box>
                    ) : null
                }


                {
                    activeSong ? (
                        <Box width="40%">
                            <Player
                                songs={songs}
                                activeSong={activeSong}
                            />
                        </Box>
                    ) : null
                }

            </Flex>
        </Box>
    )
}

export default PlayerBar;