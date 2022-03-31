import NextImage from 'next/image';
import NextLink from 'next/link';
import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { Spacer, Text } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
// import { useSWRConfig } from 'swr';
import { auth } from '../lib/mutations';


const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const user = await auth(mode, { email, password, firstName, lastName })
        console.log(user);
        setIsLoading(false);
        router.push('/');

    }

    const loginOrSignup = () => {
        return mode === "signin" ? "signup" : "signin";
    }

    return (
        <Box height="100vh" width="100vw" bg="black">
            <Flex justify="center" align="center" height="100px" color="white"
                borderBottom="white 1px solid">
                <NextImage src="/logo.svg" height={60} width={120} />
            </Flex>

            <Flex direction="column" justify="center" align="center" height="100px" color="white">
                <Text>You can use the following credential to log in:</Text>
                <Text>user@test.com</Text>
                <Text>password</Text>
            </Flex>

            <Flex justify="center" align="center" height="calc(100vh - 400px)">
                <Box padding="50px" bg="gray.900" borderRadius="5px">
                    <form onSubmit={handleSubmit}>
                        <Input placeholder="Email" type="email" marginBottom="20px" name='email'
                            onChange={(e) => { setEmail(e.target.value) }} />

                        <Input placeholder="Password" type="password" marginBottom="20px" name='password'
                            onChange={(e) => { setPassword(e.target.value) }} />

                        {
                            mode === "signup" &&
                            <>
                                <Input placeholder="First Name" type="text" marginBottom="20px" name='firstName'
                                    onChange={(e) => { setFirstName(e.target.value) }} />

                                <Input placeholder="Last Name" type="text" marginBottom="20px" name='lastName'
                                    onChange={(e) => { setLastName(e.target.value) }} />

                            </>
                        }

                        <Flex>
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
                            <Spacer />
                            <NextLink
                                href={{
                                    pathname: `/${loginOrSignup()}`,
                                }}
                                passHref
                            >
                                <Button
                                    type="button"
                                    bg="teal.500"
                                    isLoading={isLoading}
                                    sx={{
                                        '&:hover': {
                                            bg: 'teal.200'
                                        }

                                    }}>
                                    {mode === "signin" ? "Sign Up" : "Log In"}
                                </Button>
                            </NextLink>
                        </Flex>

                    </form>
                </Box>
            </Flex>
        </Box>
    )

}

export default AuthForm;