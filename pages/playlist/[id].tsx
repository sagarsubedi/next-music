import GradientLayout from "../../components/gradientLayout";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import SongTable from "../../components/songsTable";

const getBackgroundColor = id => {
    const colors = [
        'red', 'green', 'blue', 'orange', 'purple', 'gray', 'teal', 'yellow', 'cyan', 'pink'
    ]

    return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
}

const Playlist = ({ playlist }) => {
    const color = getBackgroundColor(playlist.id);
    return (
        <GradientLayout
            color={color}
            roundImage={false}
            title={playlist.name}
            subtitle="playlist"
            description={`${playlist.songs.length} songs`}
            image={`https://picsum.photos/4000?random=${playlist.id}`}
        >

            <SongTable songs={playlist.songs} />
        </GradientLayout>
    )
}

export const getServerSideProps = async ({ query, req }) => {
    let user;
    try {
        user = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
    } catch (e) {
        return {
            redirect: {
                permanent: false,
                destination: '/singin',
            }
        }
    }

    const [playlist] = await prisma.playlist.findMany({
        where: {
            // id because the name comes from filename
            id: +query.id,
            userId: user.id,
        },
        include: {
            songs: {
                include: {
                    artist: {
                        select: {
                            name: true,
                            id: true,
                        }
                    }
                }
            }
        }
    })

    return {
        props: { playlist },
    }
}

export default Playlist;