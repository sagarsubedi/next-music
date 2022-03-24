import NextImage from 'next/image';
import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
// import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutations';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // const user = await auth(mode, { email, password })
        setIsLoading(false);
        router.push('/');

    }

    return (
        <Box height="100vh" width="100vw" bg="black">
            <Flex justify="center" align="center" height="100px" color="white"
                borderBottom="white 1px solid">
                <NextImage src="/logo.svg" height={60} width={120} />
            </Flex>

            <Flex justify="center" align="center" height="calc(100vh - 100px)">
                <Box padding="50px" bg="gray.900" borderRadius="5px">
                    <form onSubmit={handleSubmit}>
                        <Input placeholder="Email" type="email"
                            onChange={(e) => { setEmail(e.target.value) }} />

                        <Input placeholder="Password" type="password"
                            onChange={(e) => { setPassword(e.target.value) }} />

                        <Button
                            type="submit" bg="green.500"
                            isLoading={isLoading}
                            sx={{
                                '&:hover': {
                                    bg: 'green.200'
                                }
                            }}>
                            {mode === "signin" ? "Log In" : "Sign Up"}
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    )

}

export default AuthForm;