import GradientLayout from "../../components/gradientLayout";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

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

            {playlist.name}
        </GradientLayout>
    )
}

export const getServerSideProps = async ({ query, req }) => {
    const { id } = validateToken(req.cookies.TRAX_ACCESS_TOKEN);
    const [playlist] = await prisma.playlist.findMany({
        where: {
            // id because the name comes from filename
            id: +query.id,
            userId: id,
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